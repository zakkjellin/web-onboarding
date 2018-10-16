import { Provider } from 'constate'
import { mount } from 'enzyme'
import * as React from 'react'
import { MockTextKeyProvider } from 'utils/MockTextKeyProvider'
import { createSession } from 'utils/sessionStorage'
import { MockStorage } from 'utils/storage/MockStorage'
import { WithStorageProps } from 'utils/StorageContainer'
import { AddressInput } from './AddressInput'

it('handles form changes', () => {
  const wrapper = mount(
    <Provider<WithStorageProps>
      initialState={{ storage: { session: createSession(new MockStorage()) } }}
    >
      <MockTextKeyProvider
        textKeys={{
          CHAT_INPUT_ADDRESS_TEXT: '{streetAddress} {postalCode}',
        }}
      >
        <AddressInput isCurrentMessage />
      </MockTextKeyProvider>
    </Provider>,
  )

  expect(wrapper.find('button')).toHaveLength(0)

  wrapper
    .find('input#streetAddress')
    .simulate('change', { target: { value: 'Storgatan 1' } })
  expect(wrapper.find('input#streetAddress').prop('value')).toBe('Storgatan 1')
  wrapper
    .find('input#postalCode')
    .simulate('change', { target: { value: '12345' } })
  expect(wrapper.find('input#postalCode').prop('value')).toBe('12345')

  expect(wrapper.find('button')).toHaveLength(1)
})