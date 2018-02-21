import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'

const StyledButton = styled.button`
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
`

const ButtonContainer = styled.div`
  padding: 10px 15px;
  margin: -4px;
  background-color: #484848;
  color: ${props => props.pressed ? 'pink' : 'white'};
  border-radius: 4px;
  cursor: pointer;
  font-weight: 400;
  font-family: 'Roboto';
  text-transform: uppercase;
  font-size: 16px;
  ${props => !props.pressed && css`
    box-shadow: rgba(0, 0, 0, 0.08) 0px 3px 10px, rgba(0, 0, 0, 0.16) 0px 3px 10px;
  `}
`

class ClickableButton extends Component {
  constructor () {
    super()

    this.state = {
      pressed: false
    }

    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseUp = this.handleMouseUp.bind(this)
  }

  handleMouseDown () {
    this.setState({ pressed: true })
  }

  handleMouseUp () {
    this.setState({ pressed: false })
  }

  render () {
    return <Button {...this.props} pressed={this.state.pressed} onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} />
  }
}

const Button = ({ label, pressed, onClick, onMouseDown, onMouseUp }) => (
  <StyledButton onClick={onClick} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
    <ButtonContainer pressed={pressed}>
      {label}  
    </ButtonContainer>
  </StyledButton>
)

Button.defaultProps = {
  onClick: () => { console.log('on click') }
}

export default ClickableButton
