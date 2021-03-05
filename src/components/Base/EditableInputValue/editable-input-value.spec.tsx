import enzyme from 'enzyme'
import faker from 'faker'
import React from 'react'

import EditableInputValue from './editable-input-value'

describe('component interactions', () => {
  it('should change the color of the text upon mouse hover', () => {
    const wrapper = enzyme.mount(<EditableInputValue value={faker.random.word()} />)

    const stack = wrapper.find('Stack')
    stack.simulate('mouseEnter')

    const editablePreview = wrapper.find('EditablePreview')

    expect(editablePreview.prop('color')).toEqual('brand.500')
  })

  it('should show the pen icon upon mouse hover', () => {
    const wrapper = enzyme.mount(<EditableInputValue value={faker.random.word()} />)

    const stack = wrapper.find('Stack')
    stack.simulate('mouseEnter')

    const penIcon = wrapper.find('Pen')

    expect(penIcon.prop('opacity')).toEqual(1)
  })

  it('should hide the pen icon upon mouse leave', () => {
    const wrapper = enzyme.mount(<EditableInputValue value={faker.random.word()} />)

    const stack = wrapper.find('Stack')
    stack.simulate('mouseEnter')
    stack.simulate('mouseLeave')

    const penIcon = wrapper.find('Pen')

    expect(penIcon.prop('opacity')).toEqual(0)
  })

  it('should change back the color upon mouse leave', () => {
    const wrapper = enzyme.mount(<EditableInputValue value={faker.random.word()} />)

    const stack = wrapper.find('Stack')
    stack.simulate('mouseEnter')
    stack.simulate('mouseLeave')

    const editablePreview = wrapper.find('EditablePreview')

    expect(editablePreview.prop('color')).toEqual('black.900')
  })

  it('should disable the field when the user is submitting', () => {
    const wrapper = enzyme.mount(<EditableInputValue isSubmitting value={faker.random.word()} />)

    const editable = wrapper.find('Editable')

    expect(editable.prop('isDisabled')).toEqual(true)
  })

  it('should change stack cursor when the user is submitting', () => {
    const wrapper = enzyme.mount(<EditableInputValue isSubmitting value={faker.random.word()} />)

    const stack = wrapper.find('Stack')

    expect(stack.prop('cursor')).toEqual('auto')
  })

  it('should change the color of the input when the user is submitting', () => {
    const wrapper = enzyme.mount(<EditableInputValue isSubmitting value={faker.random.word()} />)

    const editablePreview = wrapper.find('EditablePreview')

    expect(editablePreview.prop('color')).toEqual('gray.400')
  })
})

describe('fallback value', () => {
  it('should change the color if no value is provided', () => {
    const wrapper = enzyme.mount(<EditableInputValue />)

    const editablePreview = wrapper.find('EditablePreview')

    expect(editablePreview.prop('color')).toEqual('gray.400')
  })

  it('should render the provided fallback value', () => {
    const customFallback = faker.random.word()
    const wrapper = enzyme.mount(<EditableInputValue customFallbackValue={customFallback} />)

    const editablePreview = wrapper.find('EditablePreview')

    expect(editablePreview.text()).toEqual(customFallback)
  })

  it('should render the provided fallback value if value is null', () => {
    const customFallback = faker.random.word()
    const wrapper = enzyme.mount(
      // eslint-disable-next-line unicorn/no-null
      <EditableInputValue customFallbackValue={customFallback} value={null} />,
    )

    const editablePreview = wrapper.find('EditablePreview')

    expect(editablePreview.text()).toEqual(customFallback)
  })
})