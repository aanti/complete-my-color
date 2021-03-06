import * as types from './actionTypes'

import { fetchColors } from '../api'

function getDataRequest () {
  return {
    type: types.FETCH_DATA_REQUEST
  }
}

function getDataSuccess ({ data }) {
  return {
    type: types.FETCH_DATA_SUCCESS,
    payload: { data }
  }
}

function getDataError (error) {
  return {
    type: types.FETCH_DATA_ERROR
  }
}

export function getData () {
  return (dispatch) => {
    dispatch(getDataRequest())
    return fetchColors()
      .then(
        ({ data }) => {
          dispatch(getDataSuccess({ data }))
        },
        ({ status }) => {
          dispatch(getDataError(new Error(status)))
        }
      )
   }
}
