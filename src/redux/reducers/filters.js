import { CHANGE_PERIOD, CHANGE_PROGRAM } from '../constants/action-types'

const initialValue = {
  period: '',
  program: ''
}

const filters = (state = initialValue, action) => {
  switch (action.type) {
    case CHANGE_PERIOD:
      //state.year = action.payload  // shouldn't be like this
      return Object.assign({}, state, {
        period: action.payload
      })
    case CHANGE_PROGRAM:
      return Object.assign({}, state,{
        program: action.payload
      }
        )   
    default:
      return state
  }
}

export default filters
