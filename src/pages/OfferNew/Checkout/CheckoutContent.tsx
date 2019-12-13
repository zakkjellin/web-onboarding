import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand/dist'
import { CompleteOfferData } from 'pages/OfferNew/types'
import * as React from 'react'
import { useTextKeys } from 'utils/hooks/useTextKeys'
import { Price } from '../components'
import {
  getInsuranceType,
  insuranceTypeTextKeys,
  isMonthlyCostDeduction,
} from '../utils'
import { InsuranceSummary } from './InsuranceSummary'
import { SignSpacer } from './Sign'
import { UserDetailsForm } from './UserDetailsForm'

const Section = styled('div')`
  width: 100%;
`

const Title = styled('h1')`
  font-size: 3.5rem;
  line-height: 1;
  color: ${colorsV2.black};
  margin: 0;

  @media (max-width: 40rem) {
    font-size: 2rem;
    text-align: center;
  }
`

const Excerpt = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 0;

  @media (max-width: 40rem) {
    padding: 2rem 0;
  }
`

const InsuranceTypeLabel = styled('div')`
  font-size: 0.75rem;
  color: ${colorsV2.gray};
  text-transform: uppercase;
`
const InsuranceType = styled('div')`
  font-size: 2rem;
  font-family: ${fonts.GEOMANIST};
  font-weight: 500;
  line-height: 1;

  @media (max-width: 40rem) {
    font-size: 1.5rem;
  }
`

interface Props {
  offer: CompleteOfferData
}

export const CheckoutContent: React.FC<Props> = ({ offer }) => {
  const textKeys = useTextKeys()
  const monthlyCostDeduction = isMonthlyCostDeduction(offer.redeemedCampaigns)

  return (
    <>
      <Section>
        <Title>{textKeys.CHECKOUT_TITLE()}</Title>
        <Excerpt>
          <div>
            <InsuranceTypeLabel>{textKeys.SIDEBAR_LABEL()}</InsuranceTypeLabel>
            <InsuranceType>
              {textKeys[insuranceTypeTextKeys[getInsuranceType(offer.quote)]]()}
            </InsuranceType>
          </div>
          <div>
            <Price
              monthlyGross={offer.quote.price}
              monthlyNet={offer.quote.price} // TODO with discounts
              monthlyCostDeduction={monthlyCostDeduction}
              highlightAmount
            />
          </div>
        </Excerpt>

        <UserDetailsForm />

        <InsuranceSummary offer={offer} />

        <SignSpacer />
      </Section>
    </>
  )
}