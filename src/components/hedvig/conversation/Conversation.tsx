import styled from '@emotion/styled'
import * as React from 'react'
import Transition, { ENTERED } from 'react-transition-group/Transition'
import { MessageProps } from './Message'

const CONTAINER_PADDING = 20
const NEXT_BUTTON_SPACING = 40
const INTERCOM_SPACING = 80
export const HEIGHT_AND_SCROLL_ANIMATION_TIME = 250

export const ConversationWrapper = styled('div')({
  maxWidth: 1000,
  padding: `0 ${CONTAINER_PADDING}px`,
  margin: '0 auto',
  paddingBottom: CONTAINER_PADDING + NEXT_BUTTON_SPACING + INTERCOM_SPACING,
  fontSize: 24,
  minHeight: '90vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '@media (max-width: 500px)': {
    fontSize: 20,
  },
})

const getId = <TId extends {}>(
  child: React.ReactElement<MessageProps<TId>>,
): TId => React.Children.only(child).props.id

interface ConversationProps<TId> {
  children:
    | React.ReactElement<MessageProps<TId>>
    | Array<React.ReactElement<MessageProps<TId>>>
  currentStep?: TId
  visibleSteps?: TId[]
  initialVisibleSteps?: TId[]
  className?: string
}

export class Conversation<TId> extends React.Component<ConversationProps<TId>> {
  public render() {
    React.Children.forEach(this.props.children, (child, index) => {
      if (!React.isValidElement(child)) {
        throw new Error(`Child at index ${index} must be a Message`)
      }
    })

    const visibleSteps = this.props.visibleSteps || []
    const initialVisibleSteps = this.props.initialVisibleSteps || []
    return (
      <ConversationWrapper className={this.props.className}>
        {React.Children.toArray<React.ReactElement<MessageProps<TId>>>(
          this.props.children,
        )
          .filter((message) => visibleSteps.includes(getId(message)))
          .map((message) =>
            React.Children.only(message).props.delay &&
            !initialVisibleSteps.includes(getId(message)) ? (
              <Transition
                timeout={React.Children.only(message).props.delay!}
                appear
                in
                key={React.Children.only(message).key || undefined}
              >
                {(status) =>
                  status === ENTERED ? (
                    React.cloneElement<MessageProps<TId>>(
                      React.Children.only(message),
                      {
                        appear: false,
                      },
                    )
                  ) : (
                    <div /> // noop but needs to be here for the animation to work
                  )
                }
              </Transition>
            ) : (
              React.cloneElement<MessageProps<TId>>(
                React.Children.only(message),
                {
                  appear: initialVisibleSteps.includes(getId(message)),
                },
              )
            ),
          )}
      </ConversationWrapper>
    )
  }
}
