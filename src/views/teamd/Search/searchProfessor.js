import React,{ useState,useEffect } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    TextField,
  } from '@material-ui/core';
export const SearchProfessor = ({ callback }) => {
    const [listUsers, setListUsers] = useState(JSON.parse(localStorage.getItem("usuarios")))
    const [listProfessors] = useState(JSON.parse(localStorage.getItem("profesores")))  
    const [state, setstate] = useState([])
    useEffect(() => {
        setListUsers(JSON.parse(localStorage.getItem("usuarios")))
        let list = []
        let profesors = []
        if (listUsers && JSON.parse(localStorage.getItem("profesores"))){
            JSON.parse(localStorage.getItem("profesores")).map( element => {
                
                if(element.status === true){
                    console.log("PROFESORES ",element)
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
          style={{width: 300,marginTop:5}}
        />
      )}
      onInputChange={(e, input) => getIdProfesor(input)}
      onChange={(e, input) => getIdProfesor(input)}
    />
    )
}
