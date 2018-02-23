import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import reactStringReplace from 'react-string-replace'
import { createSelector } from 'reselect'

import { setBackgroundColor } from '../../actions/ui'
import { changeText, selectListItem, focusTextField, hoverListItem } from '../../actions/autocomplete'

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

class AutoComplete extends Component {
  constructor (props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleOutsideClick = this.handleOutsideClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleItemHover = this.handleItemHover.bind(this)
    this.handleColorSubmit = this.handleColorSubmit.bind(this)
  }  

  componentWillMount () {
    document.addEventListener('click', this.handleOutsideClick, false)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleOutsideClick, false);
  }

  handleOutsideClick (e) {
    if(!ReactDOM.findDOMNode(this.autocompleteRef).contains(e.target)) {
      this.props.focusTextField(false)
    }
  }

  handleChange (text) {
    this.props.changeText(text)
  }

  handleItemClick (value, index) {
    this.props.selectListItem(value, index)
  }

  handleKeyDown (e) {
    const { key } = e.nativeEvent
    const { dataSource, text, hovered, hoverListItem, selectListItem } = this.props
    if (key === 'ArrowUp') {
      hoverListItem(Math.max(hovered - 1, -1))
    } else if (key === 'ArrowDown') {
      hoverListItem(Math.min(hovered + 1, dataSource.length - 1))
    } else if (key === 'Enter' && hovered > -1) {
      const chosen = dataSource[hovered]
      selectListItem(chosen, hovered)
    }
  }

  handleItemHover (index) {
    this.props.hoverListItem(index)
  }

  handleColorSubmit () {
    const { setBackgroundColor, chosen: { value: { hex } } } = this.props
    setBackgroundColor(hex)
  }
  
  handleFocus () {
    this.props.focusTextField(true)
  }

  render () {
    const { dataSource, text, chosen, focused, hovered } = this.props
    return (
      <Container onKeyDown={this.handleKeyDown}>
        <AutoCompleteContainer ref={el => this.autocompleteRef = el}>
        <TextField
          value={text}
          selected={chosen}
          focused={focused}
          renderSelected={SelectedItem}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
        />
        {
          (focused) && (
            <MenuItems
              dataSource={dataSource}
              text={text}
              hovered={hovered}
              onItemClick={this.handleItemClick}
              onItemHover={this.handleItemHover}
            />
          )
        }
      </AutoCompleteContainer>
      <Button label="Apply" disabled={!chosen} onClick={this.handleColorSubmit} />
      </Container>
    )
  }
}

const filter = (dataSource, text) => text.length > 1 ? dataSource.filter(d => d.name.includes(text)) : []

const getDataset = state => state.data.dataset
const getText = state => state.autocomplete.text

const getFilteredDataSource = createSelector(
  [getDataset, getText],
  (data, text) => filter(data, text)
)

function mapStateToProps (state) {
  const { autocomplete, data } = state
  return {
    ...autocomplete,
    dataSource: getFilteredDataSource(state)
    }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setBackgroundColor,
    changeText,
    selectListItem,
    focusTextField,
    hoverListItem
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AutoComplete)
