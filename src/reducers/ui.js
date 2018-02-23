import initialState from './initialState'
import { SET_BACKGROUND_COLOR } from '../actions/actionTypes'

export function ui (state = initialState.ui, action) {
  switch(action.type) {
    case SET_BACKGROUND_COLOR: {
      return { ...state, backgroundColor: action.payload.color }
    }
    default:
      return state
  }
}

export default ui
