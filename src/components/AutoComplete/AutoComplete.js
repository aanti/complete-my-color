import React, { Component } from 'react'
import styled, { css, extend } from 'styled-components'

import TextField from '../TextField/TextField'
import Button from '../Button/Button'

const Container = styled.div`
  display: flex;
  align-items: center;
  > :last-child {
    margin-left: 15px;
  }
`

const AutoCompleteContainer = styled.div`
  background-color: #f8f8f830;
  position: relative;
  width: 400px;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 10px, rgba(0, 0, 0, 0.16) 0px 3px 10px;
`

const StyledInput = styled.input`
  border: none;
  outline: none;
`

const MenuItemsContainer = styled.div`
  position: absolute;
  background-color: #000000b3;
  width: 100%;
`

const StyledItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  cursor: pointer;
`

const MenuItemContainer = StyledItem.extend`
  color: white;
  cursor: pointer;
  :hover {
    //background-color: #00000066;
  }
  background-color: ${props => props.hovered && '#00000066'}
`

const Color = styled.div`
  height: inherit;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid gray;
  background-color: ${props => '#' + props.color};
`

const MenuItem = ({ text, value, hovered, onClick, onMouseOver }) => (
  <MenuItemContainer hovered={hovered} onClick={onClick} onMouseOver={onMouseOver}>
    {text}
    <Color color={value} />
  </MenuItemContainer>
)

const SelectedItem = ({ name, hex }) => (
  <StyledItem>
    {name}
    <Color color={hex} />
  </StyledItem>
)

const MenuItems = ({ dataSource = [], hovered, onItemClick, onItemHover }) => (
  <MenuItemsContainer>
    {
      dataSource
        .map((d, i) => <MenuItem text={d.name} value={d.hex} hovered={hovered === i} onClick={() => onItemClick(d, i)} onMouseOver={() => onItemHover(d, i)} />)
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
        hovered: -1
      }

    this.handleChange = this.handleChange.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleItemHover = this.handleItemHover.bind(this)
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
      console.log('arrow up', Math.max(this.state.hovered - 1, -1))
      this.setState(({ hovered }) => ({ hovered: Math.max(hovered - 1, -1) }))
    } else if (key === 'ArrowDown') {
      console.log('arrow down', Math.min(this.state.hovered + 1, filteredDataSource.length - 1))
      this.setState(({ hovered }) => ({ hovered: Math.min(hovered + 1, filteredDataSource.length - 1) }))
    } else if (key === 'Enter' && this.state.hovered > -1) {
      const chosen = filteredDataSource[hovered]
      this.handleItemClick(chosen, hovered)
    }
  }

  handleItemHover (value, index) {
    console.log('handle item hover')
    this.setState({
      hovered: index
    })
  }

  render () {
    const { text, chosen, hovered } = this.state
    const { dataSource, onChange } = this.props
    return (
      <Container onKeyDown={this.handleKeyDown}>
        <AutoCompleteContainer>
        <TextField value={text} selected={chosen} renderSelected={SelectedItem} onChange={this.handleChange} />
        <MenuItems dataSource={filter(dataSource, text)} hovered={hovered} onItemClick={this.handleItemClick} onItemHover={this.handleItemHover} />
      </AutoCompleteContainer>
      <Button label="Apply" disabled={!chosen} onClick={() => onChange(chosen.value.hex)} />
      </Container>
    )
  }
}

export default AutoComplete
