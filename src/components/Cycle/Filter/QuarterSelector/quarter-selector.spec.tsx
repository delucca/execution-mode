import { MockedProvider } from '@apollo/client/testing'
import { ThemeProvider } from '@chakra-ui/react'
import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import { RecoilRoot } from 'recoil'
import sinon from 'sinon'

import { RecoilSpy, waitForComponentToPaint } from 'lib/enzyme/helpers'

import CycleFilterQuarterSelector from './quarter-selector'
import queries from './queries.gql'

describe('component lifecycle', () => {
  it('do not execute the query if there is no parent cycle filter', async () => {
    const firstCycle = {
      id: faker.random.uuid(),
      period: faker.random.word(),
    }
    const secondCycle = {
      id: faker.random.uuid(),
      period: faker.random.word(),
    }

    const mocks = [
      {
        request: {
          query: queries.GET_QUARTERLY_CYCLES_FROM_FILTERED_PARENTS,
          variables: {
            parentIds: undefined,
          },
        },
        result: {
          data: {
            cyclesInSamePeriod: [firstCycle, secondCycle],
          },
        },
      },
    ]

    const wrapper = enzyme.mount(
      <MockedProvider mocks={mocks}>
        <RecoilRoot>
          <ThemeProvider theme={{}}>
            <CycleFilterQuarterSelector onQuarterFilter={sinon.fake()} />
            <RecoilSpy />
          </ThemeProvider>
        </RecoilRoot>
      </MockedProvider>,
    )

    await waitForComponentToPaint(wrapper)
    await waitForComponentToPaint(wrapper)

    const spyAnchor = wrapper.find('RecoilSpyAnchor')
    const loadedFirstCycle = spyAnchor.prop(`CYCLE::FAMILY__"${firstCycle.id}"`)
    const loadedSecondCycle = spyAnchor.prop(`CYCLE::FAMILY__"${secondCycle.id}"`)

    expect(loadedFirstCycle).toBeUndefined()
    expect(loadedSecondCycle).toBeUndefined()
  })
})

describe('component rendering', () => {
  it('do not display the last fetched quarters when the parent filter is cleared', async () => {
    const parentCycleIDs = [faker.random.uuid()]
    const firstCycle = {
      id: faker.random.uuid(),
      period: faker.random.word(),
    }
    const secondCycle = {
      id: faker.random.uuid(),
      period: faker.random.word(),
    }

    const mocks = [
      {
        request: {
          query: queries.GET_QUARTERLY_CYCLES_FROM_FILTERED_PARENTS,
          variables: {
            parentIds: parentCycleIDs,
          },
        },
        result: {
          data: {
            cyclesInSamePeriod: [firstCycle, secondCycle],
          },
        },
      },
    ]

    const TestComponent = ({ filteredYearIDs }: any) => (
      <MockedProvider mocks={mocks}>
        <RecoilRoot>
          <ThemeProvider theme={{}}>
            <CycleFilterQuarterSelector
              filteredYearIDs={filteredYearIDs}
              onQuarterFilter={sinon.fake()}
            />
            <RecoilSpy />
          </ThemeProvider>
        </RecoilRoot>
      </MockedProvider>
    )

    const wrapper = enzyme.mount(<TestComponent filteredYearIDs={parentCycleIDs} />)

    await waitForComponentToPaint(wrapper)
    await waitForComponentToPaint(wrapper)

    wrapper.setProps({
      filteredYearIDs: undefined,
    })
    wrapper.update()

    const buttons = wrapper.find('CycleFilterQuarterSelectorButton')

    expect(buttons.length).toEqual(4)
    buttons.map((button) => expect(button.prop('isDisabled')).toEqual(true))
  })

  it('do not duplicate quarter filter buttons', async () => {
    const parentCycleIDs = [faker.random.uuid()]
    const fakePeriod = faker.random.word()
    const firstCycle = {
      id: faker.random.uuid(),
      period: fakePeriod,
    }
    const secondCycle = {
      id: faker.random.uuid(),
      period: fakePeriod,
    }

    const mocks = [
      {
        request: {
          query: queries.GET_QUARTERLY_CYCLES_FROM_FILTERED_PARENTS,
          variables: {
            parentIds: parentCycleIDs,
          },
        },
        result: {
          data: {
            cyclesInSamePeriod: [firstCycle, secondCycle],
          },
        },
      },
    ]

    const wrapper = enzyme.mount(
      <MockedProvider mocks={mocks}>
        <RecoilRoot>
          <ThemeProvider theme={{}}>
            <CycleFilterQuarterSelector
              filteredYearIDs={parentCycleIDs}
              onQuarterFilter={sinon.fake()}
            />
            <RecoilSpy />
          </ThemeProvider>
        </RecoilRoot>
      </MockedProvider>,
    )

    await waitForComponentToPaint(wrapper)
    await waitForComponentToPaint(wrapper)

    const buttons = wrapper.find('CycleFilterQuarterSelectorButton')

    expect(buttons.length).toEqual(1)
    buttons.map((button) => expect(button.text()).toEqual(fakePeriod))
  })
})