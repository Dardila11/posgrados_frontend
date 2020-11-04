import React, { useState } from 'react';

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
//Import component search

import { SearchCountry } from 'src/views/teamd/Search/searchCountry';
// service

import { CreateDeparmentService } from './service';

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

const CreateDepartmentView = () => {
  const [open, setOpen] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')
  const clases = useStyles();
  const [name, setname] = useState(' ');
  const [idCountry, setidCountry] = useState('');

  const handleOnchangeName = e => {
    setname(e.target.value);
  };
  const handleCreate = () => {
    setOpen(false)
    CreateDeparmentService({
      name: name,
      country: idCountry
    })
      .then(() => {
        setOpen(true)
        setTypeAlert('success')
        setMessage('Departamento creado correctamente')
      })
      .catch(() => {
        setOpen(true)
        setTypeAlert('error')
        setMessage('Error, Verifica los datos!')
      });
  };
  const handleSubmit = event => {
    handleCreate();
    event.preventDefault();
  };

  const getCountry = id => {
    setidCountry(id);
  };

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
                  Departamento
                </Typography>
                <Box mb={3} id="box3">
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
                  <SearchCountry callback={getCountry} />

                  <Box my={2}>
                    <Button
                      color="primary"
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

export default CreateDepartmentView;
