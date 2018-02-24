import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet' 

import MainApp from './containers/MainApp/MainApp'

import { getData } from './actions/data'

import './App.css'

class App extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(getData())
  }

  render () {
    const { backgroundColor } = this.props
    console.log(backgroundColor)
    return (
      <div className="App">
        <Helmet bodyAttributes={{ style: `background-color : ${backgroundColor}` }}/>
        <MainApp />
      </div>
    )
  }
}

App.defaultProps = {
  dataSource: []
}

function mapStateToProps (state) {
  const { ui } = state
  return {
    backgroundColor: '#' + ui.backgroundColor + '80'
  }
}

export default connect(mapStateToProps)(App)
