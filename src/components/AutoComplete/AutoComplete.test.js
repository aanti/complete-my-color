import React from 'react'
import { shallow, mount } from 'enzyme'

import AutoComplete, { renderColorName, MenuItem, SelectedItem, MenuItems } from './AutoComplete'
import Button from '../Button/Button'
import { Color } from './styled'

describe('renderColorName', () => {
  it('splittes text properly', () => {
    const text = "navyblue"
    const searchText = "nav"
    const result = renderColorName(text, searchText)
    const wrapper = shallow(<div>{result}</div>)
    expect(wrapper.find('b')).toHaveLength(1)

    const text2 = "navyblue"
    const searchText2 = "navyblue"
    const wrapper2 = shallow(<div>{renderColorName(text, searchText)}</div>)
    expect(wrapper2.find('b')).toHaveLength(1)
  })
})

describe('MenuItem', () => {
  const basicProps = {
    text: 'blue',
    value: 'blue',
    hovered: false,
    searchText: '',
    onClick: () => {},
    onMouseOver: () => {}
  }

  it('renders without crashing', () => {
    const wrapper = shallow(<MenuItem {...basicProps} />)
  })

  it('has to child nodes', () => {
    const wrapper = shallow(<MenuItem {...basicProps} />)
    expect(wrapper.children()).toHaveLength(2)
  })
})

describe('SelectedItem', () => {
  it('passes color prop properly', () => {
    const basicProps = { name: 'lightgray', hex: 'c8c8c8' }
    const wrapper = mount (<SelectedItem {...basicProps} />)
    const color = wrapper.find(Color)
    expect(color).toHaveLength(1)
    expect(color.prop('color')).toEqual('c8c8c8')
  })
})

describe('MenuItems', () => {
  const props = {
      dataSource: [{ name: 'blue', hex: 'f5f5f5' }, { name: 'white', hex: 'ffffff' }],
      hovered: -1,
      text: 'a',
      onItemClick: () => {},
      onItemHover: () => {}
    }

  it('correctly renders children based on dataSource', () => {
    const wrapper = mount(<MenuItems {...props} />)
    const menuItem = wrapper.find(MenuItem)
    expect(wrapper.find(MenuItem)).toHaveLength(2)
  })

  it('correctly calls onItemClick function (with corrent data and index)', () => {
    const mockItemClick = jest.fn()
    const wrapper = mount(<MenuItems {...props} onItemClick={mockItemClick} />)

    const firstItem = wrapper.find(MenuItem).first()
    firstItem.simulate('click')
    expect(mockItemClick).toHaveBeenCalledWith(props.dataSource[0], 0)
  })

  it('correctly calls onItemHover function (with corrent data and index)', () => {
    const mockItemHover = jest.fn()
    const wrapper = mount(<MenuItems {...props} onItemHover={mockItemHover} />)

    const firstItem = wrapper.find(MenuItem).first()
    firstItem.simulate('mouseOver')
    expect(mockItemHover).toHaveBeenCalledWith(0)
  })
})

describe('AutoComplete', () => {
  const initialProps = {
    dataSource: [{ name: 'blue', hex: 'f5f5f5' }, { name: 'white', hex: 'ffffff' }],
    text: 'a',
    chosen: null,
    focused: false,
    hovered: -1,
    autoCompleteRef: () => {},
    onChange: () => {},
    onFocus: () => {},
    onItemClick: () => {},
    onItemHover: () => {},
    onSubmit: () => {},
    onKeyDown: () => {}
  }

  it('renders MenuItems only when focused', () => {
    const wrapper = shallow(<AutoComplete {...initialProps} />)
    const wrapperFocused = shallow(<AutoComplete {...initialProps} focused />)
    expect(wrapper.find(MenuItems)).toHaveLength(0)
    expect(wrapperFocused.find(MenuItems)).toHaveLength(1)
  })

  it('renders disabled Button when nothing is chosen', () => {
    const wrapper = shallow(<AutoComplete {...initialProps} />)
    expect(wrapper.find(Button).prop('disabled')).toEqual(true)
  })

  it('calls onSubmit when click on button', () => {
    const mockSubmit = jest.fn()
    const wrapper = shallow(<AutoComplete {...initialProps} chosen={{}} onSubmit={mockSubmit} />)
    wrapper.find(Button).simulate('click')
    expect(mockSubmit).toHaveBeenCalled()
  })
})