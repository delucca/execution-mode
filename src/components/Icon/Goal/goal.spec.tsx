import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Goal from './goal'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const goal = enzyme.shallow(<Goal title={fakeTitle} desc="" />)

    const svgTitleComponent = goal.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const goal = enzyme.shallow(<Goal title="" desc={fakeDesc} />)

    const svgDescComponent = goal.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const goal = enzyme.shallow(<Goal title="" desc="" {...fakeProperties} />)

    const iconComponent = goal.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const goal = enzyme.shallow(<Goal title="" desc="" />)

    const iconComponent = goal.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const goal = enzyme.shallow(<Goal title="" desc="" fill={fakeColor} />)

    const iconComponent = goal.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})
