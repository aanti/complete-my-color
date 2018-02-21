import React, { Component, createElement } from 'react'

const uncontrolled = (WrappedComponent) => (
  class Wrapper extends Component {
    constructor (props) {
      super(props)
      const { initialValue = '' } = props 
      this.state = {
        value: initialValue
      }
      this.handleChange = this.handleChange.bind(this)
    }

    handleChange (value) {
      const { onChange } = this.props
      this.setState({ value })
      onChange && onChange(value)
    }

    render() {
      const { value } = this.state
      return <WrappedComponent {...this.props} value={value}  />
    }
  }
)

export const withValue = (WrappedComponent) => (props) => false
  ? createElement(WrappedComponent, props)
  : uncontrolled

