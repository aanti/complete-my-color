import React, { Component } from 'react'

import { Container, InputDiv, StyledInput, StyledChosed, AnimatedDiv } from './styled'

class TextField extends Component {
  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (e) {
    const { onChange } = this.props
    const { srcElement: { value: text } } = e.nativeEvent
    onChange && onChange(text)
  
  }

  render () {
    const { focused, value, selected, renderSelected, onFocus } = this.props
    return (
      <Container>
        <InputDiv>
          {
            (!selected)
            ?
              <StyledInput
                autoFocus
                value={value}
                placeholder="Start entering color name"
                onChange={this.handleChange}
                onFocus={onFocus}
              />
            : 
              <StyledChosed onClick={() => this.props.onChange('')}>
                {renderSelected({ ...selected.value })}
              </StyledChosed>
          }
          <AnimatedDiv focused={focused} />
        </InputDiv>
      </Container>
    )
  }
}

export default TextField
