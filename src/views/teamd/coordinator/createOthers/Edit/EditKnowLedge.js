import React, { useEffect, useState } from 'react'

import { TextField,Button, makeStyles,Container} from '@material-ui/core';
import {SearchKnowLedge} from '../../../Search/searchKnowLedge'
import {ConsultarKnowLedge} from '../service'
import { Box, Typography } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import TitleRoundedIcon from '@material-ui/icons/TitleRounded';
import {EditarKnowLedge} from '../service'
import {AlertView} from 'src/components/Alert'
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

export const EditKnowLedge = () => {
    //alert
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
        await ConsultarKnowLedge(id).then( (request)=>{setKnowLedge(request.data,)})
    }
    useEffect(() => {
        setName(knowLedge.name)
        setDescription(knowLedge.description)
    }, [knowLedge])

    const handleChangeTitle = (e)=>{
        setName(e.target.value)
    }
    const handleChangeDescription=(e)=>{
        setDescription(e.target.value)
    }
    const handleEdit =(e) =>{
        EditarKnowLedge({
            id:idKnowLedge,
            name: name,
            description: description
        })
        .then(() => {
          setOpenAlert(true)
          setTypeAlert('success')
          setMessage('Area editada correctamente')
        })
        .catch(() => {
          setOpenAlert(true)
          setTypeAlert('error')
          setMessage('Error, Verifica los datos')
        });
        e.preventDefault();
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
            <form >
            <Typography variant="h4">
                Selecionar el area para editar               
            </Typography>
            <SearchKnowLedge  callback={getIdKnowLedge}/>

            <Box mb={3}>
                <TextField
                  fullWidth
                  label="Title"
                  margin="normal"
                  name="title"
                  onChange={e => {
                    handleChangeTitle(e);
                  }}
                  type="text"
                  value={name}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleRoundedIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Descripcion"
                  margin="normal"
                  name="description"
                  onChange={e => {
                    handleChangeDescription(e);
                  }}
                  type="text"
                  value={description}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionRoundedIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={handleEdit}

                  >
                    Editar
                  </Button>
                </Box>
              </Box>
              </form>
              </Box>
              </Container>
              <AlertView open = {openAlert}  typeAlert = {typeAlert} message = {message}/>
        </>
    )
}
