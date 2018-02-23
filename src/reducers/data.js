import initialState, { fetchStatus } from './initialState'
import * as types from '../actions/actionTypes'

export function data (state = initialState.data, action) {
  switch (action.type) {
     case types.FETCH_DATA_REQUEST: {
      return { ...state, status: fetchStatus.fetching }
    }
    case types.FETCH_DATA_SUCCESS: {
      const { data } = action.payload
      return { ...state, dataset: data, status: fetchStatus.success }
    }
    case types.FETCH_DATA_SUCCESS: {
      return { ...state, status: fetchStatus.success }
    }
    default:
      return state
  }
}

export default data