import styled from '@emotion/styled'
import { colorsV2, fonts } from '@hedviginsurance/brand'
import {
  TranslationsConsumer,
  TranslationsPlaceholderConsumer,
} from '@hedviginsurance/textkeyfy'
import { OfferData } from 'containers/OfferContainer'
import { isMonthlyCostDeduction } from 'containers/types'
import gql from 'graphql-tag'
import { Button, TextButton } from 'new-components/buttons'
import * as React from 'react'
import { Mutation } from 'react-apollo'
import { formatPostalNumber } from 'utils/postalNumbers'
import { DiscountCodeModal } from './DiscountCodeModal'
import { insuranceTypeMapping, otherInsuranceCompanies } from './mock'
import { PreviousInsurancePicker } from './PreviousInsurancePicker'
import { StartDate } from './StartDate'

interface Props {
  sticky: boolean
  offer: OfferData
  refetch: () => void
}

const REMOVE_CODE_MUTATION = gql`
  mutation RemoveDiscountCode {
    removeDiscountCode {
      __typename
    }
  }
`

const Wrapper = styled.div`
  width: 26rem;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
  height: 0;

  @media (max-width: 1020px) {
    width: 100%;
    height: auto;
  }
`

const Container = styled.div<{ sticky: boolean }>`
  width: 26rem;
  background-color: ${colorsV2.white};
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
  overflow: hidden;
  position: ${(props) => (props.sticky ? `fixed` : `relative`)};
  ${(props) => props.sticky && `top: 6rem;`}

  @media (max-width: 1020px) {
    width: calc(100% + 2rem);
    margin: 0 -1rem;
    position: relative;
    top: 0;
    margin-bottom: 4rem;
  }
`

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 2rem 1.5rem 2rem 2rem;
  align-items: flex-start;
  position: relative;

  @media (max-width: 600px) {
    padding: 1.5rem;
  }
`

const DiscountInfo = styled.div`
  width: 100%;
  min-height: 2rem;
  padding: 0.375rem 1rem;
  background: ${colorsV2.grass500};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.875rem;
  color: ${colorsV2.white};
`

const Summary = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`

const PreTitle = styled.div`
  font-family: ${fonts.GEOMANIST};
  font-size: 0.75rem;
  line-height: 0.875rem;
  letter-spacing: 0.075rem;
  color: ${colorsV2.gray};
  text-transform: uppercase;
`

const Title = styled.div`
  font-family: ${fonts.GEOMANIST};
  font-size: 2rem;
  font-weight: 500;
  color: ${colorsV2.black};
  max-width: 50%;
  flex-shrink: 1;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`

const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
`

const SummaryText = styled.div`
  font-size: 0.875rem;
  line-height: 1.5rem;
  color: ${colorsV2.darkgray};
`

const Price = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`

const PriceNet = styled.div`
  font-size: 1rem;
  line-height: 1rem;
  color: ${colorsV2.gray};
  text-decoration: line-through;
  margin-bottom: 0.5rem;
  position: absolute;
  top: 0;
`

const PriceNumbers = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 0.5rem;
`

const PriceGross = styled.div<{ monthlyCostDeduction: boolean }>`
  font-size: 3.5rem;
  line-height: 3.5rem;
  color: ${(props) =>
    props.monthlyCostDeduction ? colorsV2.grass500 : colorsV2.black};
  font-family: ${fonts.GEOMANIST};
  font-weight: 600;

  @media (max-width: 330px) {
    font-size: 2.75rem;
  }
`

const PriceSuffix = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 0.5rem;
  flex-shrink: 0;
  margin-left: 0.5rem;
`

const PriceUnit = styled.div`
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: -0.23px;
  font-weight: 700;
  color: ${colorsV2.darkgray};
  margin-bottom: 0.25rem;
`

const PriceInterval = styled.div`
  font-size: 1rem;
  line-height: 1rem;
  letter-spacing: -0.23px;
  color: ${colorsV2.darkgray};
  white-space: nowrap;
`

const Body = styled.div`
  padding: 2rem 1rem;

  @media (max-width: 600px) {
    padding: 1rem;
  }
`

const Footer = styled.div`
  width: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    padding: 2rem 1rem;
  }
`

const FooterExtraActions = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;

  > * {
    margin-right: 1.375rem;
    :last-child {
      margin-right: 0;
    }
  }
`

export const Sidebar = React.forwardRef<HTMLDivElement, Props>(
  ({ sticky, offer, refetch }, ref) => {
    const [
      discountCodeModalIsOpen,
      setDiscountCodeModalIsOpen,
    ] = React.useState(false)
    const monthlyCostDeduction =
      offer.redeemedCampaigns.length > 0 &&
      isMonthlyCostDeduction(offer.redeemedCampaigns[0].incentive)

    return (
      <Wrapper ref={ref}>
        <Container sticky={sticky}>
          {monthlyCostDeduction && (
            <DiscountInfo>
              <TranslationsConsumer textKey="SIDEBAR_ACTIVE_REFERRAL">
                {(t) => t}
              </TranslationsConsumer>
            </DiscountInfo>
          )}
          <Header>
            <PreTitle>
              <TranslationsConsumer textKey="SIDEBAR_LABEL">
                {(t) => t}
              </TranslationsConsumer>
            </PreTitle>

            <Summary>
              <Title>{insuranceTypeMapping[offer.insurance.type]}</Title>

              <Price>
                {monthlyCostDeduction && (
                  <PriceNet>
                    <TranslationsPlaceholderConsumer
                      textKey="SIDEBAR_OLD_PRICE"
                      replacements={{
                        PRICE: Number(offer.insurance.cost.monthlyNet.amount),
                      }}
                    >
                      {(t) => t}
                    </TranslationsPlaceholderConsumer>
                  </PriceNet>
                )}

                <PriceNumbers>
                  <PriceGross monthlyCostDeduction={monthlyCostDeduction}>
                    {Number(offer.insurance.cost.monthlyNet.amount)}
                  </PriceGross>

                  <PriceSuffix>
                    <PriceUnit>
                      <TranslationsConsumer textKey="SIDEBAR_PRICE_SUFFIX_UNIT">
                        {(t) => t}
                      </TranslationsConsumer>
                    </PriceUnit>
                    <PriceInterval>
                      <TranslationsConsumer textKey="SIDEBAR_PRICE_SUFFIX_INTERVAL">
                        {(t) => t}
                      </TranslationsConsumer>
                    </PriceInterval>
                  </PriceSuffix>
                </PriceNumbers>
              </Price>
            </Summary>

            <SummaryContent>
              <SummaryText>
                <strong>{`${offer.member.firstName} ${offer.member.lastName}`}</strong>

                {offer.insurance.personsInHousehold - 1 > 0 && (
                  <TranslationsConsumer textKey="SIDEBAR_INSURED_PERSONS_SUFFIX">
                    {(t) => ` + ${offer.insurance.personsInHousehold - 1} ${t}`}
                  </TranslationsConsumer>
                )}
              </SummaryText>
              <SummaryText>{`${offer.insurance.address}, ${formatPostalNumber(
                offer.insurance.postalNumber,
              )}`}</SummaryText>

              {/* TODO: Add edit offer functionality :))) */}
              {/*<TextButton>*/}
              {/*  <TranslationsConsumer textKey="SIDEBAR_SHOW_DETAILS_BUTTON">*/}
              {/*    {(t) => t}*/}
              {/*  </TranslationsConsumer>*/}
              {/*</TextButton>*/}
            </SummaryContent>
          </Header>

          <Body>
            {offer.insurance.insuredAtOtherCompany && (
              <PreviousInsurancePicker insurances={otherInsuranceCompanies} />
            )}
            <StartDate
              insuredAtOtherCompany={offer.insurance.insuredAtOtherCompany}
            />
          </Body>

          <Footer>
            <Button size="lg">
              <TranslationsConsumer textKey="SIDEBAR_GETHEDVIG_BUTTON">
                {(t) => t}
              </TranslationsConsumer>
            </Button>

            <FooterExtraActions>
              {offer.redeemedCampaigns.length === 0 ? (
                <TextButton
                  onClick={() => {
                    setDiscountCodeModalIsOpen(true)
                  }}
                >
                  <TranslationsConsumer textKey="SIDEBAR_ADD_DISCOUNT_BUTTON">
                    {(t) => t}
                  </TranslationsConsumer>
                </TextButton>
              ) : (
                <Mutation<{ __typename: string }>
                  mutation={REMOVE_CODE_MUTATION}
                >
                  {(mutate) => (
                    <TextButton
                      color={colorsV2.coral700}
                      onClick={() => {
                        mutate().then(() => {
                          refetch()
                        })
                      }}
                    >
                      <TranslationsConsumer textKey="SIDEBAR_REMOVE_DISCOUNT_BUTTON">
                        {(t) => t}
                      </TranslationsConsumer>
                    </TextButton>
                  )}
                </Mutation>
              )}
            </FooterExtraActions>
          </Footer>

          <DiscountCodeModal
            isOpen={discountCodeModalIsOpen}
            close={() => setDiscountCodeModalIsOpen(false)}
            refetch={refetch}
          />
        </Container>
      </Wrapper>
    )
  },
)
