import React, { useState,useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {listDeparmentsService} from './service'


export const SearchDepartment = ({idCountry,callback}) => {

    const [listDeparments, setlistDepartments] = useState([])
    const [idDepartment, setidDepartment] = useState([])
    const [country, setcountry] = useState(idCountry)

    useEffect(() => {
        console.log("buscando departamentos ")
        listDeparmentsService(idCountry).then(            
            result  => setlistDepartments(result.data.Departments)).
        catch( setlistDepartments ([]))
    },[idCountry])

    const getIdDepartment = (name) =>{


            let find = listDeparments.find( department => department.name === name )
            if (find === undefined){
                setidDepartment("null")
            }else{
                setidDepartment(find.id);
                callback(find.id)
            }     
                 
    }
    return(
        <Autocomplete
        id="searchDepartments"
        options = {listDeparments}
        getOptionLabel = { option => (option.name)}
        style = {{marginBottom: 10, marginTop: 10,widht : 300}}
        renderInput = {
            params => 
                <TextField
                    id= "inputOptionDepartment" {...params}
                    label = "Departamento"
                    variant = "outlined"
                    required
                />

        
        }
        onInputChange = {(e,input) => getIdDepartment(input)}
        onChange = {(e,input) => getIdDepartment(input)}
    />
    )
}
