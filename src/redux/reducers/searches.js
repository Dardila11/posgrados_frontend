import {CHANGE_SEARCH} from '../constants/action-types'

const initialValue = {
    search: ''
}

const searches = (state = initialValue, action)=>{
    switch (action.type) {
        case CHANGE_SEARCH:
            return Object.assign({}, state, {
                search: action.payload
            })    
        default:
            return state;
    }
    
}

export default searches