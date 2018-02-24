import React from 'react'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import initialState from '../../reducers/initialState'

import AutoComplete, { filter } from './AutoComplete'
import { Container } from '../../components/AutoComplete/styled'

const mockStore = configureStore()
let store

const testData = [
  {
    "name": "aliceblue",
    "hex": "f0f8ff"
  },
  {
    "name": "antiquewhite",
    "hex": "faebd7"
  },
  {
    "name": "aqua",
    "hex": "00ffff"
  },
  {
    "name": "aquamarine",
    "hex": "7fffd4"
  },
  {
    "name": "azure",
    "hex": "f0ffff"
  },
  {
    "name": "beige",
    "hex": "f5f5dc"
  },
  {
    "name": "bisque",
    "hex": "ffe4c4"
  },
  {
    "name": "black",
    "hex": "000000"
  }
]

describe('AutoComplete', () => {
  beforeEach(() => {
    store = mockStore(initialState)
  })

  it('renders without crashing', () => {
    shallow(<AutoComplete />, { context: { store } })
  })
})

describe('filter', () => {
  const data = testData
  
  it('should return correct filter result', () => {
    const searchText = "isq"
    const result = filter(data, searchText)
    const expectedResult = [{ name: "bisque", hex: "ffe4c4" }]
    expect(result).toEqual(expectedResult)
  })

  it('should return empty array if searchText contains < 2 characters', () => {
    const searchText = "i"
    const result = filter(data, searchText)
    const expectedResult = []
    expect(result).toEqual(expectedResult)
  })
})