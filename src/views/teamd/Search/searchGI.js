import { Autocomplete } from '@material-ui/lab'
import React from 'react'

export const SearchGI = ({listGI,callback}) => {

    const getIdGi = (name) =>{
        let find = listGI.find(
            element => element.name === name
        );
        if (find === undefined){
        }else{
            callback(find.id)
        }
    }
    return (
        <>
            <Autocomplete
                id = "searchGI"
                options = {listGI}
                getOptionLabel = { option => listGI.name}
                style={{ marginBottom: 10, marginTop: 10, widht: 300 }}
                renderInput = {
                    params => (
                        <TextField
                         id="inputLabelGI"
                         {...params}
                         label = "Ingresar Gi"
                         variant = 'outlined'
                         required
                        >
                        </TextField>
                    )
                }
                onInputCapture = { (e,input) => {getIdGi(input)}}
                onChange = { (e,input) => {getIdGi(input)}}
            >

            </Autocomplete>
        </>
    )
}
