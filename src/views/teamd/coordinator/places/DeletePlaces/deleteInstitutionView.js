import React, { useState } from 'react';
import {DeleteInstitutionService} from './service';
import * as Yup from 'yup';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AlertView } from '../../../../../components/Alert'
import { makeStyles } from '@material-ui/core/styles';
//Import component search
import { SearchCountry } from 'src/views/teamd/Search/searchCountry';
import { SearchDepartment } from 'src/views/teamd/Search/searchDepartment';
import { SearchCity } from 'src/views/teamd/Search/searchCity';
import { SearchInstitution} from 'src/views/teamd/Search/searchInstitution';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';

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

const DeleteInstitutionView = () =>{
    const [open, setOpen] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [typeAlert, setTypeAlert] = useState('success')
    const [message, setMessage] = useState('')
    const clases = useStyles();
    const [name, setname] = useState(' ');
    const [idDepartment, setidDdepartment] = useState(' ');
    const [idCountry, setidCountry] = useState(' ');
    const [idCity, setidCity] = useState(' ');
    const [idInstitution, setInstitution] = useState('');

    const handleClickOpenDeleteInstitution = () => {      
      const nameinstitution = document.getElementById("searchInstitutions").value;
      setname(nameinstitution)
      if (nameinstitution === "" ){
          setOpenAlert(true)
          setTypeAlert('error')
          setMessage('Error, campos vacios !')                          
      }else{          
          console.log("institucion: "+nameinstitution)
          setOpen(true);
      }

  };
    const handleOnchangeName = e => {
        setname(e.target.value);
        console.log(e.target.value);
    };

    const getCountry = id => {
        setidCountry(id);
    };

    const getDepartment = id => {
        setidDdepartment(id);
    };

    const getCity = id => {
        setidCity(id);
    };
    const getInstitution = id =>{
        setInstitution(id);
    };

    const handleDelete = () => {
      
    DeleteInstitutionService({
        id:idInstitution,
        name_inst: name,
        city: idCity,
        department: idDepartment,
        country: idCountry,
        status: 0
      })
        .then(() => {
          setOpenAlert(true)
          setTypeAlert('success')
          setMessage('Institución Eliminada correctamente')
        })
        .catch(() => {
          setOpenAlert(true)
          setTypeAlert('error')
          setMessage('Error, Verifica los datos!')
        });
        setOpen(false)
    };
    const handleSubmit = event => {
        handleClickOpenDeleteInstitution();
        event.preventDefault();
    };

    const handleClose = () => {
      setOpen(false);
  };

    
    return (
        <Container maxWidth="sm" className={clases.container}>
          <Formik
            initialValues={{
              name: ''
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .max(255)
                .required('name is required'),
              city: Yup.string()
                .max(255)
                .required('city is required'),
              department: Yup.string()
                .max(255)
                .required('deparment is required'),
              country: Yup.string()
                .max(255)
                .required('country is required'),
              institution: Yup.string()
                .max(255)
                .required('Institution is required')
            })}
            onSubmit={() => {}}
          >
            {({ errors, handleBlur, handleChange, touched, values,isSubmitting }) => (
              <>
                <Box
                  display="flex"
                  flexDirection="column"
                  height="100%"
                  justifyContent="center"
                >
                  <form onSubmit={handleSubmit} className={clases.root}>
                    <Typography color="textPrimary" variant="h1" align="center">
                      Editar Institución
                    </Typography>
                    <Box mb={3}>
                          
                      <SearchCountry callback={getCountry} />
                      <SearchDepartment
                        idCountry={idCountry}
                        callback={getDepartment}
                      />
                      <SearchCity idDepartment={idDepartment} callback={getCity} />
                      <SearchInstitution idCity={idCity} callback={getInstitution} />
    
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
                                        Esta seguro que desea eliminar la Institución.
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

export default DeleteInstitutionView;