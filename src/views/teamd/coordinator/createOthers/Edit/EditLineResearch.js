import React, { useEffect, useState } from 'react'

import { TextField,Button, makeStyles,Container } from '@material-ui/core';
import {SearchKnowLedge} from '../../../Search/searchKnowLedge'
import {SearchLineLedge} from '../../../Search/searchLineResearch'
import { Box, Typography } from '@material-ui/core'
import InputAdornment from '@material-ui/core/InputAdornment';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import TitleRoundedIcon from '@material-ui/icons/TitleRounded';
import {ConsultarLineResearch} from '../service'
import {AlertView} from 'src/components/Alert'
import {EditarLineReseach} from '../service'
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

export const EditLineResearch = () => {
      //alert
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
      console.log("identificador area",id)
        setIdKnowLedge(id)
    }
    const handleChangeTitle = (e)=>{
        setName(e.target.value)
    }
    const handleChangeDescription=(e)=>{
        setDescription(e.target.value)
    }
    const handleEdit =(e) =>{
      EditarLineReseach({
            id:IdKnowLedge,
            name: name,
            description: description,
            know_area: IdKnowLedge
        }).then(() => {
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
    const getIdLineResearch = async (id)=>{
        setIdLineResearch(id)
        await ConsultarLineResearch(id).then( (request)=>{setLine(request.data)})
    }
    useEffect(() => {
        setName(line.name)
        setDescription(line.description)
    }, [line])

    return (
        <>  
            <Container maxWidth="sm" className={clases.root}>
            <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
            >
            <form>
            <Typography variant="h4">
                Selecionar la linea a editar para editar               
            </Typography>
            <SearchKnowLedge  callback={getIdKnowLedge}/>
            <SearchLineLedge callback={getIdLineResearch} idKnowLedge={IdKnowLedge}/>
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
              </form>
              </Box>
              </Container>
              <AlertView open = {openAlert}  typeAlert = {typeAlert} message = {message}/>
        </>
    )
}
