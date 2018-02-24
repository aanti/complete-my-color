import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'

import * as types from './actionTypes'
import * as autocomplete from './autocomplete'
import * as data from './data'
import * as ui from './ui'

import * as api from '../api'

describe('autocomplete actions', () => {
  it('should create action to change text', () => {
    const text = 'Blue'
    const expectedAction = {
      type: types.CHANGE_TEXT,
      payload: { value: text }
    }
    expect(autocomplete.changeText(text)).toEqual(expectedAction)
  })

  it('should create action to change text when no argument is passed', () => {
    const expectedAction = {
      type: types.CHANGE_TEXT,
      payload: { value: '' }
    }
    expect(autocomplete.changeText()).toEqual(expectedAction)
  })

  it('should create action to select list item', () => {
    const value = { name: 'gray', value: 'c8c8c8' }
    const index = 2
    const expectedAction = {
      type: types.SELECT_LIST_ITEM,
      payload: { value, index }
    }
    expect(autocomplete.selectListItem(value, index)).toEqual(expectedAction)
  })

  it('should create action to focus text field', () => {
    const on = true
    const expectedAction = {
      type: types.TEXTFIELD_FOCUS_ON
    }
    expect(autocomplete.focusTextField(on)).toEqual(expectedAction)
  })

  it('should create action to disable focus text field', () => {
    const on = false
    const expectedAction = {
      type: types.TEXTFIELD_FOCUS_OFF
    }
    expect(autocomplete.focusTextField(on)).toEqual(expectedAction)
  })

  it('should create action to hover list item', () => {
    const index = 8
    const expectedAction = {
      type: types.HOVER_LIST_ITEM,
      payload: { index }
    }
    expect(autocomplete.hoverListItem(index)).toEqual(expectedAction)
  })
})

describe('ui', () => {
  it('should create action to set new background color', () => {
    const color = 'c8c8c8'
    const expectedAction = {
      type: types.SET_BACKGROUND_COLOR,
      payload: { color }
    }
    expect(ui.setBackgroundColor(color)).toEqual(expectedAction)
  })
})

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mock = new MockAdapter(axios)

describe('data', () => {
  afterEach(() => {
    mock.reset()
    mock.restore()
  })

  it('creates FETCH_DATA_SUCCESS when fetching todos has been done', () => {
    const mockData = { data: [ { name: 'gray', hex: 'c8c8c8' } ] }
    mock.onGet(api.url).reply(200, mockData)

    const expectedActions = [
      { type: types.FETCH_DATA_REQUEST },
      { type: types.FETCH_DATA_SUCCESS, payload: { data: mockData } }
    ]
    const store = mockStore()

    store.dispatch(data.getData()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('creates FETCH_DATA_ERROR when fetching fails', () => {
      const mockData = { data: [ { name: 'gray', hex: 'c8c8c8' } ] }
      mock.onGet(api.url).reply(404, {})

      const expectedActions = [
        { type: types.FETCH_DATA_REQUEST },
        { type: types.FETCH_DATA_ERROR }
      ]
      const store = mockStore()

      store.dispatch(data.getData()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
})
