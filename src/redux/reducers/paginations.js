import {CHANGE_PAGE} from '../constants/action-types'

const initialValue = {
    page: ''
}

const paginations = (state = initialValue, action)=>{
    switch (action.type) {
        case CHANGE_PAGE:
            return Object.assign({}, state, {
                page: action.payload
            })    
        default:
            return state;
    }
    
}

export default paginations