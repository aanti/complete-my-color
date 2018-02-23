import React from 'react'
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
    <span>{name}</span>
    <FlexDiv>
      <HexSpan>{`#${hex}`}</HexSpan>
      <Color color={hex} />
    </FlexDiv>
  </StyledItem>
)

const MenuItems = ({ dataSource = [], hovered, text, onItemClick, onItemHover }) => (
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
            onClick={() => onItemClick(d, i)} onMouseOver={() => onItemHover(i)}
          />)
        )
    }
  </MenuItemsContainer>
)

const  AutoComplete = ({ dataSource, text, chosen, focused, hovered, autoCompleteRef, ...rest }) => {
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

export default AutoComplete
