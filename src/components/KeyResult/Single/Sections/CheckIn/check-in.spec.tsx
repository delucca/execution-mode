import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'
import * as recoil from 'recoil'
import sinon from 'sinon'

import KeyResultSectionCheckIn from './check-in'

const selectCurrentProgressMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('CURRENT_PROGRESS')
})

const selectKeyResultPoliciesMatcher = sinon.match((selector: recoil.RecoilState<unknown>) => {
  return selector.key.includes('POLICIES')
})

const defaultPolicies = {
  childEntities: {
    keyResultCheckIn: {},
  },
}

describe('component interations', () => {
  afterEach(() => sinon.restore())

  it('does not shows the form upon mounting', () => {
    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectKeyResultPoliciesMatcher).returns(defaultPolicies)
    sinon.stub(recoil, 'useRecoilState').returns([false, sinon.fake()])

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const formWrapper = result.find('Collapse')

    expect(formWrapper.prop('in')).toEqual(false)
  })

  it('shows the form if the user is trying to create a check-in', () => {
    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectKeyResultPoliciesMatcher).returns(defaultPolicies)
    sinon.stub(recoil, 'useRecoilState').returns([true, sinon.fake()])

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const formWrapper = result.find('Collapse')

    expect(formWrapper.prop('in')).toEqual(true)
  })

  it('changes the text of the button when the user is trying to create a check-in', () => {
    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectKeyResultPoliciesMatcher).returns(defaultPolicies)
    sinon.mock(recoil).expects('useRecoilState').atLeast(1).returns([true, sinon.fake()])

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const button = result.find('Button')

    expect(button.text()).toEqual('Cancelar check-in')
  })

  it('resets the draft value upon check-in form closing', () => {
    const currentProgress = faker.random.number()
    const spy = sinon.spy()
    const fakeCheckInPolicies = {
      create: 'ALLOW',
    }
    const fakeKeyResultPolicies = {
      childEntities: {
        keyResultCheckIn: fakeCheckInPolicies,
      },
    }

    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectKeyResultPoliciesMatcher).returns(fakeKeyResultPolicies)
    stub.withArgs(selectCurrentProgressMatcher).returns(currentProgress)
    sinon.stub(recoil, 'useSetRecoilState').returns(spy)
    sinon.stub(recoil, 'useRecoilState').returns([true, sinon.fake()])

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const button = result.find('Button')
    button.simulate('click')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(currentProgress)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('resets the is creating check-in value upon check-in form closing', () => {
    const currentProgress = faker.random.number()
    const spy = sinon.spy()
    const fakeCheckInPolicies = {
      create: 'ALLOW',
    }
    const fakeKeyResultPolicies = {
      childEntities: {
        keyResultCheckIn: fakeCheckInPolicies,
      },
    }

    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectKeyResultPoliciesMatcher).returns(fakeKeyResultPolicies)
    stub.withArgs(selectCurrentProgressMatcher).returns(currentProgress)
    sinon.stub(recoil, 'useSetRecoilState').returns(sinon.fake())
    sinon.stub(recoil, 'useRecoilState').returns([true, spy])

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const button = result.find('Button')
    button.simulate('click')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(false)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('sets that the user is creating check-in value upon check-in form opening', () => {
    const currentProgress = faker.random.number()
    const spy = sinon.spy()
    const fakeCheckInPolicies = {
      create: 'ALLOW',
    }
    const fakeKeyResultPolicies = {
      childEntities: {
        keyResultCheckIn: fakeCheckInPolicies,
      },
    }

    const stub = sinon.stub(recoil, 'useRecoilValue')
    stub.withArgs(selectKeyResultPoliciesMatcher).returns(fakeKeyResultPolicies)
    stub.withArgs(selectCurrentProgressMatcher).returns(currentProgress)
    sinon.stub(recoil, 'useSetRecoilState').returns(sinon.fake())
    sinon.stub(recoil, 'useRecoilState').returns([false, spy])

    const result = enzyme.shallow(<KeyResultSectionCheckIn keyResultID={faker.random.uuid()} />)

    const button = result.find('Button')
    button.simulate('click')

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(true)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
