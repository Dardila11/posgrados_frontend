import { createStore, combineReducers } from 'redux'
import filters from './reducers/filters'
import searches from './reducers/searches'
import paginations from './reducers/paginations'

const reducer = combineReducers({
  filters,searches,paginations
})

const store = createStore(reducer)
export default store

