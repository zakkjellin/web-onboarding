import styled from '@emotion/styled'

interface MufflableProps {
  muffled: boolean
  unMuffled?: boolean
  unMufflable?: boolean
  direction?: string
}

export const Mufflable = styled('div')<MufflableProps>(
  ({
    muffled,
    unMuffled = false,
    unMufflable = false,
    direction = 'left',
  }) => ({
    opacity: muffled && !unMuffled ? 0.5 : 1,
    fontSize: muffled ? 16 : 20,
    transformOrigin: `top ${direction}`,
    transition: 'opacity 200ms, font 200ms',
    '&:hover': {
      opacity: unMufflable ? 1 : undefined,
    },
  }),
)
