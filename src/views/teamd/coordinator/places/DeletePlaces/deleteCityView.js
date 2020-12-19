import React, { useState } from 'react';
//import { CreateCityService } from './service';
import * as Yup from 'yup';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AlertView } from '../../../../../components/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DeleteCityService } from './service';
import {
  Box,
  Button,
  Container,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//Import component search
import { SearchCity } from '../../../Search/searchCity';
import { SearchCountry } from 'src/views/teamd/Search/searchCountry';
import { SearchDepartment } from 'src/views/teamd/Search/searchDepartment';

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

const DeleteCityView = () => {
  const [open, setOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')
  const clases = useStyles();
  const [name, setname] = useState(' ');
  const [idCity, setIdCity] = useState(' ');
  const [idDepartment, setidDdepartment] = useState(' ');  
  const [idCountry, setidCountry] = useState(' ');

  const getCity = id =>{
    setIdCity(id);
  };
  const setCountry = id => {
    setidCountry(id);
  };

  const getDepartment = id => {    
    setidDdepartment(id);
  };  

  const handleOnchangeName = e => {
    setname(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
};
  const handleClickOpenDeleteCity = () => {        
    const nameCity = document.getElementById("searchCities").value;    
    setname(nameCity)
    console.log(nameCity)    
    if (nameCity == ""){
      setOpenAlert(true)
      setTypeAlert('error')
      setMessage('Error, campos vacios !')        
  }else{
      console.log("valor: "+ nameCity)
      setOpen(true);
  }      
  
};
  const handleDelete = () => {
  
    console.log(name)
    DeleteCityService({  
      id: idCity,
      name: name,
      state: idDepartment,
      status: 0,
    })
      .then(() => {
        setOpenAlert(true)
        setTypeAlert('success')
        setMessage('Ciudad Eliminada correctamente')
      })
      .catch(() => {
        setOpenAlert(true)
        setTypeAlert('error')
        setMessage('Error, Verifica los datos!')
      });
      setOpen(false)
  };
  const handleSubmit = event => {
    handleClickOpenDeleteCity();
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
        {({ errors, handleBlur, handleChange, touched, values }) => (
          <>
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="center"
            >
              <form onSubmit={handleSubmit} className={clases.root}>
                <Typography color="textPrimary" variant="h1" align="center">
                  Eliminar Ciudad
                </Typography>
                
                
                <SearchCountry callback={setCountry} />
                <SearchDepartment
                  idCountry={idCountry}
                  callback={getDepartment}
                />
                <SearchCity idDepartment={idDepartment} callback={getCity} />
                
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
                                  Esta seguro que desea eliminar la Ciudad
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
            </Box>
          </>
        )}
      </Formik>
      <AlertView open = {openAlert}  typeAlert = {typeAlert} message = {message}/>
    </Container>
    
  );
};
export default DeleteCityView;
