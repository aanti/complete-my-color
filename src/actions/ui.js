import * as types from './actionTypes'

export function setBackgroundColor (color) {
  return {
    type: types.SET_BACKGROUND_COLOR,
    payload: { color }
  }
}
