import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { MockTextKeyProvider } from 'utils/MockTextKeyProvider'
import { createSession } from 'utils/sessionStorage'
import { MockStorage } from 'utils/storage/MockStorage'
import { WithStorageProps } from 'utils/StorageContainer'
import { Insurer } from '../state'
import { CurrentInsuranceInput } from './CurrentInsuranceInput'

it('handles form changes', () => {
  const wrapper = mount(
    <Provider<WithStorageProps>
      initialState={{ storage: { session: createSession(new MockStorage()) } }}
    >
      <MockTextKeyProvider
        textKeys={{
          CHAT_INPUT_CURRENT_INSURANCE_TEXT: '{toggle}',
          CHAT_INPUT_CURRENT_INSURANCE_TEXT_HAS_INSURANCE:
            '{toggle} {currentInsurerMaybe}',
        }}
      >
        <CurrentInsuranceInput isCurrentMessage />
      </MockTextKeyProvider>
    </Provider>,
  )

  expect(wrapper.find('button').prop('disabled')).toBe(true)

  wrapper
    .find('select#hasCurrentInsurance')
    .simulate('change', { target: { value: 'yes' } })
  expect(wrapper.find('select#hasCurrentInsurance').prop('value')).toBe('yes')
  wrapper
    .find('select#currentInsurer')
    .simulate('change', { target: { value: Insurer.FOLKSAM } })
  expect(wrapper.find('select#currentInsurer').prop('value')).toBe(
    Insurer.FOLKSAM,
  )
  expect(wrapper.find('button').prop('disabled')).toBe(false)
})
