import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import * as React from 'react'
import {
  getAccidentalCoverageLimitTextKey,
  getInsuranceAmountTextKey,
  InsuranceType,
} from 'utils/insuranceDomainUtils'
import { HeaderWrapper } from '../components/HeaderWrapper'

const Card = styled('div')({
  paddingBottom: '40px',
  backgroundColor: colors.WHITE,
})

const Table = styled('div')({})

const Header = styled('h1')({
  color: colors.BLACK,
  margin: 0,
  paddingTop: '40px',
  paddingBottom: '30px',
  paddingLeft: '10px',
  paddingRight: '10px',
})

const Row = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  marginLeft: '150px',
  marginRight: '150px',
  borderRadius: '8px',
  paddingLeft: 16,
  paddingRight: 16,
  '@media (max-width: 700px)': {
    marginLeft: '30px',
    marginRight: '30px',
  },
})

const Col = styled('div')({
  display: 'flex',
  paddingTop: '20px',
  paddingBottom: '20px',
  paddingRight: '5px',
  paddingLeft: '5px',
  flexDirection: 'column',
  color: colors.BLACK,
  maxWidth: '50%',
})

const BoldInfoText = styled('div')({
  color: colors.BLACK,
  display: 'inline',
  fontWeight: 600,
})
const InfoText = styled('div')({
  color: colors.OFF_BLACK,
  display: 'inline',
})

const rows = (
  insuranceType: InsuranceType,
): ReadonlyArray<{
  titleKey: string
  amountKey: string
}> => {
  return [
    {
      titleKey: 'OFFER_INSURED_AMOUNT_COL_ONE_TITLE',
      amountKey: 'OFFER_INSURED_AMOUNT_COL_ONE_AMOUNT',
    },
    {
      titleKey: 'OFFER_INSURED_AMOUNT_COL_TWO_TITLE',
      amountKey: getInsuranceAmountTextKey(insuranceType),
    },
    {
      titleKey: 'OFFER_INSURED_AMOUNT_COL_THREE_TITLE',
      amountKey: getAccidentalCoverageLimitTextKey(insuranceType),
    },
    {
      titleKey: 'OFFER_INSURED_AMOUNT_COL_FOUR_TITLE',
      amountKey: 'OFFER_INSURED_AMOUNT_COL_FOUR_AMOUNT',
    },
  ]
}

export const InsuredAmount: React.SFC<{ insuranceType: InsuranceType }> = ({
  insuranceType,
}) => (
  <Card>
    <HeaderWrapper>
      <TranslationsConsumer textKey="OFFER_INSURED_AMOUNT_TITLE">
        {(title) => <Header>{title}</Header>}
      </TranslationsConsumer>
    </HeaderWrapper>
    <Table>
      {rows(insuranceType).map((row, index) => (
        <Row
          key={row.titleKey + row.amountKey}
          style={{
            backgroundColor: index % 2 === 0 ? colors.OFF_WHITE : colors.WHITE,
          }}
        >
          <Col>
            <BoldInfoText>
              <TranslationsConsumer textKey={row.titleKey}>
                {(text) => text}
              </TranslationsConsumer>
            </BoldInfoText>
          </Col>
          <Col>
            <InfoText>
              <TranslationsConsumer textKey={row.amountKey}>
                {(text) => text}
              </TranslationsConsumer>
            </InfoText>
          </Col>
        </Row>
      ))}
    </Table>
  </Card>
)
