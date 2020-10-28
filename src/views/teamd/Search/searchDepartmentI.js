import React, { useState,useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {GetDeparmentIListService} from './service'

export const SearchDeparmentI = ({callback}) => {


    const [DepartmentI, setDepartmentI] = useState("")
    const [listDeparmentI, setlistDeparmentI] = useState([])

    
        

    //Obtener la lista de departamentos de la institución 
    useEffect(() => {
        GetDeparmentIListService().then(result => {
            setlistDeparmentI(result.data);
        }).catch(setlistDeparmentI([]));
    }, [])
    return (
            <Autocomplete
                id="searchDepartmentI"
                options = {listDeparmentI}
                getOptionLabel = { option => option.name}
                style = {{widht : 300}}
                renderInput = {
                    params => 
                        <TextField
                            id= "inputOptionDepartmentI" {...params}
                            label = "Departamento al que pertenece"
                            variant = "outlined"

                        />
                
                }
                onInputChange = {(e,input) => {setDepartmentI(input);callback(DepartmentI)} }
            />

    )
}
