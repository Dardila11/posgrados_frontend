import {CHANGE_PAGE} from '../constants/action-types'

export const changePage = page =>{
    return {
        type: CHANGE_PAGE,
        payload: page
    }
}