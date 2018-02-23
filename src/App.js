import React, { Component } from 'react'
import { connect } from 'react-redux'

import MainApp from './containers/MainApp/MainApp'

import { getData } from './actions/data'

import './App.css'

class App extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getData())
  }

  render () {
    const { dataSource, backgroundColor } = this.props
    return (
      <div className="App" style={{ backgroundColor }}>
        <MainApp />
      </div>
    )
  }
}

App.defaultProps = {
  dataSource: []
}

function mapStateToProps (state) {
  const { data, ui } = state
  return {
    backgroundColor: '#' + ui.backgroundColor + '80'
  }
}

export default connect(mapStateToProps)(App)
