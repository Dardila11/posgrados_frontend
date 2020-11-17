import {
  CHANGE_PERIOD,
  CHANGE_PROGRAM,
  CHANGE_STATUS
} from '../constants/action-types'

const initialValue = {
  period: '',
  program: '',
  status: ''
}

const filters = (state = initialValue, action) => {
  switch (action.type) {
    case CHANGE_PERIOD:
      return Object.assign({}, state, {
        period: action.payload
      })
    case CHANGE_PROGRAM:
      return Object.assign({}, state, {
        program: action.payload
      })
    case CHANGE_STATUS:
      return Object.assign({}, state, {
        status: action.payload
      })
    default:
      return state
  }
}

export default filters
