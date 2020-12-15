import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailRoundedIcon from '@material-ui/icons/MailRounded';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {addMemberService} from './service'
import {AlertView} from 'src/components/Alert'
import {ConsultProfesorService} from '../../coordinator/GI/service'
import {ConsultUserService} from 'src/views/teamd/Search/service'
export const DialogAddMember = ({state,setState}) => {
    const [listProfessors, setlistProfessors] = useState([])
    const [openAlert, setOpenAlert] = useState(false)
    const [typeAlert, setTypeAlert] = useState('success')
    const [message, setMessage] = useState('')
    const [profesorSelect, setProfesorSelect] = useState("")
    const [userList, setuserList] = useState([])
    // end alerta

    const [open, setOpen] = useState(false)
    useEffect(() => {
            setOpen(state)
    }, [state])
    const getIdProfessor = input =>{
      let find = listProfessors.find(profesor => profesor.username === input);
      console.log(find)
      if (find === undefined) {
      } else {
        let find2 = userList.find (professor => professor.user === find.id)
        setProfesorSelect(find2.id);
      }
  
    }
    useEffect(() => {
      ConsultUserService()
        .then(request => {
          console.log("Consultar usuarios ",request.data.Users)
          let lista = listProfessors
          request.data.Users.map( (usuario)=>{
            if (usuario.is_proffessor === true){ // Todo arreglar setListProfessor
              lista.push(usuario)
            }
          })
          setlistProfessors(lista)
          
        })
        .catch(console.log("nada"));
        ConsultProfesorService().then( request => {setuserList(request.data.Professors)})
    }, []);
    const handleAdd = (e) => {
        e.preventDefault();
        setOpenAlert(false)
        if (localStorage.getItem("Gi")===null){

        }else{
          addMemberService({
            "member_status": true,
            "professor": profesorSelect,
            "inv_group": JSON.parse(localStorage.getItem("Gi")).id
        }).then( () => {
        setOpenAlert(true)
        setTypeAlert('success')
        setMessage('Miembro agregado correctamente')}
        ).catch(() => {
          setOpenAlert(true)
          setTypeAlert('error')
          setMessage('Error')
        })
        setOpen(false)
        setState(false)

        }

    }
    const handleClose = () => {
        setOpen(false)
        setState(false)
    }


    return (
        <>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Agregar Miembro</DialogTitle>
        <DialogContent>
            <DialogContentText>
               Para agregar un miembro debe elegir al que desea por su username y darle click al boton agregar
            </DialogContentText>
        </DialogContent>
        <DialogContent>
        <Autocomplete
                        id="searchProffesor"
                        options={listProfessors}
                        getOptionLabel={option => option.username}
                        style={{ marginBottom: 10, marginTop: 10 }}
                        renderInput={params => (
                          <TextField
                            id="inputOption"
                            {...params}
                            label='Director'
                            variant='outlined'
                            required
                          />
                        )}
                        onInputChange={(e, input) => getIdProfessor(input)}
                        onChange={(e, input) => getIdProfessor(input)}
        />
        </DialogContent>
        <DialogActions>

          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAdd} color="primary">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
      <AlertView open = {openAlert}  typeAlert = {typeAlert} message = {message}/>
        </>
    )
}
