import React, { useState,useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {listCountriesService} from './service'



export const SearchCountry = ({callback}) => {

    
    const [listCountries, setlistCountries] = useState([])
    const [idCountry, setidCountry] = useState([])


    const getIdContry = (name) =>{


            let find = listCountries.find( country => country.name === name )
            if (find === undefined){
                setidCountry("null")
            }else{
                setidCountry(find.id);
            }
            
    }

    useEffect(() => {
        listCountriesService().then(
            
            result  => setlistCountries(result.data.Countrys)).
            catch( setlistCountries ([]))
    },[])

    return(
        <Autocomplete
        id="searchCountries"
        options = {listCountries}
        getOptionLabel = { option => ( option.name)}
        
    
        style = {{widht : 300}}
        renderInput = {
            params => 
                <TextField
                    id= "inputOptionCountry" {...params}
                    label = "Pais"
                    variant = "outlined"
                    

                />
        
        }

        onInputChange = {(e,input) => {callback(input,idCountry);
                                            getIdContry(input)} }
    />
    )
}
