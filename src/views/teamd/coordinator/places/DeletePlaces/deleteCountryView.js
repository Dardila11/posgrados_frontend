import React, { useState } from 'react';
import { DeleteCountryService } from './service';
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
import {SearchCountry} from 'src/views/teamd/Search/searchCountry';
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
const DeleteCountryView = () => {
  const [open, setOpen] = useState(false)
  const [openAlert, setOpenAlert] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')
  const clases = useStyles();
  const [name, setname] = useState(' ');
  const [idCountry, setIdCountry] = useState('');
  const handleClickOpenDeleteCountry = () => {
    const namecountry = document.getElementById("searchCountries").value;
    setname(namecountry)
    if (namecountry == ""){
        setOpenAlert(true)
        setTypeAlert('error')
        setMessage('Error, campos vacios !')        
    }else{
        console.log("valor: "+ namecountry)
        setOpen(true);
    }     
};
  const handleDelete = () => {
    setOpenAlert(false)
    DeleteCountryService({
      id: idCountry,
      name: name,
      status: 0
    })
      .then(() => {
        setOpenAlert(true)
        setTypeAlert('success')
        setMessage('Pais Eliminado Correctamente')
      })
      .catch(() => {
        setOpenAlert(true)
        setTypeAlert('error')
        setMessage('Error, verifica los datos!')

      });
      setOpen(false)
  };
  const handleSubmit = event => {
    handleClickOpenDeleteCountry();
    event.preventDefault()
    //handleDelete();
  };
  const handleOnchangeName = e => {
    setname(e.target.value);
  };
  const handleClose = () => {
    setOpen(false);
};
  const getCountry = id => {
      setIdCountry(id);
  }
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
        onSubmit={() => {
          return 1;
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          isSubmitting,
          touched,
          values
        }) => (
          <>
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="center"
            >
              <form onSubmit={e => handleSubmit(e)} className={clases.root}>
                <Typography color="textPrimary" variant="h1" align="center">
                  Eliminar Pais
                </Typography>
                <Box mb={3}>
                 
                  <SearchCountry  callback={getCountry} />
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
                                        Esta seguro que desea eliminar el Pais.
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

export default DeleteCountryView;
