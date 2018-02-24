import React from 'react'
import { shallow, mount } from 'enzyme'
import ClickableButton, { Button } from './Button'

const basicProps = {
  label: 'Click',
  pressed: false,
  disabled: false,
  onClick: () => {},
  onMouseDown: () => {},
  onMouseUp: () => {}
}

describe('ClickableButton', () => {
  it('does not call onClick when disabled', () => {
    const mockFn = jest.fn()
    const wrapper = mount(<ClickableButton disabled onClick={mockFn} />)
    const button = wrapper.find('button')
    
    expect(button).toHaveLength(1)
    button.simulate('click')
    expect(mockFn).toHaveBeenCalledTimes(0)
  })

  it('calls onClick when disabled', () => {
    const mockFn = jest.fn()
    const wrapper = mount(<ClickableButton onClick={mockFn} />)
    const button = wrapper.find('button')
    button.simulate('click')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('changes state to "pressed: true" when mouse is down', () => {
    const wrapper = mount(<ClickableButton />)
    const button = wrapper.find('button')
    button.simulate('mouseDown')
    expect(wrapper.state().pressed).toEqual(true)
  })

  it('changes state to "pressed: false" when mouse is up', () => {
    const wrapper = mount(<ClickableButton />)
    const button = wrapper.find('button')
    button.simulate('mouseDown')
    button.simulate('mouseUp')
    expect(wrapper.state().pressed).toEqual(false)
  })

  it('does not change state to "pressed: true" when mouse is down but the button is disabled', () => {
    const wrapper = mount(<ClickableButton disabled />)
    const button = wrapper.find('button')
    button.simulate('mouseDown')
    expect(wrapper.state().pressed).toEqual(false)
  })
})

describe('Button', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<Button {...basicProps} disabled />)
  })
})

