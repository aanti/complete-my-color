import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MainApp from './containers/MainApp/MainApp'

import { fetchColors } from './api'

class App extends Component {
  constructor () {
    super()

    this.state = {
      backgroundColor: 'gray'
    }

    this.handleBackgroundColor = this.handleBackgroundColor.bind(this)
  }

  componentDidMount () {
    fetchColors()
      .then(({ data = [] }) => { this.setState({ dataSource: data }) })
  }

  handleBackgroundColor (color) {
    console.log('handle background change')
    this.setState({ backgroundColor: color })
  }

  render () {
    const { backgroundColor } = this.state
    return (
      <div className="App" style={{ backgroundColor: '#' + backgroundColor + '80' }}>
        <MainApp dataSource={this.state.dataSource} onBackgroundChange={this.handleBackgroundColor} />
      </div>
    );
  }
}

export default App;
