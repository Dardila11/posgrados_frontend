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
        let namee = name.name
        console.log("NOMBRE ", namee)
        let find = listGi.find(
            element => element.name === namee
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
                renderInput = {
                    params => (
                        <TextField
                         id="inputLabelGI"
                         {...params}
                         label = "Ingresar Gi"
                         variant = 'outlined'
                         required
                         style={{ marginBottom: 10, marginTop: 10, width: 300 }}
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