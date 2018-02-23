import { combineReducers } from 'redux'

import data from './data'
import autocomplete from './autocomplete'
import ui from './ui'

const rootReducer = combineReducers({
  data,
  autocomplete,
  ui
})

export default rootReducer