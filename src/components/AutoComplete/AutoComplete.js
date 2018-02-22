import React, { Component } from 'react'
import styled, { css, extend } from 'styled-components'
import reactStringReplace from 'react-string-replace'

import TextField from '../TextField/TextField'
import Button from '../Button/Button'

import {
  Container,
  AutoCompleteContainer,
  StyledInput,
  MenuItemsContainer,
  StyledItem,
  MenuItemContainer,
  Color,
  HexSpan,
  FlexDiv
} from './styled'

const renderColorName = (text, searchText) => {
  const splitted = reactStringReplace(text, searchText, (match) => (<b><u>{match}</u></b>))
  return (
    <span>
      {splitted}
    </span>
  )
}

const MenuItem = ({ text, value, hovered, searchText, onClick, onMouseOver }) => (
  <MenuItemContainer hovered={hovered} onClick={onClick} onMouseOver={onMouseOver}>
    <span>{renderColorName(text, searchText)}</span>
    <FlexDiv>
      <HexSpan>{`#${value}`}</HexSpan>
      <Color color={value} />
    </FlexDiv>
  </MenuItemContainer>
)

const SelectedItem = ({ name, hex }) => (
  <StyledItem>
    {name}
    <Color color={hex} />
  </StyledItem>
)

const MenuItems = ({ dataSource = [], hovered, text, onItemClick, onItemHover }) => (
  <MenuItemsContainer>
    {
      dataSource
        .map((d, i) => (
          <MenuItem
            searchText={text}
            text={d.name}
            value={d.hex}
            hovered={hovered === i}
            onClick={() => onItemClick(d, i)} onMouseOver={() => onItemHover(d, i)}
          />)
        )
    }
  </MenuItemsContainer>
)

const filter = (dataSource, text) => text.length > 1 ? dataSource.filter(d => d.name.includes(text)) : []

class AutoComplete extends Component {
  constructor (props) {
    super(props)
    this.state = {
        text: '',
        chosen: null,
        hovered: -1,
        focused: false
      }

    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleItemHover = this.handleItemHover.bind(this)
    this.handleColorSubmit = this.handleColorSubmit.bind(this)
  }  

  handleChange (text) {
    this.setState({ text, chosen: null, hovered: -1 })
  }

  handleItemClick (value, index) {
    const { onChange } = this.props
    this.setState({
      chosen: { value, index },
      text: '',
      hovered: -1
    })
  }

  handleKeyDown (e) {
    console.log('handle key down')
    const { key } = e.nativeEvent
    const { dataSource } = this.props
    const { text, hovered } = this.state
    const filteredDataSource = filter(dataSource, text)
    if (key === 'ArrowUp') {
      this.setState(({ hovered }) => ({ hovered: Math.max(hovered - 1, -1) }))
    } else if (key === 'ArrowDown') {
      this.setState(({ hovered }) => ({ hovered: Math.min(hovered + 1, filteredDataSource.length - 1) }))
    } else if (key === 'Enter' && hovered > -1) {
      const chosen = filteredDataSource[hovered]
      this.handleItemClick(chosen, hovered)
    }
  }

  handleItemHover (value, index) {
    this.setState({
      hovered: index
    })
  }

  handleColorSubmit () {
    const { onChange } = this.props
    const { chosen } = this.state
    this.handleChange('')
    onChange(chosen.value.hex)
  }
  
  handleFocus () {
    this.setState({ focused: true })
  }

  handleBlur () {
    this.setState({ focused: false })
  }

  render () {
    const { text, chosen, hovered, focused } = this.state
    const { dataSource, onChange } = this.props
    return (
      <Container onKeyDown={this.handleKeyDown}>
        <AutoCompleteContainer>
        <TextField
          value={text}
          selected={chosen}
          focused={focused}
          renderSelected={SelectedItem}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />
        <MenuItems
          dataSource={filter(dataSource, text)}
          text={text}
          hovered={hovered}
          onItemClick={this.handleItemClick}
          onItemHover={this.handleItemHover}
        />
      </AutoCompleteContainer>
      <Button label="Apply" disabled={!chosen} onClick={this.handleColorSubmit} />
      </Container>
    )
  }
}

export default AutoComplete
