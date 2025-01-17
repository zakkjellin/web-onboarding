import { Provider } from 'constate'
import { OFFER_QUERY } from 'containers/OfferContainer'
import { mount } from 'enzyme'
import * as React from 'react'
import { MockedProvider, MockedResponse } from 'react-apollo/test-utils'
import { Redirect, StaticRouter } from 'react-router'
import { createSession } from 'utils/sessionStorage'
import { MockStorage } from 'utils/storage/MockStorage'
import { ChatScreenContainer } from '../containers/ChatScreenContainer'
import { LoadingScreen } from './LoadingScreen'
import { OfferCreationHandler } from './OfferCreationHandler'

jest.useFakeTimers()
jest.mock('client/apolloClient', () => ({
  apolloClient: {
    subscriptionClient: {
      close: jest.fn(),
    },
  },
}))

it('does nothing when no correct state is set', async () => {
  const mocks: MockedResponse[] = [
    {
      request: {
        query: OFFER_QUERY,
      },
      result: {
        data: {
          insurance: {
            address: 'Testvägen 1',
            cost: {
              monthlyNet: {
                amount: '99.00',
                currency: 'SEK',
                __typename: 'MonetaryAmount',
              },
              monthlyGross: {
                amount: '99.00',
                currency: 'SEK',
                __typename: 'MonetaryAmount',
              },
              monthlyDiscount: {
                amount: '0.00',
                currency: 'SEK',
                __typename: 'MonetaryAmount',
              },
              __typename: 'InsuranceCost',
            },
            insuredAtOtherCompany: false,
            type: 'RENT',
            postalNumber: '12345',
            personsInHousehold: 1,
            currentInsurerName: 'FOLKSAM',
            __typename: 'Insurance',
          },
          redeemedCampaigns: [],
          member: {
            id: '1337',
            firstName: 'Test',
            lastName: 'Testerson',
            email: 'test@testerson.se',
            __typename: 'Member',
          },
        },
      },
    },
  ]
  const wrapper = mount(
    <StaticRouter context={{}} location="/new-member/hedvig">
      <MockedProvider mocks={mocks}>
        <Provider
          initialState={{
            storage: {
              session: createSession(new MockStorage({})),
            },
          }}
        >
          <OfferCreationHandler />
          <ChatScreenContainer>
            {(state) => (
              <>
                <button
                  id="trigger-debounce"
                  onClick={() => state.beginDebounce()}
                />
                <button
                  id="trigger-loading"
                  onClick={() => state.beginCreateOffer()}
                />
                <button
                  id="trigger-finished"
                  onClick={() => state.createOfferSuccess()}
                />
              </>
            )}
          </ChatScreenContainer>
        </Provider>
      </MockedProvider>
    </StaticRouter>,
  )

  expect(wrapper.find(Redirect)).toHaveLength(0)
  expect(wrapper.find(LoadingScreen)).toHaveLength(0)

  wrapper.find('#trigger-loading').simulate('click')
  expect(wrapper.find(LoadingScreen)).toHaveLength(1)

  wrapper.find('#trigger-debounce').simulate('click')
  wrapper.find('#trigger-finished').simulate('click')
  expect(wrapper.find(LoadingScreen)).toHaveLength(1)

  jest.runAllTimers()
  wrapper.update()

  expect(wrapper.find(Redirect).prop('to')).toBe('/new-member/offer')
})
