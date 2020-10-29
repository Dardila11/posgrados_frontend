import React, { useState,useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {listDeparmentsService} from './service'


export const SearchDepartment = (idCountry,{callback}) => {

    
    const [listDeparments, setlistDepartments] = useState([])
    const [idDepartment, setidDepartment] = useState([])
    

    const getIdDepartment = (name) =>{
            let find = listDeparments.find( department => department.name === name )
            if (find === undefined){
                setidDepartment("null")
            }else{
                setidDepartment(find.id);
            }            
    }

    useEffect(() => {
        listDeparmentsService(idCountry).then(            
            result  => setlistDepartments(result.data.Departments)).
            catch( setlistDepartments ([]))
    },[])

    return(
        <Autocomplete
        id="searchDepartments"
        options = {listDeparments}
        getOptionLabel = { option => (option.name)}
        
    
        style = {{widht : 300}}
        renderInput = {
            params => 
                <TextField
                    id= "inputOptionDepartment" {...params}
                    label = "Departamento"
                    variant = "outlined"
                    

                />
        
        }

        onInputChange = {(e,input) => {callback(input,idDepartment);
                                            getIdDepartment(input)} }
    />
    )
}
