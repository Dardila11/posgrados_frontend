import React, { useState } from 'react';
import { EditCityService } from './service';
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
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
//Import component search
import { SearchCountry } from 'src/views/teamd/Search/searchFCountry';
import { SearchDepartment } from 'src/views/teamd/Search/searchFDepartment';
import { SearchCity } from 'src/views/teamd/Search/searchFCity';

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

const EditCityView = () => {
  const [open, setOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')
  const clases = useStyles();
  const [name, setname] = useState(' ');
  const [idDepartment, setidDdepartment] = useState(' ');
  const [idCountry, setidCountry] = useState(' ');
  const [idCity, setIdCity] = useState('');
  const [type, setType] = useState(' ');

  const setCountry = id => {
    setidCountry(id);
  };

  const setDepartment = id => {
    console.log('el departamento es  ', id);
    setidDdepartment(id);
  };

  const setCity = id => {
      console.log("la id ciudad es: "+id);
    setIdCity(id);
  };
  const handleOnchangetype = e => {
    setType(e.target.value);
  };
  const handleOnchangeName = e => {
    setname(e.target.value);
  };
  const handleClickOpenEditCity = () => {
    setOpen(false);
    const namecountry = document.getElementById("searchFCountries").value;
    const nameDeparment = document.getElementById("searchDepartments").value;
    const nameCity = document.getElementById("searchCities").value;
    console.log('pais'+namecountry+' depart '+nameDeparment +' city '+nameCity)
    if (namecountry == "" || nameDeparment == "" || nameCity == ""){
        
    }else{
        console.log("pais: "+ namecountry)
        console.log("departamento: "+nameDeparment)
        console.log("ciudad: "+nameCity)
        setOpen(true);
    }

};
  const handleEdit = () => {
    setOpenAlert(false)
    EditCityService({
      id: idCity,
      name: name,
      state: idDepartment,
      status:type
    })
      .then(() => {
        setOpenAlert(true)
        setTypeAlert('success')
        setMessage('Ciudad Editada correctamente')
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
  //  handleCreate();
    event.preventDefault();
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
            .required('name is required')
        })}
        onSubmit={() => {}}
      >
        {({ errors, handleBlur, handleChange, touched, values , isSubmitting}) => (
          <>
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="center"
            >
              <form onSubmit={handleSubmit} className={clases.root}>
                <Typography color="textPrimary" variant="h1" align="center">
                  Editar Ciudad
                </Typography>
                <Box mb={3}>
                <SearchCountry callback={setCountry} />
                <SearchDepartment
                  idCountry={idCountry}
                  callback={setDepartment}
                />
                <SearchCity 
                  idDepartment={idDepartment}
                  callback={setCity}
                />
                <Box my={2}>
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  onClick={handleClickOpenEditCity}
                >
                  Editar
                </Button>
                <Dialog open={open} onSubmit={e => handleSubmit(e)} name={name} onClose={handleClose} aria-labelledby="form-dialog-title">
                      <DialogTitle id="form-dialog-title">Editar Ciudad</DialogTitle>
                          <DialogContent>
                              <DialogContentText>
                                  Edite los campos necesarios.
                              </DialogContentText>                                    
                              <TextField
                                error={Boolean(touched.name && errors.name)}
                                helperText={touched.name && errors.name}
                                fullWidth
                                label="Nombre"
                                margin="normal"
                                name="name"
                                onChange={e => {
                                  handleOnchangeName(e);
                                  handleChange(e);
                                }}
                                onBlur={handleBlur}
                                type="text"
                                value={values.name}
                                variant="outlined"
                              />
                              <SearchCountry callback={setCountry} />
                              <SearchDepartment
                                idCountry={idCountry}
                                callback={setDepartment}
                              />
                              <Typography color="textPrimary" variant="h5">
                                Estado 
                              </Typography>
                              <Select 
                                id="Select-cohorte"
                                onChange={handleOnchangetype}>
                                                              
                                <MenuItem value={0}>Inactivo</MenuItem>
                                <MenuItem value={1}>Activo</MenuItem>
                                        
                              </Select>
                              
                          </DialogContent>
                          <DialogActions>
                          <Button onClick={handleClose} color="primary">
                              Cancelar
                          </Button>
                          <Button onClick={handleEdit} color="primary" type="submit" disabled={isSubmitting}>
                              Editar
                          </Button>
                          </DialogActions>
                          <AlertView open = {openAlert}  typeAlert = {typeAlert} message = {message}/>
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
export default EditCityView;
