import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import { GetInsuredButton, LinkTag } from 'components/buttons'
import { OfferData } from 'containers/OfferContainer'
import { SemanticEvents } from 'quepasa'
import * as React from 'react'
import VisibilitySensor from 'react-visibility-sensor'
import { formatPostalNumber } from 'utils/postalNumbers'
import { getUtmParamsFromCookie, TrackAction } from 'utils/tracking'
import { CurrentLanguage } from '../../../components/utils/CurrentLanguage'
import { CardWrapperSmall } from '../components/CardWrapperSmall'
import { HeaderWrapper } from '../components/HeaderWrapper'
import { InnerWrapper } from '../components/InnerWrapper'
import { PriceAndInclusions } from '../components/PriceAndInclusions'
import { Wrapper } from '../components/Wrapper'

interface Props {
  offer: OfferData
  signButtonVisibility: (isVisible: boolean) => void
}

const Card = styled('div')({
  marginTop: '70px',
  marginBottom: '70px',
  backgroundColor: colors.WHITE,
  paddingBottom: '40px',
  boxShadow: '0px 8px 40px -12px rgba(0,0,0,0.67)',
  borderRadius: '10px',
  textAlign: 'center',
})

const Header = styled('h1')({
  color: colors.WHITE,
  marginTop: '0px',
  marginBottom: '10px',
  paddingTop: '40px',
})

const PersonalInfo = styled('div')({
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingBottom: '30px',
  textAlign: 'center',
  maxWidth: '100%',
  color: colors.WHITE,
})

const HeaderBackground = styled('div')({
  backgroundColor: colors.PURPLE,
  borderTopLeftRadius: '10px',
  borderTopRightRadius: '10px',
  paddingLeft: '10px',
  paddingRight: '10px',
})

export const GetInsured: React.SFC<Props> = ({
  offer,
  signButtonVisibility,
}) => (
  <Wrapper>
    <InnerWrapper>
      <CardWrapperSmall>
        <Card>
          <HeaderBackground>
            <HeaderWrapper>
              <TranslationsConsumer textKey="OFFER_GET_INSURED_TITLE">
                {(title) => <Header>{title}</Header>}
              </TranslationsConsumer>
            </HeaderWrapper>
            <PersonalInfo data-hj-supress>
              {`${offer.member.firstName} ${offer.member.lastName}`}
              {' · '}
              {offer.insurance.address}
              {' · '}
              {formatPostalNumber(offer.insurance.postalNumber)}
            </PersonalInfo>
          </HeaderBackground>
          <PriceAndInclusions offer={offer} />
          <VisibilitySensor
            partialVisibility
            onChange={(isVisible: boolean) => {
              signButtonVisibility(isVisible)
            }}
          >
            {() => (
              <TranslationsConsumer textKey="OFFER_SUMMARY_SIGN_CTA">
                {(ctaText) => (
                  <GetInsuredButton margin={'30px'} centered>
                    <TrackAction
                      event={{
                        name: SemanticEvents.Ecommerce.CheckoutStarted,
                        properties: {
                          category: 'offer',
                          value: Number(offer.insurance.cost.monthlyNet.amount),
                          label: 'GetInsured',
                          ...getUtmParamsFromCookie(),
                        },
                      }}
                    >
                      {({ track }) => (
                        <CurrentLanguage>
                          {({ currentLanguage }) => (
                            <LinkTag
                              to={`/${currentLanguage &&
                                currentLanguage + '/'}new-member/sign`}
                              onClick={() => track()}
                            >
                              {ctaText}
                            </LinkTag>
                          )}
                        </CurrentLanguage>
                      )}
                    </TrackAction>
                  </GetInsuredButton>
                )}
              </TranslationsConsumer>
            )}
          </VisibilitySensor>
        </Card>
      </CardWrapperSmall>
    </InnerWrapper>
  </Wrapper>
)
