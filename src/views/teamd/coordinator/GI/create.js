import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { SearchDeparmentI } from 'src/views/teamd/Search/searchDepartmentI';
import {
  Box,
  Button,
  Container,
  FormGroup,
  TextField,

} from '@material-ui/core';
import { CreateGIApi } from './service';

const CreateView = () => {
  const [name, setName] = useState(' ');
  const [email, setEmail] = useState('');
  const [departmentI, setDepartmentI] = useState('');
  const [dateFoundation, setDateFoundation] = useState('');
  const [category, setCategory] = useState('');
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangeDepartmentI = (result) => {
    setDepartmentI(result);
  };
  const handleChangeCategory = (e) => {
    setCategory(e.target.value);
  };
  const handleChangeDateFoundation = (e) => {
    setDateFoundation(e.target.value);
  };
  const handleCreate = () => {
    CreateGIApi({
      name : name,
      category : category,
      email : email,
      foundation_date: dateFoundation,
      department: departmentI,
    }).then(() => {
      document.getElementById('contenderGI').innerHTML = "<div class='alert alert-success' role='alert'>Grupo de investigacion creado correctamente!</div>";
    }).catch(() => {
      document.getElementById('contenderGI').innerHTML = "<div class='alert alert-danger' role='alert'>Error!.Verifica los datos!</div>";
    });
  };
  const handleSubmit = (event) => {
    handleCreate();
    event.preventDefault();
  };
  return (
    <Container maxWidth="sm">
      <Formik
        initialValues={{
          name: '',
          email: '',
          department: '',
          foundationDate: '',
          category: ''
        }}
        validationSchema={
                        Yup.object().shape({
                          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                          name: Yup.string().max(255).required('Name is required'),
                          department: Yup.string().max(255).required('department name is required'),
                          foundationDate: Yup.string().max(255).required('FoundationDate is required'),
                        })
                      }

        onSubmit={() => { }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          touched,
          values
        }) => (
          <>
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              alignItems="center"
            >
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <FormGroup>

                    <TextField
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      helperText={touched.name && errors.name}
                      label="Nombre"
                      name="name"
                      // margin="normal"
                      style={{ marginBottom: 10, marginTop: 10, width: 500 }}
                      onBlur={handleBlur}
                      onChange={(e) => { handleChange(e); handleChangeName(e); }}
                      type="text"
                      value={values.name}
                      variant="outlined"
                      required
                    />
                  </FormGroup>

                  <FormGroup>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email"
                      name="email"
                      // margin = "normal"
                      style={{ marginBottom: 10, marginTop: 10, width: 500 }}
                      onBlur={handleBlur}
                      onChange={(e) => { handleChange(e); handleChangeEmail(e); }}
                      type="email"
                      value={values.email}
                      variant="outlined"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <SearchDeparmentI callback={handleChangeDepartmentI} />
                  </FormGroup>

                  <FormGroup>
                    <InputLabel id="label-category">Categoria</InputLabel>
                    <Select
                      labelId="label-category select"
                      id="category-select"
                      value={category}
                      onChange={handleChangeCategory}
                      style={{ marginBottom: 10, marginTop: 10, width: 100 }}
                      required
                      fullWidth
                    >
                      <MenuItem value="A">A</MenuItem>
                      <MenuItem value="B">B</MenuItem>
                      <MenuItem value="C">C</MenuItem>
                    </Select>
                  </FormGroup>

                  <FormGroup>
                    <InputLabel id="label-date">Fecha fundación</InputLabel>
                    <TextField
                      id="dateGI"
                      type="date"
                      defaultValue="2020-01-01"
                      required
                      style={{ marginBottom: 10, marginTop: 10, width: 200 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onInputCapture={handleChangeDateFoundation}
                    />
                  </FormGroup>
                  <Box my={2}>
                    <Button
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      style={{ marginBottom: 10, marginTop: 10, width: 500 }}
                    >
                      Crear
                    </Button>
                  </Box>
                </Box>
              </form>
            </Box>
            <div id="contenderGI" />
          </>
        )}
      </Formik>
    </Container>

  );
};

export default CreateView;
