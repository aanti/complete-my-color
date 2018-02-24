import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Container, InputDiv, StyledInput, StyledChosed, AnimatedDiv } from './styled'

class TextField extends Component {
  constructor () {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleClear = this.handleClear.bind(this)
  }

  handleChange (e) {
    const { onChange } = this.props
    const { srcElement: { value: text } } = e.nativeEvent
    onChange && onChange(text)
  }

  handleClear () {
    const { onChange } = this.props
    onChange('')
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
                <StyledChosed onClick={this.handleClear}>
                  {renderSelected({ ...selected.value })}
                </StyledChosed>
          }
          <AnimatedDiv focused={focused} />
        </InputDiv>
      </Container>
    )
  }
}

TextField.propTypes = {
  focused: PropTypes.bool,
  value: PropTypes.string,
  selected: PropTypes.object,
  renderSelected: PropTypes.func,
  onFocus: PropTypes.func
}

export default TextField
