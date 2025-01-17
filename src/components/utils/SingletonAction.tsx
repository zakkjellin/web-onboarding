import { Container, ContainerProps, EffectMap, EffectProps } from 'constate'
import * as React from 'react'

interface State {
  isActionDone: boolean
}
interface Effects {
  doAction: () => void
}

export const SingletonAction: React.SFC<ContainerProps<
  State,
  {},
  {},
  EffectMap<State, Effects>
>> = (props) => (
  <Container<State, {}, {}, EffectMap<State, Effects>>
    initialState={{ isActionDone: false }}
    effects={
      {
        doAction: () => ({ setState }: EffectProps<State>) => {
          setTimeout(() => {
            setState({ isActionDone: true }) // cant set state during render so we need to do it async
          }, 0)
        },
      } as any
    }
    {...props}
  />
)
