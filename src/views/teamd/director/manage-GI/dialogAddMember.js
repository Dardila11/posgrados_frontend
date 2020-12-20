import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import {addMemberService} from './service'
import {AlertView} from 'src/components/Alert'
import {ConsultProfesorService} from '../../coordinator/GI/service'
import { SearchProfessor } from 'src/views/teamd/Search/searchProfessor'
export const DialogAddMember = ({state,setState}) => {
    const [openAlert, setOpenAlert] = useState(false)
    const [typeAlert, setTypeAlert] = useState('success')
    const [message, setMessage] = useState('')
    const [profesorSelect, setProfesorSelect] = useState("")
    // end alerta

    const [open, setOpen] = useState(false)
    useEffect(() => {
            setOpen(state)
    }, [state])
    const handleAdd = (e) => {
        e.preventDefault();
        setOpenAlert(false)
        if (localStorage.getItem("GiDirector")===null){
          console.log("GI LOCALSTORAGE NULLO")
        }else{
          addMemberService({
            "member_status": true,
            "professor": profesorSelect,
            "inv_group": JSON.parse(localStorage.getItem("GiDirector")).id
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
          <SearchProfessor callback={setProfesorSelect}/>
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
