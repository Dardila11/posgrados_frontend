import React, { useEffect, useState } from 'react'

import { TextField,Button, makeStyles } from '@material-ui/core';
import {SearchKnowLedge} from '../../../Search/searchKnowLedge'
import {SearchLineLedge} from '../../../Search/searchLineResearch'
import {ConsultarKnowLedge} from '../service'
import {GetLineResearch} from '../../../Search/service'
import { Box, Typography } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import TitleRoundedIcon from '@material-ui/icons/TitleRounded';
import {EditarKnowLedge} from '../service'
import {ConsultarLineResearch} from '../service'
import {AlertView} from 'src/components/Alert'
//import {EditKnowLedge} from './EditKnowLedge'
import {EliminarLineReseach} from '../service'
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

export const DeletLineResearch = () => {
      //alert
      const [open, setOpen] = useState(false)
      const [openAlert, setOpenAlert] = useState(false)
      const [typeAlert, setTypeAlert] = useState('success')
      const [message, setMessage] = useState('')
      //end
    const clases = useStyles();
    const [IdKnowLedge, setIdKnowLedge] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [knowLedge, setKnowLedge] = useState('')
    const [idLineResearch, setIdLineResearch] = useState('')
    const [line, setLine] = useState('')
    //funciones
    const getIdKnowLedge = (id)=>{
      console.log("identificador area ",id)
        setIdKnowLedge(id)
    }
    const handleChangeTitle = (e)=>{
        setName(e.target.value)
    }
    const handleChangeDescription=(e)=>{
        setDescription(e.target.value)
    }
    const handleSubmit = event => {
        handleClickOpenDeleteLineResearch();
        event.preventDefault()        
    };
    const handleClickOpenDeleteLineResearch = () => {
        const nameLineResearch = document.getElementById("searchLineResearch").value;
        setName(nameLineResearch)
        if (nameLineResearch == ""){
            setOpenAlert(true)
            setTypeAlert('error')
            setMessage('Error, campos vacios !')     
        }else{
            console.log("valor: "+ nameLineResearch)
            setOpen(true);
        }     
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete =(e) =>{
        EliminarLineReseach({
            id:idLineResearch,
            name: name,
            description: description,
            know_area: IdKnowLedge,
            status: 0
        }).then(() => {
          setOpenAlert(true)
          setTypeAlert('success')
          setMessage('Linea Eliminada correctamente')
        })
        .catch(() => {
          setOpenAlert(true)
          setTypeAlert('error')
          setMessage('Error, Verifica los datos')
        });
        e.preventDefault();
        setOpen(false)
    }
    const getIdLineResearch = async (id)=>{
        setIdLineResearch(id)
        console.log('id ',idLineResearch)
        await ConsultarLineResearch(id).then( (request)=>{setLine(request.data)})
        console.log('linea 0 ',line)
    }
    useEffect(() => {
        setName(line.name)
        setDescription(line.description)
    }, [line])

    return (
        <>

            <form className={clases.root} onSubmit={e => handleSubmit(e)}>
            <Typography variant="h4">
                Selecionar la linea a Eliminar              
            </Typography>
            <SearchKnowLedge  callback={getIdKnowLedge}/>
            <SearchLineLedge callback={getIdLineResearch} idKnowLedge={IdKnowLedge} idLineResearch={idLineResearch}/>
            
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
                                    Esta seguro que desea eliminar la Linea de Investigacion.
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
              </form>
              <AlertView open = {openAlert}  typeAlert = {typeAlert} message = {message}/>
        </>
    )
}
