import React, { useState,useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {listCitiesService} from './service'



export const SearchCity = ({idDepartment,callback}) => {

    const [listCities, setlistCities] = useState([])
    const [idCity, setidCity] = useState([])


    const getIdCity = (name) =>{
        console.log("Encontró la ciudad ", name)
            let find = listCities.find( city => city.name === name )
            if (find === undefined){
                setidCity("null")
            }else{
                
                setidCity(find.id);
                callback(find.id)
            }
            
    }
    useEffect(() => {
        {listCitiesService(idDepartment).then(         
            result  => setlistCities(result.data.Citys)).
            catch( setlistCities ([]))
    }
    }, [idDepartment])
    return(
        <Autocomplete
        id="searchCities"
        options = {listCities}
        getOptionLabel = { option => ( option.name)}
        style = {{marginBottom: 10, marginTop: 10,widht : 300}}
        
        renderInput = {
            params => 
                <TextField
                    id= "inputOptionCity" {...params}
                    label = "Ciudad"
                    variant = "outlined"
                    required

                />
        
        }

        onInputChange = {(e,input) => getIdCity(input)}
        onChange = {(e,input) => getIdCity(input)}
    />
    )
}
