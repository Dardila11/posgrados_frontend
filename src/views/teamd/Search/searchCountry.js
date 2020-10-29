import React, { useState,useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {listCountriesService} from './service'
import { get } from 'lodash';



export const SearchCountry = ({callback}) => {

    
    const [listCountries, setlistCountries] = useState([])
    const [idCountry, setidCountry] = useState([])




    useEffect(() => {
        listCountriesService().then(
            
             result  => setlistCountries(result.data.Countrys)).
             catch( setlistCountries ([]))
    },[])
    
    const getIdContry = async (name) =>{


            let find = listCountries.find( country => country.name === name )
            if (find === undefined){
                setidCountry("null")
            }else{
                callback(find.id)
            }
      
    }



    return(
        <Autocomplete
        id="searchCountries"
        options = {listCountries}
        getOptionLabel = { option => ( option.name)}
        style = {{marginBottom: 10, marginTop: 10,widht : 300}}
        renderInput = {
            params => 
                <TextField
                    id= "inputOptionCountry" {...params}
                    label = "Pais"
                    variant = "outlined"
                    required

                />
        
        }
        onInputChange = {(e,input) => getIdContry(input)}
        onChange = {(e,input) => getIdContry(input)}
    
        
    />
    )
}
