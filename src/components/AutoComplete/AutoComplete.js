import React from 'react'
import PropTypes from 'prop-types'
import reactStringReplace from 'react-string-replace'

import TextField from '../TextField/TextField'
import Button from '../Button/Button'

import {
  Container,
  AutoCompleteContainer,
  MenuItemsContainer,
  StyledItem,
  MenuItemContainer,
  Color,
  HexSpan,
  FlexDiv
} from './styled'

export const renderColorName = (text, searchText) => {
  const splitted = reactStringReplace(text, searchText, (match, i) => (<b key={i}><u>{match}</u></b>))
  return (
    <span>
      {splitted}
    </span>
  )
}

export const MenuItem = ({ text, value, hovered, searchText, onClick, onMouseOver }) => (
  <MenuItemContainer hovered={hovered} onClick={onClick} onMouseOver={onMouseOver}>
    <span>{renderColorName(text, searchText)}</span>
    <FlexDiv>
      <HexSpan>{`#${value}`}</HexSpan>
      <Color color={value} />
    </FlexDiv>
  </MenuItemContainer>
)

MenuItem.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string,
  hovered: PropTypes.bool,
  searchText: PropTypes.string,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func
}

export const SelectedItem = ({ name, hex }) => (
  <StyledItem>
    <span>{name}</span>
    <FlexDiv>
      <HexSpan>{`#${hex}`}</HexSpan>
      <Color color={hex} />
    </FlexDiv>
  </StyledItem>
)

SelectedItem.propTypes = {
  name: PropTypes.string,
  hex: PropTypes.string
}

export const MenuItems = ({ dataSource = [], hovered, text, onItemClick, onItemHover }) => (
  <MenuItemsContainer>
    {
      dataSource
        .map((d, i) => (
          <MenuItem
            key={i}
            searchText={text}
            text={d.name}
            value={d.hex}
            hovered={hovered === i}
            onClick={() => onItemClick(d, i)}
            onMouseOver={() => onItemHover(i)}
          />)
        )
    }
  </MenuItemsContainer>
)

MenuItems.propTypes = {
  dataSource: PropTypes.array,
  hovered: PropTypes.number,
  text: PropTypes.string,
  onItemClick: PropTypes.func,
  onItemHover: PropTypes.func
}

const AutoComplete = ({ dataSource, text, chosen, focused, hovered, autoCompleteRef, ...rest }) => {
  const { onChange, onFocus, onItemClick, onItemHover, onSubmit, onKeyDown } = rest
  return (
    <Container onKeyDown={onKeyDown}>
      <AutoCompleteContainer ref={autoCompleteRef}>
      <TextField
        value={text}
        selected={chosen}
        focused={focused}
        renderSelected={SelectedItem}
        onChange={onChange}
        onFocus={onFocus}
      />
      {
        (focused) && (
          <MenuItems
            dataSource={dataSource}
            text={text}
            hovered={hovered}
            onItemClick={onItemClick}
            onItemHover={onItemHover}
          />
        )
      }
    </AutoCompleteContainer>
    <Button label="Apply" disabled={!chosen} onClick={onSubmit} />
    </Container>
  )
}

AutoComplete.propTypes = {
  dataSource: PropTypes.array,
  text: PropTypes.string,
  chosen: PropTypes.object,
  focused: PropTypes.bool,
  hovered: PropTypes.number,
  autoCompleteRef: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onItemClick: PropTypes.func,
  onItemHover: PropTypes.func,
  onSubmit: PropTypes.func,
  onKeyDown: PropTypes.func
}

export default AutoComplete
