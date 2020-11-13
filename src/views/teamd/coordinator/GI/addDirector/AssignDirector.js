import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

export const AssignDirector = ({state,getState}) => {
 
    const [open, setOpen] = useState(false)
    const [open2,setOpen2] = useState (true)
    useEffect(() => {
        setOpen(state)
        console.log("useEffect ", state)
    }, [state])

    const handleClose = () =>{
        console.log("Handle close ", open);
        setOpen(false);
        setOpen2(10);
        console.log("Handle close  2", open2);
        console.log("Handle close ", open);
        getState(open);
    };
    const handleAssign = () => {
        console.log("Dialog Asignar director")
        setOpen(false)
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
                    <TextField
                        margin="dense"
                        id="gi"
                        label="Grupo de investigacion" //TODO : UTILIZAR COMPONENTE SEARCHGI
                        type="text"
                        variant = "outlined"
                        fullWidth>
                    </TextField>  
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAssign} color="primary" variant="outlined">Asignar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
