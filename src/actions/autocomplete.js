import * as types from './actionTypes'

export function changeText (value = '') {
  return {
    type: types.CHANGE_TEXT,
    payload: { value }
  }
}

export function selectListItem (value, index) {
  return {
    type: types.SELECT_LIST_ITEM,
    payload: { value, index }
  }
}

export function focusTextField (on) {
  return {
    type: on ? types.TEXTFIELD_FOCUS_ON : types.TEXTFIELD_FOCUS_OFF
  }
}

export function hoverListItem (index) {
  return {
    type: types.HOVER_LIST_ITEM,
    payload: { index }
  }
}