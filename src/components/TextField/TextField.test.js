import React from 'react'
import { shallow, mount } from 'enzyme'
import TextField from './TextField'

import { StyledInput, StyledChosed } from './styled'

const basicProps = {
  focused: false,
  value: '',
  selected: null,
  renderSelected: () => {},
  onFocus: () => {}
}

describe('TextField', () => {
  it('renders without crashing', () => {
    shallow(<TextField {...basicProps} />)
  })

  it('passes text extracted from input properly', () => {
    const mockChange = jest.fn()
    const wrapper = mount(<TextField {...basicProps} onChange={mockChange} />)
    const styledInput = wrapper.find(StyledInput)
    expect(styledInput).toHaveLength(1)
    styledInput.simulate('change', { nativeEvent: { srcElement: { value: 'a' } } })
    expect(mockChange).toHaveBeenCalledWith('a')
  })

  it('renders custom selected item when receive it from props', () => {
    const renderSelected = ({ value }) => <div>{value}</div>
    const additionalProps = { renderSelected, selected: { value: 'a' } }

    const wrapper = mount(<TextField {...basicProps} {...additionalProps} />)

    const selectedItem = wrapper.find(StyledChosed)
    expect(selectedItem).toHaveLength(1)
  })

  it('calls onChange with empty string when click on selected item', () => {
    const mockChange = jest.fn()
    const renderSelected = ({ value }) => <div>{value}</div>
    const additionalProps = { renderSelected, selected: { value: 'a' }, onChange: mockChange }

    const wrapper = mount(<TextField {...basicProps} {...additionalProps} />)

    const selectedItem = wrapper.find(StyledChosed)
    selectedItem.simulate('click')
    expect(mockChange).toHaveBeenCalledWith('')
  })
})