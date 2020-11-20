import {CHANGE_SEARCH} from '../constants/action-types'

export const changeSearch = search =>{
    return {
        type: CHANGE_SEARCH,
        payload:search
    }
}