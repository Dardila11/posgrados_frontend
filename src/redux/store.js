import { createStore, combineReducers } from 'redux'
import periods from './reducers/periods'

/* const reducer = combineReducers({
  periods
}) */

/**
 * Necesito que pueda obtener de varios reducers.
 * TODO combineReducers
 */
const store = createStore(periods)
export default store

