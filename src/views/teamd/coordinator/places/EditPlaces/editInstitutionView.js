import React, { useState } from 'react';
import { EditInstitutionService } from './service';
import * as Yup from 'yup';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AlertView } from '../../../../../components/Alert'
import { makeStyles } from '@material-ui/core/styles';
//Import component search
import { SearchFullCountry } from 'src/views/teamd/Search/searchFullCountry';
import { SearchFullDepartment } from 'src/views/teamd/Search/searchFullDepartment';
import { SearchFullCity } from 'src/views/teamd/Search/searchFullCity';
import { SearchFullInstitution} from 'src/views/teamd/Search/searchFullInstitution';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

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

const EditInstitutionView = () =>{
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
    const [type, setType] = useState('');
    const handleClickOpenEditInstitution = () => {
      setOpenAlert(false)  
      const namecountry = document.getElementById("searchCountries").value;
      console.log("papis: "+namecountry)
      const nameDeparment = document.getElementById("searchDepartments").value;
      console.log("deprmen: "+nameDeparment)
      const nameCity = document.getElementById("searchCities").value;
      const nameInstitution = document.getElementById("searchInstitutions").value;
      if (namecountry === "" || nameDeparment === "" ){
          setOpenAlert(true)
          setTypeAlert('error')
          setMessage('Error, campos vacios !')   
                       
      }else{
          console.log("pais: "+ namecountry)
          console.log("departamento: "+nameDeparment)
          console.log("ciudad: "+nameCity)
          console.log("institucion: "+nameInstitution)
          setOpen(true);
      }

  };
  const handleOnchangetype = e => {
    setType(e.target.value);
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

    const handleEdit = () => {
      setOpen(false)
      EditInstitutionService({
        id:idInstitution,
        name_inst: name,
        city: idCity,
        department: idDepartment,
        country: idCountry,
        status: type
      })
        .then(() => {
          setOpenAlert(true)
          setTypeAlert('success')
          setMessage('Institución Editada correctamente')
        })
        .catch(() => {
          setOpenAlert(true)
          setTypeAlert('error')
          setMessage('Error, Verifica los datos!')
        });
        setOpen(false)
    };
    const handleSubmit = event => {
      handleClickOpenEditInstitution();
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
                          
                      <SearchFullCountry callback={getCountry} />
                      <SearchFullDepartment
                        idCountry={idCountry}
                        callback={getDepartment}
                      />
                      <SearchFullCity idDepartment={idDepartment} callback={getCity} />
                      <SearchFullInstitution idCity={idCity} callback={getInstitution} />
    
                      <Box my={2}>
                        <Button
                          color="primary"
                          fullWidth
                          size="large"
                          type="submit"                          
                          variant="contained"
                        >
                          Editar
                        </Button>
                        <Dialog open={open} onSubmit={e => handleSubmit(e)} name={name} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Editar Institucion</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Edite los campos necesarios.
                                    </DialogContentText>                                    
                                    <TextField
                                      error={Boolean(touched.name && errors.name)}
                                      fullWidth
                                      helperText={touched.name && errors.name}
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

                                    <SearchFullCountry callback={getCountry} />
                                    <SearchFullDepartment
                                      idCountry={idCountry}
                                      callback={getDepartment}
                                    />
                                    <SearchFullCity idDepartment={idDepartment} callback={getCity} />
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

export default EditInstitutionView;