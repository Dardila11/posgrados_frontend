import { CHANGE_PERIOD } from '../constants/action-types'

const initialValue = {
  period: '2020'
}

const reducer = (state = initialValue, action) => {
  switch (action.type) {
    case CHANGE_PERIOD:
      //state.year = action.payload  // shouldn't be like this
      return Object.assign({}, state, {
        period: action.payload
      })      
    default:
      return state
  }
}

export default reducer
