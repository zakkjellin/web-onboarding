import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import { TranslationsConsumer } from '@hedviginsurance/textkeyfy'
import hexToRgba from 'hex-to-rgba'
import { Tooltip } from 'new-components/Tooltip'
import { otherCompanies } from 'pages/OfferNew/Compare/mock'
import * as React from 'react'
import { useMediaQuery } from 'react-responsive'
import { Checkmark } from '../../../components/icons/Checkmark'
import { DownArrow } from '../../../components/icons/DownArrow'
import { HedvigSymbol } from '../../../components/icons/HedvigSymbol'
import { SubHeadingBlack } from '../components'
import { CompanyProperties, InsuranceProperties } from './types'

interface Props {
  insuranceProperties: InsuranceProperties
  primaryCompany: CompanyProperties
  otherCompanies: CompanyProperties[]
  currentCompany?: CompanyProperties
}

const Container = styled('div')`
  width: 100%;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  background-color: ${colorsV2.white};
  border: 1px solid ${colorsV2.lightgray};
  margin: 0 -1rem;

  @media (max-width: 1020px) {
    width: calc(100% + 2rem);
  }

  @media (max-width: 600px) {
  }
`

const InsurancePropertiesSection = styled('div')`
  width: 100%;
  height: 100%;
  padding: 1.5rem 1.75rem;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding: 1.25rem 0.875rem;
  }

  @media (max-width: 350px) {
    padding: 1.25rem 0.625rem;
  }
`

const ColumnHead = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 3.625rem;
  height: 1.5rem;

  @media (max-width: 600px) {
    margin-bottom: 3.25rem;
  }
`

const ColumnRow = styled('div')`
  display: flex;
  height: 1.25rem;
  margin-bottom: 1.5rem;
  color: ${colorsV2.gray};
  :last-child {
    margin-bottom: 0.875rem;
  }
`

const ColumnRowPrimaryContent = styled('span')`
  color: ${colorsV2.black};
  margin-right: 4px;
`

const InsurancePropertyNames = styled('div')``

const InsuranceProperty = styled(ColumnRow)`
  font-size: 1rem;
  letter-spacing: -0.23px;
  flex-direction: row;
  align-items: center;
`

const TooltipWrapper = styled.div`
  margin-left: 0.75rem;
  @media (max-width: 600px) {
    display: none;
  }
`
const MobileTooltipWrapper = styled.div`
  display: none;
  margin-left: 1rem;

  @media (max-width: 600px) {
    display: block;
  }
`

const PrimaryCompanySection = styled('div')`
  width: 100%;
  max-width: 178px;
  height: 100%;
  padding: 2rem 1rem;
  box-sizing: border-box;
  background-color: ${colorsV2.lightgray};
  position: relative;

  :before,
  :after {
    content: '';
    position: absolute;
    left: 0;
    background-color: ${colorsV2.lightgray};
    width: 100%;
    height: 10px;
  }

  :before {
    top: -10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  :after {
    bottom: -10px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  @media (max-width: 600px) {
    padding: 1.25rem 0.875rem;
  }

  @media (max-width: 350px) {
    padding: 1.25rem 0.625rem;
  }
`

const PrimaryCompanyHead = styled(ColumnHead)`
  display: flex;
  justify-content: center;
`

const CompanyColumnRow = styled(ColumnRow)`
  font-size: 15px;
  justify-content: center;
  text-align: center;
  letter-spacing: -0.2px;
`

const OtherCompaniesSection = styled('div')`
  width: 100%;
  max-width: 178px;
  height: 100%;
  padding: 2rem 1rem;
  box-sizing: border-box;
  position: relative;

  @media (max-width: 600px) {
    padding: 1.25rem 0.875rem;
  }

  @media (max-width: 350px) {
    padding: 1.25rem 0.625rem;
  }
`

interface OtherCompanyHeadProps {
  currentCompany: CompanyProperties | null
  dropdownIsVisible: boolean
}

const OtherCompanyHead = styled('button')<OtherCompanyHeadProps>`
  width: 100%;
  display: flex;
  height: 1.5rem;
  align-items: center;
  justify-content: space-between;
  border: none;
  margin-bottom: 3.625rem;
  font-size: 1rem;
  font-weight: 500;
  color: ${(props) =>
    hexToRgba(
      colorsV2.black,
      props.currentCompany !== null && !props.dropdownIsVisible ? 1 : 0.2,
    )};
  transition: all 0.1s ease;
  cursor: pointer;
  background: none;
  padding: 0 0.375rem;
  position: relative;
  word-break: break-word;
  overflow: visible;

  :focus {
    outline: none;
  }

  > svg {
    width: 14px;
    transition: all 0.1s ease;
    ${(props) => props.dropdownIsVisible && `transform: rotate(180deg);`}
    ${(props) => props.dropdownIsVisible && `fill: ${colorsV2.violet500};`}
  }

  :hover {
    ${(props) => !props.dropdownIsVisible && `color: ${colorsV2.black};`}

    svg {
      fill: ${colorsV2.violet500};
    }
  }

  @media (max-width: 600px) {
    margin-bottom: 3.25rem;
    font-size: 0.75rem;
    padding: 0;
    justify-content: center;

    > svg {
      position: absolute;
      left: 50%;
      bottom: -1.75rem;
      fill: ${colorsV2.violet500};
      ${(props) =>
        props.dropdownIsVisible
          ? `transform: translateX(-50%) rotate(180deg);`
          : `transform: translateX(-50%)`}
    }
  }
`

const Dropdown = styled('div')<{ visible: boolean }>`
  background: ${colorsV2.white};
  width: 100%;
  position: absolute;
  left: 0;
  top: 4.25rem;
  height: calc(100% - 4.25rem);
  transition: all 0.2s;
  opacity: ${(props) => (props.visible ? 0.9 : 0)};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  padding: 1rem;
  box-sizing: border-box;
  border-top: 1px solid ${colorsV2.lightgray};

  @media (max-width: 600px) {
    top: 5.5rem;
    height: calc(100% - 5.5rem);
  }
`

const DropdownRow = styled('button')`
  width: 100%;
  background: none;
  border: none;
  font-size: 1rem;
  line-height: 1.5rem;
  text-align: left;
  color: ${colorsV2.darkgray};
  margin-bottom: 0.875rem;
  cursor: pointer;
  padding: 0 0.375rem;
  word-break: break-word;

  :focus {
    outline: none;
  }

  :hover {
    color: ${colorsV2.violet500};
  }

  @media (max-width: 600px) {
    font-size: 0.875rem;
    line-height: 1.25rem;
    padding: 0;
  }
`

const MobileDropdown = styled('select')`
  appearance: none;
  height: 1.5rem;
  margin-bottom: 3.25rem;
  border: 0;
  background: transparent;
  font-size: 0.875rem;
  font-family: inherit;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 85px;
  padding: 0;

  :active {
    font-size: 1rem;
    transform: scale(0.875);
    transform-origin: left center;
    -moz-transform: none; // firefox closes dropdown if you transform it on activation
  }
  :focus {
    outline: none;
    box-shadow: none;
  }
`

const getProperty = (key: string, value: any): any => {
  if (key === 'deductible') {
    return <ColumnRowPrimaryContent>{value} kr</ColumnRowPrimaryContent>
  }

  if (key === 'trustpilotScore') {
    return (
      <>
        <ColumnRowPrimaryContent>{value}</ColumnRowPrimaryContent> av 5
      </>
    )
  }

  return typeof value === 'string' ? (
    <ColumnRowPrimaryContent>{value}</ColumnRowPrimaryContent>
  ) : (
    <Checkmark />
  )
}

export const CompareTable = (props: Props) => {
  const [
    currentCompany,
    setCurrentCompany,
  ] = React.useState<CompanyProperties | null>(props.currentCompany || null)
  const [dropdownIsVisible, setDropdownIsVisible] = React.useState(false)
  const isMobile = useMediaQuery({ maxWidth: 600 })

  return (
    <Container>
      <InsurancePropertiesSection>
        <ColumnHead>
          <SubHeadingBlack>
            <TranslationsConsumer textKey="COMPARE_TABLE_TITLE">
              {(t) => t}
            </TranslationsConsumer>
          </SubHeadingBlack>

          <MobileTooltipWrapper>
            <Tooltip size="lg" body="Info" />
          </MobileTooltipWrapper>
        </ColumnHead>

        <InsurancePropertyNames>
          {Object.entries(props.insuranceProperties)
            .filter(([key]) => key !== 'name')
            .map(([key, property]) => (
              <InsuranceProperty key={key}>
                <TranslationsConsumer textKey={property.name}>
                  {(name) => name}
                </TranslationsConsumer>

                {property.tooltip && (
                  <TooltipWrapper>
                    <TranslationsConsumer textKey={property.tooltip.body}>
                      {(tooltip) => <Tooltip body={tooltip} />}
                    </TranslationsConsumer>
                  </TooltipWrapper>
                )}
              </InsuranceProperty>
            ))}
        </InsurancePropertyNames>
      </InsurancePropertiesSection>

      <PrimaryCompanySection>
        <PrimaryCompanyHead>
          <HedvigSymbol />
        </PrimaryCompanyHead>

        {Object.entries(props.primaryCompany)
          .filter(([key]) => key !== 'name')
          .map(([key, property]) => (
            <CompanyColumnRow key={key}>
              {getProperty(key, property)}
            </CompanyColumnRow>
          ))}
      </PrimaryCompanySection>

      <OtherCompaniesSection>
        {!isMobile && (
          <>
            <OtherCompanyHead
              currentCompany={currentCompany}
              dropdownIsVisible={dropdownIsVisible}
              onClick={() => {
                setDropdownIsVisible(!dropdownIsVisible)
              }}
            >
              {currentCompany !== null && !dropdownIsVisible ? (
                currentCompany.name
              ) : (
                <TranslationsConsumer textKey="COMPARE_TABLE_DROPDOWN_LABEL">
                  {(t) => t}
                </TranslationsConsumer>
              )}
              <DownArrow />
            </OtherCompanyHead>
            <Dropdown visible={dropdownIsVisible}>
              {props.otherCompanies.map((company) => (
                <DropdownRow
                  key={company.name}
                  onClick={() => {
                    setCurrentCompany(company)
                    setDropdownIsVisible(false)
                  }}
                >
                  {company.name}
                </DropdownRow>
              ))}
            </Dropdown>
          </>
        )}
        {isMobile && (
          <TranslationsConsumer textKey="COMPARE_TABLE_DROPDOWN_LABEL">
            {(selectCompanyText) => (
              <MobileDropdown
                onChange={(e) =>
                  setCurrentCompany(
                    otherCompanies.find(
                      ({ name }) => e.target.value === name,
                    ) || null,
                  )
                }
                value={currentCompany?.name}
                defaultValue={selectCompanyText}
              >
                <option disabled>{selectCompanyText}</option>
                {props.otherCompanies.map((company) => (
                  <option key={company.name}>{company.name}</option>
                ))}
              </MobileDropdown>
            )}
          </TranslationsConsumer>
        )}
        {currentCompany &&
          Object.entries(currentCompany)
            .filter(([key]) => key !== 'name')
            .map(([key, property]) => (
              <CompanyColumnRow key={key}>
                {getProperty(key, property)}
              </CompanyColumnRow>
            ))}
      </OtherCompaniesSection>
    </Container>
  )
}
