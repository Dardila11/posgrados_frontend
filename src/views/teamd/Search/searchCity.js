import React, { useState,useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {listCitiesService} from './service'



export const SearchCity = (idDepartment, {callback}) => {

    const [listCities, setlistCities] = useState([])
    const [idCity, setidCity] = useState([])


    const getIdCity = (name) =>{

            let find = listCities.find( city => city.name === name )
            if (find === undefined){
                setidCity("null")
            }else{
                setidCity(find.id);
            }
            
    }

    useEffect(() => {
        listCitiesService(idDepartment).then(         
            //existe probabilidad de error por parte del back   
            result  => setlistCities(result.data.Cities)).
            catch( setlistCities ([]))
    },[])

    return(
        <Autocomplete
        id="searchCities"
        options = {setlistCities}
        getOptionLabel = { option => ( option.name)}
        
    
        style = {{widht : 300}}
        renderInput = {
            params => 
                <TextField
                    id= "inputOptionCity" {...params}
                    label = "Ciudad"
                    variant = "outlined" 

                />
        
        }

        onInputChange = {(e,input) => {callback(input,idCity);
            getIdCity(input)}}
    />
    )
}
