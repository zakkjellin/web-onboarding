import styled from '@emotion/styled'
import { colors } from '@hedviginsurance/brand'

export const Wrapper = styled('div')({
  width: '100%',
  backgroundColor: colors.OFF_WHITE,
  paddingLeft: '20px',
  paddingRight: '20px',
  '@media (max-width: 350px)': {
    paddingLeft: '10px',
    paddingRight: '10px',
  },
})
