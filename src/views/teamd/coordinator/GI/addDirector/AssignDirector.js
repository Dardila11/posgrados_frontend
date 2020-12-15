import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {SearchDeparmentI} from '../../../Search/searchDepartmentI'
import {SearchGI} from '../../../Search/searchGI'
import {AssignDirector} from '../service'
import { AlertView } from '../../../../../components/Alert'

export const AssignDirectorView = ({state,setState,idProfessor}) => {
 
    const [open, setOpen] = useState(true)
    const [idGi, setIdGi] = useState()
    const [departmentIId, setDepartmentIId] = useState('')
    const [openAlert, setOpenAlert] = useState(false)
    const [typeAlert, setTypeAlert] = useState('error')
    const [message, setMessage] = useState('')
    useEffect(() => {
         setOpen(state)
    }, [state])
    const handleClose = () =>{
        setOpen(false);
        setState(false);
    };
    const handleAssign = (e) => {
        setOpenAlert(false)
        e.preventDefault();
        setOpen(false)
        setState(false);
        AssignDirector({
            direction_state: true,
            inv_group: idGi,
            professor: idProfessor
            
        }).then( (request)=> {setOpenAlert(true);setTypeAlert('success');setMessage('Se asigno el director correctamente')})
        .catch( ()=> {setOpenAlert(true);setTypeAlert('error');setMessage('no se pudo asignar el director correctamente')})


    }
    const getIdGi = (id) =>{
        console.log("imprimiendo id GI", id)
        setIdGi(id)
    }
    const getDepartmentIId  = (id) =>{
        setDepartmentIId(id)
    }
    
    return (
        <>
            <Dialog open = {open} onClose = {handleClose}>
                <DialogTitle id="titleDialog">Asignar Director</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Para asignar el director debes elejir
                        un grupo de investigación    
                    </DialogContentText>
                    <SearchDeparmentI callback = {getDepartmentIId}></SearchDeparmentI>
                    <SearchGI callback = {getIdGi} departmentIID = {departmentIId}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAssign} color="primary" variant="outlined">Asignar</Button>
                </DialogActions>
            </Dialog>
            <AlertView open = {openAlert}  typeAlert = {typeAlert} message = {message}/>
        </>
    )
}
