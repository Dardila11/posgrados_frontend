import React, { useEffect, useState } from 'react'

import { Button, makeStyles,Container } from '@material-ui/core';
import {SearchKnowLedge} from '../../../Search/searchKnowLedge'
import {ConsultarKnowLedge} from '../service'
import { Box, Typography } from '@material-ui/core'
import {DeleteKnowLedge} from '../service'
import {AlertView} from 'src/components/Alert'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles({
  root: {
    background: 'white',
    border: 1,
    borderRadius: 3,
    boxShadow: '-1px 8px 36px 4px rgba(158,158,158,1)',
    paddingTop: '30px',
    paddingLeft: '50px',
    paddingRight: '50px',
    paddingBottom: '40px'
  },
  container: {
    marginTop: '30px'
  }
});

export const DeletKnowLedge = () => {
    //alert
    const [open, setOpen] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [typeAlert, setTypeAlert] = useState('success')
    const [message, setMessage] = useState('')
    //end
    const clases = useStyles();
    const [idKnowLedge, setIdKnowLedge] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [knowLedge, setKnowLedge] = useState('')
    //funciones
    const getIdKnowLedge = async (id)=>{
        setIdKnowLedge(id)
        await ConsultarKnowLedge(id).then( (request)=>{setKnowLedge(request.data)})
    }
    useEffect(() => {
        setName(knowLedge.name)
        setDescription(knowLedge.description)
    }, [knowLedge])
    const handleSubmit = event => {
        handleClickOpenDeleteKnowLedge();
        event.preventDefault()        
    };
    const handleClickOpenDeleteKnowLedge = () => {
        const nameKnowLedge = document.getElementById("searchKnowLedge").value;
        setName(nameKnowLedge)
        if (nameKnowLedge == ""){
            setOpenAlert(true)
            setTypeAlert('error')
            setMessage('Error, campos vacios !')        
        }else{
            console.log("valor: "+ nameKnowLedge)
            setOpen(true);
        }     
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete =(e) =>{
        DeleteKnowLedge({
            id:idKnowLedge,
            name: name,
            description: description,
            status: 0
        })
        .then(() => {
          setOpenAlert(true)
          setTypeAlert('success')
          setMessage('Area Eliminada correctamente')
        })
        .catch(() => {
          setOpenAlert(true)
          setTypeAlert('error')
          setMessage('Error, Verifica los datos')
        });
        e.preventDefault();
        setOpen(false)
    }
    return (
        <>
        <Container maxWidth="sm" className={clases.root}>
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
          >
            <form onSubmit={e => handleSubmit(e)}>
            <Typography variant="h3">
                Selecionar el area a Eliminar               
            </Typography>
            <SearchKnowLedge  callback={getIdKnowLedge}/>

            <Box mb={3}>
                
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    
                  >
                    Eliminar
                  </Button>
                  <Dialog open={open} onSubmit={e => handleSubmit(e)} name={name} onClose={handleClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title"></DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Esta seguro que desea eliminar el Area de Conocimiento.
                                </DialogContentText>                                                                                                           
                            </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary">
                                Cancelar
                            </Button>
                            <Button onClick={handleDelete} color="primary" type="submit" >
                                Eliminar
                            </Button>
                        </DialogActions>
                                
                    </Dialog>

                </Box>
              </Box>
              </form>
              </Box>
              </Container>
              <AlertView open = {openAlert}  typeAlert = {typeAlert} message = {message}/>
        </>
    )
}
