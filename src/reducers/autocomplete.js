import * as types from '../actions/actionTypes'
import initialState from './initialState'

function hovered (state = initialState.autocomplete.hovered, action) {
  switch (action.type) {
    case types.CHANGE_TEXT:
      return -1
    case types.HOVER_LIST_ITEM:
      return action.payload.index
    default:
      return state
  }
}

function chosen (state = initialState.autocomplete.chosen, action) {
  switch (action.type) {
    case types.CHANGE_TEXT:
      return null
    case types.SELECT_LIST_ITEM:
      return action.payload
    default:
      return state
  }
}

export function autocomplete (state = initialState.autocomplete, action) {
  switch (action.type) {
    case types.CHANGE_TEXT:
      return {
        ...state,
        text: action.payload.value,
        chosen: chosen(state.chosen, action),
        hovered: hovered(state.hovered, action)
      }
    case types.SELECT_LIST_ITEM:
      return {
        ...state,
        text: '',
        focused: false,
        chosen: chosen(state.chosen, action),
        hovered: hovered(state.hovered, action)
      }
    case types.TEXTFIELD_FOCUS_ON:
      return { ...state, focused: true }
    case types.TEXTFIELD_FOCUS_OFF:
      return { ...state, focused: false }
    case types.HOVER_LIST_ITEM:
      return { ...state, hovered: hovered(state.hovered, action) }
    default:
      return state
  }
}

export default autocomplete
