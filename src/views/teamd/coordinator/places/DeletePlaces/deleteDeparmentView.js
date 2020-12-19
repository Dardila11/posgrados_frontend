import React, { useState } from 'react';
import {DeleteDeparmentService} from './service';
import * as Yup from 'yup';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AlertView } from '../../../../../components/Alert'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Box,
  Button,
  Container,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//Import component search

import { SearchCountry } from 'src/views/teamd/Search/searchCountry';
import { SearchDepartment } from 'src/views/teamd/Search/searchDepartment';
// service

//import { DeleteDeparmentService } from './service';

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

const DeleteDepartmentView = () => {
  const [open, setOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')
  const clases = useStyles();
  const [name, setname] = useState(' ');
  const [idCountry, setidCountry] = useState('');
  const [idDeparment, setIdDeparment] = useState('');

  const handleOnchangeName = e => {
    setname(e.target.value);
  };
  const handleDelete = () => {
   
    DeleteDeparmentService({
      id:idDeparment,
      name: name,
      country: idCountry,
      status: 0
    })
      .then(() => {
        setOpenAlert(true)
        setTypeAlert('success')
        setMessage('Departamento Eliminado Correctamente')
      })
      .catch(() => {
        setOpenAlert(true)
        setTypeAlert('error')
        setMessage('Error, Verifica los datos!')
      });
      setOpen(false)
  };
  const handleClose = () => {
    setOpen(false);
};
  const handleSubmit = event => {
    handleClickOpenDeleteDeparment();
    event.preventDefault();
  };
  const handleClickOpenDeleteDeparment = () => {
    const nameDeparment = document.getElementById("searchDepartments").value;
    setname(nameDeparment)
    
    if (nameDeparment == ""){
        setOpenAlert(true)
        setTypeAlert('error')
        setMessage('Error, campos vacios !')        
    }else{
        console.log("valor: "+ nameDeparment)
        setOpen(true);
    }     
};
  const getCountry = id => {
    setidCountry(id);
  };
  const getDeparment = id => {
      setIdDeparment(id);
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
        {({ errors, handleBlur, handleChange, touched, values, isSubmitting }) => (
          <>
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="center"
            >
              <form onSubmit={handleSubmit} className={clases.root}>
                <Typography color="textPrimary" variant="h1" align="center">
                  Eliminar Departamento
                </Typography>
                <Box mb={3} id="box3">
                  <SearchCountry callback={getCountry} />
                  <SearchDepartment idCountry={idCountry} callback={getDeparment} />
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
                                        Esta seguro que desea eliminar el Departamento.
                                    </DialogContentText>                                                                        
                                   
                                  </DialogContent>
                                <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Cancelar
                                </Button>
                                <Button onClick={handleDelete} color="primary" type="submit" disabled={isSubmitting}>
                                    Eliminar
                                </Button>
                                </DialogActions>
                                
                        </Dialog>

                  </Box>
                </Box>
              </form>
            </Box>
          </>
        )}
      </Formik>
      <AlertView open = {openAlert}  typeAlert = {typeAlert} message = {message}/>
    </Container>
  );
};

export default DeleteDepartmentView;
