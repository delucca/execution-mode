import faker from 'faker'

import { KeyResultFormat } from 'src/components/KeyResult/types'

import AbsoluteMask from './Absolute'
import CoinBRLMask from './CoinBRL'
import PercentageMask from './Percentage'
import * as selectors from './selectors'

describe('select masked based on format', () => {
  it('returns the absolute mask if the number format is provided', () => {
    const format = KeyResultFormat.NUMBER

    const mask = selectors.selectMaskBasedOnFormat(format)

    expect(mask).toEqual(AbsoluteMask)
  })

  it('returns the percentage mask if the percentage format is provided', () => {
    const format = KeyResultFormat.PERCENTAGE

    const mask = selectors.selectMaskBasedOnFormat(format)

    expect(mask).toEqual(PercentageMask)
  })

  it('returns the brazillian reais mask if the brazillian reais format is provided', () => {
    const format = KeyResultFormat.COIN_BRL

    const mask = selectors.selectMaskBasedOnFormat(format)

    expect(mask).toEqual(CoinBRLMask)
  })

  it('returns the absolute mask if no format is provided', () => {
    const mask = selectors.selectMaskBasedOnFormat()

    expect(mask).toEqual(AbsoluteMask)
  })

  it('returns the absolute mask if an invalid format is provided', () => {
    const mask = selectors.selectMaskBasedOnFormat(faker.random.word() as KeyResultFormat)

    expect(mask).toEqual(AbsoluteMask)
  })
})