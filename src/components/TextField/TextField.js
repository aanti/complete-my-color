import React, { Component } from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
  background-color: #f2f2f230;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InputDiv = styled.div`
  position: relative;
  padding: 24px 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  border-radius: 4px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  input {
    font-family: 'Roboto';
    font-size: 16px;
    padding: 0 20px;
    box-sizing: border-box;
  }
`

const StyledInput = styled.input`
  position: absolute;
  border: none;
  outline: none;
  background: none;
  width: 100%;
`

const StyledChosed = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const AnimatedDiv = styled.div`
  position: absolute;
  bottom: 0;
  width: 0;
  ${props => props.focused && css`
    width: 100%;
  `}
  height: 2px;
  background-color: #DCE775;
  transition: width 0.2s linear;
`

class TextField extends Component {
  constructor () {
    super()
    this.state = {
      focused: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange (e) {
    const { onChange } = this.props
    const { srcElement: { value: text } } = e.nativeEvent
    onChange && onChange(text)
  }

  handleFocus () {
    this.setState({ focused: true })
  }

  handleBlur () {
    this.setState({ focused: false })
  }

  render () {
    const { value, selected, renderSelected } = this.props
    console.log(selected)
    const { focused } = this.state
    return (
      <Container>
        <InputDiv>
          {
            (!selected)
            ? <StyledInput value={value} placeholder="Start entering color name" onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} />
            : <StyledChosed onClick={() => this.props.onChange('')}>{renderSelected({ ...selected.value })}</StyledChosed>
          }
          <AnimatedDiv focused={focused} />
        </InputDiv>
      </Container>
    )
  }
}

export default TextField
