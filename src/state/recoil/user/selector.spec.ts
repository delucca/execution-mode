import faker from 'faker'
import sinon from 'sinon'

import userAtomFamily from './atom-family'
import * as selectors from './selector'

describe('setter', () => {
  afterEach(() => sinon.restore())

  it('preserves previous key result values upon update', () => {
    const previousValue = {
      foo: faker.random.word(),
    }
    const newValue = {
      boo: faker.random.word(),
    }
    const stub = sinon.stub().returns(previousValue)
    const spy = sinon.spy()
    const fakeID = faker.random.word()
    const selector = selectors.updateUser(fakeID)

    selector({ get: stub, set: spy } as any, newValue as any)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(userAtomFamily(fakeID), {
      ...previousValue,
      ...newValue,
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('preserves previous deep key result values upon update', () => {
    const previousValue = {
      foo: faker.random.word(),
      boo: {
        foo: faker.random.word(),
      },
    }
    const newValue = {
      boo: {
        boo: faker.random.word(),
      },
    }
    const stub = sinon.stub().returns(previousValue)
    const spy = sinon.spy()
    const fakeID = faker.random.word()
    const selector = selectors.updateUser(fakeID)

    selector({ get: stub, set: spy } as any, newValue as any)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(userAtomFamily(fakeID), {
      ...previousValue,
      boo: {
        ...previousValue.boo,
        ...newValue.boo,
      },
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('overwrite already existing values with new ones', () => {
    const previousValue = {
      foo: faker.random.word(),
    }
    const newValue = {
      foo: faker.random.word(),
    }
    const stub = sinon.stub().returns(previousValue)
    const spy = sinon.spy()
    const fakeID = faker.random.word()
    const selector = selectors.updateUser(fakeID)

    selector({ get: stub, set: spy } as any, newValue as any)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(userAtomFamily(fakeID), {
      ...newValue,
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('overwrite already existing deep values with new ones', () => {
    const previousValue = {
      foo: faker.random.word(),
      boo: {
        boo: faker.random.word(),
      },
    }
    const newValue = {
      boo: {
        boo: faker.random.word(),
      },
    }
    const stub = sinon.stub().returns(previousValue)
    const spy = sinon.spy()
    const fakeID = faker.random.word()
    const selector = selectors.updateUser(fakeID)

    selector({ get: stub, set: spy } as any, newValue as any)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(userAtomFamily(fakeID), {
      ...previousValue,
      boo: {
        ...newValue.boo,
      },
    })

    expect(wasSpyCalledAsExpected).toEqual(true)
  })

  it('overwrites already existing arrays', () => {
    const previousValue = {
      foo: [faker.random.word()],
    }
    const newValue = {
      foo: [faker.random.word(), faker.random.word()],
    }
    const stub = sinon.stub().returns(previousValue)
    const spy = sinon.spy()
    const fakeID = faker.random.word()
    const selector = selectors.updateUser(fakeID)

    selector({ get: stub, set: spy } as any, newValue as any)

    const wasSpyCalledAsExpected = spy.calledOnceWithExactly(userAtomFamily(fakeID), newValue)

    expect(wasSpyCalledAsExpected).toEqual(true)
  })
})
