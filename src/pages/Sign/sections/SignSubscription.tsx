import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { ApolloError } from 'apollo-client'
import gql from 'graphql-tag'
import { SemanticEvents } from 'quepasa'
import * as React from 'react'
import { Query } from 'react-apollo'
import { Mount } from 'react-lifecycle-components/dist'
import { Redirect } from 'react-router-dom'
import {
  getUtmParamsFromCookie,
  TrackAction,
  trackStudentkortet,
} from 'utils/tracking'
import { CurrentLanguage } from '../../../components/utils/CurrentLanguage'
import { OfferContainer } from '../../../containers/OfferContainer'
import { adtraction } from '../../../utils/tracking'

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
})

const Spinner = styled('span')({
  display: 'inline-block',
  width: '1em',
  height: '1em',
  marginLeft: '1em',
  border: `2px solid ${colors.WHITE}`,
  borderTopColor: 'transparent',
  borderRadius: '1em',
  animation: `${spin} 500ms linear infinite`,
})

const SubmitButton = styled('button')({
  display: 'inline-flex',
  alignItems: 'center',
  backgroundColor: colors.GREEN,
  color: colors.WHITE,
  textDecoration: 'none',
  borderRadius: '50px',
  padding: '15px 30px',
  cursor: 'pointer',
  border: 'none',
  fontSize: '16px',

  '&:disabled': {
    backgroundColor: colors.LIGHT_GRAY,
    cursor: 'default',
  },
})

const GetInsuredButton = styled('div')({
  marginTop: '30px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
})

const ErrorText = styled('div')({
  textAlign: 'center',
  marginTop: '20px',
  color: 'red',
  '@media (max-width: 300px)': {
    marginLeft: '10px',
    marginRight: '10px',
  },
})

const SigningStatusText = styled('div')({
  textAlign: 'center',
  marginTop: '20px',
  color: colors.DARK_GRAY,
})

enum SIGNSTATE {
  INITIATED = 'INITIATED',
  IN_PROGRESS = 'IN_PROGRESS',
  FAILED = 'FAILED',
  COMPLETED = 'COMPLETED',
}

enum BANKIDSTATUS {
  PENDING = 'pending',
  FAILED = 'failed',
  COMPLETE = 'complete',
}

export const SIGN_SUBSCRIPTION = gql`
  subscription SignStatusListener {
    signStatus {
      status {
        signState
        collectStatus {
          status
          code
        }
      }
    }
  }
`
export const SIGN_QUERY = gql`
  query SignStatus {
    signStatus {
      collectStatus {
        status
        code
      }
      signState
    }
  }
`

interface CollectStatus {
  status: BANKIDSTATUS
  code:
    | 'started'
    | 'userSign'
    | 'noClient'
    | 'outstandingTransaction'
    | 'expiredTransaction'
    | 'certificateErr'
    | 'userCancel'
    | 'cancelled'
    | 'startFailed'
}

interface SignStatusData {
  signStatus?: {
    signState: SIGNSTATE
    collectStatus: CollectStatus
  }
}

const CODETEXTKEYS = {
  started: 'SIGN_BANKID_CODE_STARTED',
  userSign: 'SIGN_BANKID_CODE_USER_SIGN',
  noClient: 'SIGN_BANKID_CODE_NO_CLIENT',
  outstandingTransaction: 'SIGN_BANKID_CODE_OUTSTANDING_TRANSACTION',
  expiredTransaction: 'SIGN_BANKID_CODE_EXPIRED_TRANSACTION',
  certificateErr: 'SIGN_BANKID_CODE_CERTIFICATE_ERR',
  userCancel: 'SIGN_BANKID_CODE_USER_CANCEL',
  cancelled: 'SIGN_BANKID_CODE_CANCELLED',
  startFailed: 'SIGN_BANKID_CODE_START_FAILED',
}

const handleMessage = (
  textkeys: { [key: string]: string },
  message: string,
) => {
  return textkeys[message]
}

interface StateComponentProps {
  signState?: SIGNSTATE
  collectStatus?: CollectStatus
  error?: ApolloError
  trackSignCompleted: () => void
  runAdtraction: () => void
  runStudentkortet: () => void
}

const StateComponent: React.SFC<StateComponentProps> = ({
  signState,
  collectStatus,
  error,
  trackSignCompleted,
  runAdtraction,
  runStudentkortet,
}) => {
  if (!signState || !collectStatus) {
    return null
  }

  if (error) {
    return (
      <ErrorText>
        <TranslationsConsumer textKey="SIGN_BANKID_STANDARD_ERROR_MESSAGE">
          {(errorText) => errorText}
        </TranslationsConsumer>
      </ErrorText>
    )
  }
  switch (signState) {
    case SIGNSTATE.INITIATED:
      return (
        <SigningStatusText>
          <TranslationsConsumer textKey="SIGN_BANKID_INITIATED">
            {(message) => message}
          </TranslationsConsumer>
        </SigningStatusText>
      )
    case SIGNSTATE.IN_PROGRESS:
      if (collectStatus.status === BANKIDSTATUS.PENDING) {
        return <BankidStatus message={collectStatus.code} />
      }
    case SIGNSTATE.COMPLETED:
      if (collectStatus.status === BANKIDSTATUS.COMPLETE) {
        trackSignCompleted()

        if (process.env.NODE_ENV !== 'test') {
          runAdtraction()
          runStudentkortet()
        }

        return (
          <CurrentLanguage>
            {({ currentLanguage }) => (
              <Redirect
                to={`/${currentLanguage &&
                  currentLanguage + '/'}new-member/connect-payment`}
              />
            )}
          </CurrentLanguage>
        )
      }
    case SIGNSTATE.FAILED:
      if (collectStatus.status === BANKIDSTATUS.FAILED) {
        return <BankidStatus message={collectStatus.code} />
      }
    default:
      return null
  }
}

interface SubscriptionComponentProps {
  isSignLoading: boolean
  signEmail: string
}

const getIsSignPending = (data: SignStatusData | undefined) =>
  ([SIGNSTATE.INITIATED, SIGNSTATE.IN_PROGRESS] as Array<
    SIGNSTATE | undefined
  >).includes(data && data.signStatus && data.signStatus.signState)

export const SubscriptionComponent: React.SFC<SubscriptionComponentProps> = ({
  isSignLoading,
  signEmail,
}) => (
  <Query<SignStatusData> query={SIGN_QUERY} fetchPolicy="network-only">
    {({ data, error, subscribeToMore }) => (
      <Mount
        on={() => {
          subscribeToMore({
            document: SIGN_SUBSCRIPTION,
            // tslint:disable-next-line variable-name
            updateQuery: (_prev, next) => {
              return {
                signStatus:
                  (next.subscriptionData.data &&
                    next.subscriptionData.data.signStatus &&
                    // @ts-ignore
                    next.subscriptionData.data.signStatus.status) ||
                  null,
              }
            },
          })
        }}
      >
        <GetInsuredButton>
          <TranslationsConsumer textKey="SIGN_BUTTON_TEXT">
            {(buttonText) => (
              <SubmitButton
                type="submit"
                value={buttonText}
                disabled={getIsSignPending(data) || isSignLoading}
              >
                {buttonText}
                {(getIsSignPending(data) || isSignLoading) && <Spinner />}
              </SubmitButton>
            )}
          </TranslationsConsumer>
        </GetInsuredButton>

        <TrackAction
          event={{
            name: SemanticEvents.Ecommerce.OrderCompleted,
            properties: {
              category: 'sign-up',
              ...getUtmParamsFromCookie(),
            },
          }}
        >
          {({ track }) => (
            <OfferContainer>
              {(currentOffer) => (
                <StateComponent
                  signState={
                    data && data.signStatus && data.signStatus.signState
                  }
                  collectStatus={
                    data && data.signStatus && data.signStatus.collectStatus
                  }
                  error={error}
                  trackSignCompleted={track}
                  runAdtraction={() => {
                    adtraction(
                      parseFloat(
                        currentOffer.insurance.cost.monthlyGross.amount,
                      ),
                      currentOffer.member.id,
                      signEmail,
                      currentOffer.redeemedCampaigns !== null &&
                        currentOffer.redeemedCampaigns.length !== 0
                        ? currentOffer.redeemedCampaigns[0].code
                        : null,
                      currentOffer.insurance.type,
                    )
                  }}
                  runStudentkortet={() => {
                    if (
                      currentOffer.redeemedCampaigns !== null &&
                      currentOffer.redeemedCampaigns.length !== 0 &&
                      currentOffer.redeemedCampaigns[0].code.toLowerCase() ===
                        'studentkortet'
                    ) {
                      trackStudentkortet(
                        currentOffer.member.id,
                        currentOffer.insurance.cost.monthlyGross.amount,
                      )
                    }
                  }}
                />
              )}
            </OfferContainer>
          )}
        </TrackAction>
      </Mount>
    )}
  </Query>
)

interface StatusProps {
  message: string
}

export const BankidStatus: React.SFC<StatusProps> = (props) => (
  <div>
    <SigningStatusText>
      <TranslationsConsumer
        textKey={handleMessage(CODETEXTKEYS, props.message)}
      >
        {(message) => message}
      </TranslationsConsumer>
    </SigningStatusText>
  </div>
)
