import { createStore, combineReducers } from 'redux'
import filters from './reducers/filters'
import searches from './reducers/searches'

const reducer = combineReducers({
  filters,searches
})

const store = createStore(reducer)
export default store

