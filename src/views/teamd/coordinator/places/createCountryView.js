import React, { useState } from 'react';
import { CreateCountryService } from './service';
import * as Yup from 'yup';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AlertView } from '../../../../components/Alert'
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
const CreateCountryView = () => {
  const [open, setOpen] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')
  const clases = useStyles();
  const [name, setname] = useState(' ');
  const handleCreate = () => {
    console.log(name)
    setOpen(false)
    CreateCountryService({
      name: name
    })
      .then(() => {
        setOpen(true)
        setTypeAlert('success')
        setMessage('Pais creado correctamente')
      })
      .catch(() => {
        setOpen(true)
        setTypeAlert('error')
        setMessage('Error, verifica los datos!')

      });
  };
  const handleSubmit = event => {
    event.preventDefault()
    handleCreate();
  };
  const handleOnchangeName = e => {
    setname(e.target.value);
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
                  Pais
                </Typography>
                <Box mb={3}>
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

                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Crear
                    </Button>
                  </Box>
                </Box>
              </form>
              
            </Box>
          </>
        )}
      </Formik>
      <AlertView open = {open}  typeAlert = {typeAlert} message = {message}/>
    </Container>
    
  );
};

export default CreateCountryView;
