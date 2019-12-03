import styled from '@emotion/styled'
import { colorsV2 } from '@hedviginsurance/brand'
import color from 'color'
import { Size } from './types'
import { Link } from 'react-router-dom'

interface ButtonProps {
  background?: string
  foreground?: string
  size?: Size
  disabled?: boolean
}

export const Button = styled.button<ButtonProps>`
  font-size: ${(props) => (props.size === 'lg' ? `1rem` : `0.875rem`)};
  line-height: ${(props) => (props.size === 'lg' ? `1rem` : `1.25rem`)};
  padding: ${(props) =>
    props.size === 'lg' ? `1.5rem 2.5rem` : `0.875rem 1.5rem`};
  background: ${(props) =>
    props.disabled
      ? color(props.background)
          .lighten(0.5)
          .toString()
      : props.background};
  color: ${(props) => props.foreground};
  font-weight: 500;
  border-radius: ${(props) => (props.size === 'lg' ? `2rem` : `1.5rem`)};
  border: none;
  cursor: ${(props) => (props.disabled ? `default` : `pointer`)};
  transition: all 0.15s ease-in-out;
  text-decoration: none;

  :focus {
    outline: none;
  }

  ${(props) =>
    !props.disabled &&
    `
    :hover {
      background: ${color(props.background)
        .darken(0.1)
        .toString()};
    }
  `}
`

const defaultButtonProps: ButtonProps = {
  background: colorsV2.violet500,
  foreground: colorsV2.white,
  size: 'sm',
  disabled: false,
}

Button.defaultProps = defaultButtonProps

export const LinkButton = Button.withComponent(Link)
LinkButton.defaultProps = defaultButtonProps

export const PureLinkButton = Button.withComponent('a')
PureLinkButton.defaultProps = defaultButtonProps

export const TextButton = styled.button`
  background: none;
  padding: 0;
  margin: 0;
  color: ${colorsV2.violet500};
  font-size: 0.875rem;
  line-height: 1.5rem;
  border: none;
  cursor: pointer;
  display: flex;
  transition: color 0.1s ease;

  :hover {
    color: ${colorsV2.violet700};
  }

  :focus {
    outline: none;
  }
`
