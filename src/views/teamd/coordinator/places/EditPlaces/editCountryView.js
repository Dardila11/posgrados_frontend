import React, { useState } from 'react';
import { EditCountryService } from './service';
import * as Yup from 'yup';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AlertView } from '../../../../../components/Alert'
import { SearchCountry } from 'src/views/teamd/Search/searchCountry'
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
const EditCountryView = () => {
  const [open, setOpen] = useState(false)  
  const [openAlert, setOpenAlert] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')
  const clases = useStyles();
  const [name, setname] = useState(' ');
  const [Country, setidCountry] = useState('');
  const [namecountry,setNameCountry] = useState('');
  const handleClickOpenEditCountry = () => {
    const namecountry = document.getElementById("searchCountries").value;
    if (namecountry == ""){
        setOpenAlert(true)
        setTypeAlert('error')
        setMessage('Error, campos vacios !')        
    }else{
        console.log("valor: "+ namecountry)
        setOpen(true);
    }
     
};
  const handleEdit = () => {
      //setOpen(true)
      console.log(Country)
      console.log(name)
    setOpenAlert(false)
      EditCountryService({
        
        id: Country,
        name: name
        
    })
      .then(() => {
        setOpenAlert(true)
        setTypeAlert('success')
        setMessage('Pais Editado correctamente')
        
      })
      .catch(() => {
        setOpenAlert(true)
        setTypeAlert('error')
        setMessage('Error, verifica los datos!')
        
      });
      
  };
  const handleSubmit = event => {
    event.preventDefault()
    //handleEdit();
  };
  const handleClose = () => {
    setOpen(false);
};
  const handleOnchangeName = e => {
    setname(e.target.value);
    console.log(setname);
  };
  const getCountry = id => {    
    setidCountry(id);
  };
  return (
    <Container maxWidth="sm" className={clases.container}>
      <Formik
        initialValues={{
          name: ''
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('name is required')
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
              <form className={clases.root}>
                <Typography color="textPrimary" variant="h1" align="center">
                  Editar Pais
                </Typography>
                <Box mb={3}>
                <SearchCountry  callback={getCountry} />
                
                  <Box my={2}>
                    <Button
                      color="primary"                      
                      fullWidth
                      size="large"   
                                    
                      variant="contained"                      
                      onClick={handleClickOpenEditCountry}
                    >
                      Editar
                    </Button>
                    <Dialog open={open} onSubmit={e => handleSubmit(e)} name={name} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Editar Pais</DialogTitle>
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

export default EditCountryView;