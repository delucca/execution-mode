import faker from 'faker'
import sinon from 'sinon'

import * as currentProgress from './current-progress'

describe('getter', () => {
  afterEach(() => sinon.restore())

  it('calls partial selector with provided ID', () => {
    const spy = sinon.spy(currentProgress, 'selectProgressReports')
    const fakeID = faker.random.word()
    const getCurrentProgress = currentProgress.getCurrentProgress(fakeID)

    getCurrentProgress({ get: sinon.fake() })

    const wasCalledWithFakeID = spy.calledOnceWithExactly(fakeID)

    expect(wasCalledWithFakeID).toEqual(true)
  })

  it('returns the value new from latest progress report', () => {
    const fakeID = faker.random.word()
    const latestProgressValue = faker.random.number()
    const getStub = sinon.stub().returns([{ valueNew: latestProgressValue }])
    const getCurrentProgress = currentProgress.getCurrentProgress(fakeID)

    const result = getCurrentProgress({ get: getStub })

    expect(result).toEqual(latestProgressValue)
  })

  it('returns undefined if undefined ID was provided', () => {
    const getCurrentProgress = currentProgress.getCurrentProgress()

    const result = getCurrentProgress({ get: sinon.fake() })

    expect(result).not.toBeDefined()
  })

  it('returns undefined if there is no progress reports', () => {
    const fakeID = faker.random.word()
    const getCurrentProgress = currentProgress.getCurrentProgress(fakeID)

    const result = getCurrentProgress({ get: sinon.fake() })

    expect(result).not.toBeDefined()
  })
})

describe('setter', () => {
  afterEach(() => sinon.restore())

  it('calls partial selector with provided ID', () => {
    const spy = sinon.spy(currentProgress, 'selectProgressReports')
    const fakeID = faker.random.word()
    const setCurrentProgress = currentProgress.setCurrentProgress(fakeID)

    setCurrentProgress(
      {
        get: sinon.fake(),
        set: sinon.fake(),
      },
      faker.random.number(),
    )

    const wasCalledWithFakeID = spy.calledOnceWithExactly(fakeID)

    expect(wasCalledWithFakeID).toEqual(true)
  })

  it('asks to set our progress reports with an updated value', () => {
    const latestProgressValue = faker.random.number()
    const latestProgressReport = { valueNew: latestProgressValue }
    const fakeSelector = sinon.fake()

    sinon.stub(currentProgress, 'selectProgressReports').returns(fakeSelector as any)
    const getterStub = sinon.stub().returns([latestProgressReport])
    const setterSpy = sinon.spy()

    const fakeID = faker.random.word()
    const valueNew = faker.random.number()
    const setCurrentProgress = currentProgress.setCurrentProgress(fakeID)

    setCurrentProgress(
      {
        get: getterStub,
        set: setterSpy,
      },
      valueNew,
    )

    const expectedNewProgressReports = [
      { valueNew, valuePrevious: latestProgressValue },
      latestProgressReport,
    ]
    const wasCalledAsExpected = setterSpy.calledOnceWithExactly(
      fakeSelector,
      expectedNewProgressReports,
    )

    expect(wasCalledAsExpected).toEqual(true)
  })

  it('returns undefined if undefined ID was provided', () => {
    const setCurrentProgress = currentProgress.setCurrentProgress()

    const result = setCurrentProgress(
      { get: sinon.fake(), set: sinon.fake() },
      faker.random.number(),
    )

    expect(result).not.toBeDefined()
  })
})