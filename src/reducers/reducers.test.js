import { createStore } from 'redux'

import * as types from '../actions/actionTypes'
import initialState, { fetchStatus } from './initialState'

import autocompleteReducer from './autocomplete'
import dataReducer from './data'
import uiReducer from './ui'
import rootReducer from './root'

import * as autocompleteActions from '../actions/autocomplete'

describe('autocomplete reducer', () => {
  it('should return initial state', () => {
    expect(autocompleteReducer(undefined, {})).toEqual(initialState.autocomplete)
  })

  it('should change text', () => {
    const act = autocompleteActions.changeText('a')
    expect(autocompleteReducer(undefined, act)).toEqual({ ...initialState.autocomplete, text: 'a' })
  })

  it('should select list item', () => {
    const selected = { name: 'gray', hex: 'c8c8c8' }
    const index = 2
    const act = autocompleteActions.selectListItem(selected, index)
    expect(autocompleteReducer(undefined, act)).toEqual({
      ...initialState.autocomplete,
      chosen: { value: selected, index: 2 }
    })
  })

  it('should focus text field', () => {
    const act = autocompleteActions.focusTextField(true)
    expect(autocompleteReducer(undefined, act)).toEqual({
      ...initialState.autocomplete,
      focused: true
    })
  })

  it('should unfocus text field', () => {
    const act = autocompleteActions.focusTextField(false)
    expect(autocompleteReducer(undefined, act)).toEqual({
      ...initialState.autocomplete,
      focused: false
    })
  })

  it('should hover list item', () => {
    const index = 0
    const act = autocompleteActions.hoverListItem(index)
    expect(autocompleteReducer(undefined, act)).toEqual({
      ...initialState.autocomplete,
      hovered: 0
    })
  })
})

describe('data reducer', () => {
  it('should return initial state', () => {
    expect(dataReducer(undefined, {})).toEqual(initialState.data)
  })

  it('should change fetch status to fetching', () => {
    expect(dataReducer(undefined, { type: types.FETCH_DATA_REQUEST })).toEqual({
      ...initialState.data,
      status: fetchStatus.fetching
    })
  })

  it('should change fetch status to success', () => {
    const data = []
    expect(dataReducer(undefined, { type: types.FETCH_DATA_SUCCESS, payload: { data } })).toEqual({
      status: fetchStatus.success,
      dataset: data
    })
  })

  it('should change fetch status to error', () => {
    expect(dataReducer(undefined, { type: types.FETCH_DATA_ERROR })).toEqual({
      ...initialState.data,
      status: fetchStatus.error
    })
  })
})

describe('ui reducer', () => {
  it('should return initial state', () => {
    expect(uiReducer(undefined, {})).toEqual(initialState.ui)
  })

  it('should set color', () => {
    const backgroundColor = '555555'
    expect(uiReducer(undefined, { type: types.SET_BACKGROUND_COLOR, payload: { color: backgroundColor } })).toEqual({
      ...initialState.ui,
      backgroundColor
    })
  })
})

describe('root', () => {
  const store = createStore(rootReducer)
  it('creates store correctly', () => {
    expect(store.getState().ui).toEqual(uiReducer(undefined, {}))
    expect(store.getState().autocomplete).toEqual(autocompleteReducer(undefined, {}))
    expect(store.getState().data).toEqual(dataReducer(undefined, {}))
  })
})