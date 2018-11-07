export enum InsuranceType {
  RENT = 'RENT',
  BRF = 'BRF',
  STUDENT_RENT = 'STUDENT_RENT',
  STUDENT_BRF = 'STUDENT_BRF',
}

export const isApartmentOwner = (insuranceType: InsuranceType): boolean =>
  insuranceType === InsuranceType.BRF ||
  insuranceType === InsuranceType.STUDENT_BRF

export const isStudentInsurance = (insuranceType: InsuranceType): boolean =>
  insuranceType === InsuranceType.STUDENT_RENT ||
  insuranceType === InsuranceType.STUDENT_BRF

export const qualifiesForStudentInsurance = (details: {
  age: number
  squareMeters: number
  numberOfPeople: number
}): boolean => {
  const { age, squareMeters, numberOfPeople } = details
  return age <= 30 && squareMeters <= 50 && numberOfPeople <= 2
}

export const mapToStudentVariant = (insuranceType: InsuranceType) => {
  if (insuranceType === InsuranceType.RENT) {
    return InsuranceType.STUDENT_RENT
  }
  if (insuranceType === InsuranceType.BRF) {
    return InsuranceType.STUDENT_BRF
  }

  throw new Error(
    `Unreachable state when mapping student variant, expected either "RENT" or "BRF" but got "${insuranceType}"`,
  )
}

export const getPrebuyPDFTextKey = (insuranceType: InsuranceType): string => {
  const map = {
    [InsuranceType.RENT]: 'TERMS_PDF_PREBUY_RENT_URL',
    [InsuranceType.BRF]: 'TERMS_PDF_PREBUY_BRF_URL',
    [InsuranceType.STUDENT_RENT]: 'TERMS_PDF_PREBUY_STUDENT_RENT_URL',
    [InsuranceType.STUDENT_BRF]: 'TERMS_PDF_PREBUY_STUDENT_BRF_URL',
  }

  if (!map[insuranceType]) {
    throw new Error(`Invalid insurance type ${insuranceType}`)
  }
  return map[insuranceType]
}

export const getInsurancePDFTextKey = (
  insuranceType: InsuranceType,
): string => {
  const map = {
    [InsuranceType.RENT]: 'TERMS_PDF_INSURANCE_RENT_URL',
    [InsuranceType.BRF]: 'TERMS_PDF_INSURANCE_BRF_URL',
    [InsuranceType.STUDENT_RENT]: 'TERMS_PDF_INSURANCE_STUDENT_RENT_URL',
    [InsuranceType.STUDENT_BRF]: 'TERMS_PDF_INSURANCE_STUDENT_BRF_URL',
  }

  if (!map[insuranceType]) {
    throw new Error(`Invalid insurance type ${insuranceType}`)
  }
  return map[insuranceType]
}