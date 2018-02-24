import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createSelector } from 'reselect'

import { setBackgroundColor } from '../../actions/ui'
import { changeText, selectListItem, focusTextField, hoverListItem } from '../../actions/autocomplete'

import AutoCompleteComponent from '../../components/AutoComplete/AutoComplete'

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
    const { dataSource, hovered, hoverListItem, selectListItem } = this.props
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
    return (
      <AutoCompleteComponent
        {...this.props}
        onChange={this.handleChange}
        onItemClick={this.handleItemClick}
        onItemHover={this.handleItemHover}
        onKeyDown={this.handleKeyDown}
        onSubmit={this.handleColorSubmit}
        onFocus={this.handleFocus}
        autoCompleteRef={el => { this.autocompleteRef = el }}
      />
    )
  }
}

AutoComplete.propTypes = {
  text: PropTypes.string,
  hovered: PropTypes.number,
  chosen: PropTypes.object,
  focused: PropTypes.bool,
  dataSource: PropTypes.array,
  setBackgroundColor: PropTypes.func,
  changeText: PropTypes.func,
  selectListItem: PropTypes.func,
  focusTextField: PropTypes.func,
  hoverListItem: PropTypes.func
}

export const filter = (dataSource, text) => text.length > 1 ? dataSource.filter(d => d.name.includes(text)) : []

const getDataset = state => state.data.dataset
const getText = state => state.autocomplete.text

const getFilteredDataSource = createSelector([getDataset, getText], filter)

function mapStateToProps (state) {
  const { autocomplete } = state
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
