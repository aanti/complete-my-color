import React, { Component } from 'react'
import styled, { css } from 'styled-components'

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

const MenuItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  color: white;
  cursor: pointer;
  :hover {
    background-color: #00000066;
  }
`

const Color = styled.div`
  height: inherit;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid gray;
  background-color: ${props => '#' + props.color};
`

const MenuItem = ({ text, value, onClick }) => (
  <MenuItemContainer onClick={onClick}>
    {text}
    <Color color={value} />
  </MenuItemContainer>
)

const MenuItems = ({ dataSource = [], onItemClick }) => (
  <MenuItemsContainer>
    {
      dataSource
        .map((d, i) => <MenuItem text={d.name} value={d.hex} onClick={() => onItemClick(d, i)} />)
    }
  </MenuItemsContainer>
)

const filter = (dataSource, text) => text.length > 1 ? dataSource.filter(d => d.name.includes(text)) : []

class AutoComplete extends Component {
  constructor (props) {
    super(props)
    this.state = {
        text: '',
        chosen: {}
      }

    this.handleChange = this.handleChange.bind(this)
    this.handleItemClick = this.handleItemClick.bind(this)
  }  

  handleChange (text) {
    this.setState({ text })
  }

  handleItemClick (value, index) {
    const { onChange } = this.props
    this.setState({
      chosen: { value, index },
      text: ''
    })
    onChange && onChange(value.hex)
  }

  render () {
    const { text } = this.state
    const { dataSource, onChange } = this.props
    return (
      <Container>
        <AutoCompleteContainer>
        <TextField value={text} onChange={this.handleChange} />
        <MenuItems dataSource={filter(dataSource, text)} onItemClick={this.handleItemClick} />
      </AutoCompleteContainer>
      <Button label="Apply" />
      </Container>
    )
  }
}

export default AutoComplete
