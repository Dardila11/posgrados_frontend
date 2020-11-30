import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {SearchDeparmentI} from '../../../Search/searchDepartmentI'
import {SearchGI} from '../../../Search/searchGI'
import {AssignDirector} from '../service'


export const AssignDirectorView = ({state,setState,idProfessor}) => {
 
    const [open, setOpen] = useState(true)
    const [idGi, setIdGi] = useState([])
    const [departmentIId, setDepartmentIId] = useState('')
    useEffect(() => {
         setOpen(state)
    }, [state])
    const handleClose = () =>{
        setOpen(false);
        setState(false);
    };
    const handleAssign = (e) => {
        e.preventDefault();
        setOpen(false)
        setState(false);
        console.log("id Profesor",idProfessor)
        AssignDirector({
            inv_group: idGi,
            professor: idProfessor,
            direction_state: 1
        }).then( (request)=> console.log (" ya ", request)).catch()


    }
    const getIdGi = (id) =>{
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
        </>
    )
}
