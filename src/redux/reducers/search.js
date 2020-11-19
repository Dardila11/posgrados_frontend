const initialValue = ''

const search = (state = initialValue, action) => {
    return Object.assign({}, state, {
        search: action.payload
      })
}
  
  export default search