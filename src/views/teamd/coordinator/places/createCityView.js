import React, { useState } from 'react';
import { CreateCityService } from './service';
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

const CreateCityView = () => {
  const [open, setOpen] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')
  const clases = useStyles();
  const [name, setname] = useState(' ');
  const [idDepartment, setidDdepartment] = useState(' ');
  const [idCountry, setidCountry] = useState(' ');

  const setCountry = id => {
    setidCountry(id);
  };

  const getDepartment = id => {
    console.log('el departamento es  ', id);
    setidDdepartment(id);
  };

  const handleOnchangeName = e => {
    setname(e.target.value);
  };

  const handleCreate = () => {
    setOpen(false)
    CreateCityService({
      name: name,
      state: idDepartment
    })
      .then(() => {
        setOpen(true)
        setTypeAlert('success')
        setMessage('Ciudad creada correctamente')
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
                  Ciudad
                </Typography>
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
                  callback={getDepartment}
                />
                <Button
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Crear
                </Button>
              </form>
            </Box>
          </>
        )}
      </Formik>
      <AlertView open = {open}  typeAlert = {typeAlert} message = {message}/>
    </Container>
    
  );
};
export default CreateCityView;
