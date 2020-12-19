import React,{ useState,useEffect } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';

import {ConsultUserService} from "./service"

import {
    TextField,
  } from '@material-ui/core';



export const SearchProfessor = ({ callback }) => {

    
    const [listUsers, setListUsers] = useState(JSON.parse(localStorage.getItem("usuarios")))
    const [listProfessors] = useState(JSON.parse(localStorage.getItem("profesores")))  
    const [state, setstate] = useState([])
    useEffect(() => {
        let list = []
        let profesors = []
        if (listUsers && listProfessors){
            console.log("Buscando profesores activos")
            listProfessors.map( element => {
                if(element.status === true){
                    list.push(element)
                }
            })
            listUsers.map( response => {
                list.map( element => {
                        if(element.user === response.id){
                            profesors.push(response)
                        }
                    })
                setstate(profesors)
            })
            

        }
    }, [])


    const getIdProfesor = (input) =>{
        if(input){
            let user =listProfessors.find( element => element.user === input.id)
            if (user){
                console.log("dasdasdasdasd",user)
                callback(user.id)
            }
        }

    }



    return (
    <Autocomplete
      id="searchProfesors"
      options={state}
      getOptionLabel={option => option.username}
      renderInput={params => (
        <TextField
          id="inputOptionProfessors"
          {...params}
          label='Profesores'
          variant='outlined'
          required
          style={{width: 300,marginTop:20}}
        />
      )}
      onInputChange={(e, input) => getIdProfesor(input)}
      onChange={(e, input) => getIdProfesor(input)}
    />
    )
}
