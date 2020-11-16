import { CHANGE_PERIOD, CHANGE_PROGRAM } from '../constants/action-types'

export const changePeriod = year => {
  return {
    type: CHANGE_PERIOD,
    payload: year
  }
}

export const changeProgram = program => {
  return {
    type: CHANGE_PROGRAM,
    payload: program
  }
} 


