import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import Buoy from './buoy'

describe('icon customization', () => {
  it('allows the customization of the icon title', () => {
    const fakeTitle = faker.random.word()
    const buoy = enzyme.shallow(<Buoy title={fakeTitle} desc="" />)

    const svgTitleComponent = buoy.find('title')

    expect(svgTitleComponent.text()).toEqual(fakeTitle)
  })

  it('allows the customization of the icon description', () => {
    const fakeDesc = faker.random.word()
    const buoy = enzyme.shallow(<Buoy title="" desc={fakeDesc} />)

    const svgDescComponent = buoy.find('desc')

    expect(svgDescComponent.text()).toEqual(fakeDesc)
  })

  it('passes any unhandled customization directly to the Icon wrapper', () => {
    const fakeProperties = faker.helpers.userCard()
    const buoy = enzyme.shallow(<Buoy title="" desc="" {...fakeProperties} />)

    const iconComponent = buoy.find('Icon')

    expect(iconComponent.props()).toMatchObject(fakeProperties)
  })

  it('uses black as default fill', () => {
    const buoy = enzyme.shallow(<Buoy title="" desc="" />)

    const iconComponent = buoy.find('Icon')

    expect(iconComponent.props().fill).toEqual('black')
  })

  it('can customize the icon fill color', () => {
    const fakeColor = faker.internet.color()
    const buoy = enzyme.shallow(<Buoy title="" desc="" fill={fakeColor} />)

    const iconComponent = buoy.find('Icon')

    expect(iconComponent.props().fill).toEqual(fakeColor)
  })
})