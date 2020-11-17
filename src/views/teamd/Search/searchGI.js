import { Autocomplete } from '@material-ui/lab'
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react'
import {GetGIforDeparment} from './service'
export const SearchGI = ({callback,departmentIID}) => {
    const [listGi, setListGi] = useState([])
    useEffect(() => {
        GetGIforDeparment(departmentIID)
        .then( (request) => setListGi(request.data.Groups))
        .catch();
    }, [departmentIID])
    const getIdGi = (name) =>{
        let find = listGi.find(
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
                options = {listGi}
                getOptionLabel = { option => option.name}
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
