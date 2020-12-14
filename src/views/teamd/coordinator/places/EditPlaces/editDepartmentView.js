import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import * as Yup from 'yup';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AlertView } from '../../../../../components/Alert'
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//Import component search

import { SearchCountry } from 'src/views/teamd/Search/searchCountry';
import { SearchDepartment } from 'src/views/teamd/Search/searchDepartment';
// service

import { EditDeparmentService } from './service';

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

const EditDepartmentView = () => {
  const [open, setOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')
  const clases = useStyles();
  const [name, setname] = useState(' ');
  const [idCountry, setidCountry] = useState('');
  const [idDeparment, setidDeparment] = useState('');

  const handleSubmit = event => {
    event.preventDefault()
    //handleEdit();
  };
  const handleClose = () => {
    setOpen(false);
  };  
  const handleOnchangeName = e => {
    setname(e.target.value);
  };
  const handleClickOpenEditDeparment = () => {
    const namecountry = document.getElementById("searchCountries").value;
    const nameDeparment = document.getElementById("searchDepartments").value;
    if (namecountry == "" && nameDeparment == ""){
        setOpenAlert(true)
        setTypeAlert('error')
        setMessage('Error, campos vacios !')        
    }else{
        console.log("pais: "+ namecountry)
        console.log("departamento: "+nameDeparment)
        setOpen(true);
    }
        
  };
  const handleEdit = () => {
    setOpenAlert(false)
    EditDeparmentService({
      id: idDeparment,
      name: name,
      idcountry: idCountry
    })
      .then(() => {
        setOpenAlert(true)
        setTypeAlert('success')
        setMessage('Departamento Editado correctamente')
      })
      .catch(() => {
        setOpenAlert(true)
        setTypeAlert('error')
        setMessage('Error, Verifica los datos!')
      });
  };  

  const getCountry = id => {
    setidCountry(id);
  };

  const getDeparment = id => {
    setidDeparment(id);
  }

  return (
    <Container maxWidth="sm" className={clases.container}>
      <Formik
        initialValues={{
          name: '',
          country: ''
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string()
            .max(255)
            .required('name is required'),
          country: Yup.string()
            .max(255)
            .required('country is required')
        })}
        onSubmit={() => {}}
      >
        {({ errors, handleBlur, handleChange, touched, values ,isSubmitting}) => (
          <>
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="center"
            >
              <form className={clases.root}>
                <Typography color="textPrimary" variant="h1" align="center">
                  Editar Departamento
                </Typography>
                <Box mb={3} id="box3">
                  
                  <SearchCountry callback={getCountry} />
                  <SearchDepartment idCountry={idCountry} callback={getDeparment} />

                  <Box my={2}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"                                            
                      variant="contained"
                      onClick={handleClickOpenEditDeparment}
                    >
                      Editar
                    </Button>
                    <Dialog open={open} onSubmit={e => handleSubmit(e)} name={name} onClose={handleClose} aria-labelledby="form-dialog-title">
                      <DialogTitle id="form-dialog-title">Editar Departamento</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Edite los campos necesarios.
                          </DialogContentText>                                    
                            <TextField                              
                              fullWidth                              
                              label="Nombre"
                              margin="normal"
                              name="name"
                              onChange={e => {
                                handleOnchangeName(e);                                
                              }}                              
                              type="text"                              
                              variant="outlined"
                            />
                            <SearchCountry callback={getCountry} />
                      
                        </DialogContent>
                            <DialogActions>
                              <Button onClick={handleClose} color="primary">
                                Cancelar
                              </Button>
                              <Button onClick={handleEdit} color="primary" type="submit" disabled={isSubmitting}>
                                Editar
                              </Button>
                            </DialogActions>
                      
                    </Dialog>

                  </Box>
                </Box>
              </form>
              <AlertView open = {openAlert}  typeAlert = {typeAlert} message = {message}/>
            </Box>
          </>
        )}
      </Formik>
      
    </Container>
  );
};

export default EditDepartmentView;
