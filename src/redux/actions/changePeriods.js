import { CHANGE_PERIOD } from '../constants/action-types'

const changePeriod = year => {
  return {
    type: CHANGE_PERIOD,
    payload: year
  }
}

export default changePeriod
