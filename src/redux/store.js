import { createStore, combineReducers } from 'redux'
import filters from './reducers/filters'

const reducer = combineReducers({
  filters
})

const store = createStore(reducer)
export default store

