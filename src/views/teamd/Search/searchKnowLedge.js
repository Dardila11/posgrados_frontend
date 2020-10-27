import React, { useState,useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {GetKnowLedgeListService} from './service'


export const SearchKnowLedge = () => {
    
    const [knowLedgeList, setknowLedgeList] = useState([])
    const [optionSelected, setoptionSelected] = useState("")
    //valores iniciales para pruebas

    //llenando la lista de opciones
        //Ejecutar funcion solo una vez
        useEffect(() => {

            GetKnowLedgeListService().then( (request)  =>{
                setknowLedgeList(request.data);
            }).catch( () => setknowLedgeList([{title:"Sistemas"},{title:"Electronica"}]));
        },[])

    // Obtener valor seleccionado
    return (
        <Autocomplete
            id="searchKnowLedge"
            options={knowLedgeList}
            getOptionLabel={ (option) =>option.title}
            style={{width: 300}}
            renderInput= {params => 
                            <TextField id="inputOption" {...params}
                                label = "Area de conocimiento"
                                variant = "outlined"
                                >

                                </TextField>}
            onInputChange={ (e,input) => setoptionSelected(input)}
            
        >
        
        </Autocomplete>


        
    )
}
