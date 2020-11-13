import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

export const AssignDirector = ({state,setState,listContext}) => {
 
    const [open, setOpen] = useState(true)
    const [idGi, setIdGi] = useState([])
    useEffect(() => {
         setOpen(state)
    }, [state])
    const handleClose = () =>{
        setOpen(false);
        setState(false);
    };
    const handleAssign = () => {
        setOpen(false)
        setState(false);
    }
    const getIdGi = (id) =>{
        setIdGi(id)
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
                 <SearchGI callback = {getIdGi} listGi = {listContext}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAssign} color="primary" variant="outlined">Asignar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
