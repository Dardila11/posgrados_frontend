import React,{ useState,useEffect } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';

import {ConsultUserService} from "./service"

import {ConsultProfesorAll} from "./service"
import {
    TextField,
  } from '@material-ui/core';



export const SearchProfessor = ({ callback }) => {

    
    const [listUsers, setListUsers] = useState([])
    const [listProfessors, setListProfesors] = useState(null)  
    const [listProfessorsActive, setlistProfessorsActive] = useState([])
    const [state, setstate] = useState([])
    const getUsersList = async () => {
        await ConsultUserService().then( response => {
            setListUsers(response.data.Users)
        })
    }

    useEffect(async () => {
        await getUsersList()
        await ConsultProfesorAll().then(response => {
            setListProfesors(response.data.Professors)
        })
        console.log("profesores  ",listProfessorsActive)
    }, [])
    useEffect(() => {
        let list = []
        let profesors = []
        if (listUsers && listProfessors){
            console.log("entro")
            listProfessors.map( element => {
                if(element.status === true){
                    list.push(element)
                }
            })
            listUsers.map( response => {
                if(response.is_proffessor){
                    list.map( element => {
                        if(element.user === response.id){
                            profesors.push(response)
                        }
                    })
                }
                console.log("HOLA",profesors)
                setstate(profesors)
            })
            

        }
    }, [listProfessors])


    const getIdProfesor = (input) =>{
        console.log("dasdad",input)
        console.log("usuarios ",listProfessors)
        let user =listProfessors.find( element => element.user === input.id)
        if (user){
            console.log("dasdasdasdasd",user)
            callback(user.id)
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
          label='Profesor'
          variant='outlined'
          required
          style={{width: 300,marginLeft:10,marginBottom:20}}
        />
      )}
      onInputChange={(e, input) => getIdProfesor(input)}
      onChange={(e, input) => getIdProfesor(input)}
    />
    )
}
