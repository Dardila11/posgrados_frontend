import React, { useState } from 'react';
import { CreateKnowLedgeService } from './service';
import * as Yup from 'yup';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Button, Container, TextField } from '@material-ui/core';

export const CreateKnowLedgeView = () => {
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const handleChangeTitle = e => {
    setTitle(e.target.value);
  };
  const handleChangeDescription = e => {
    setdescription(e.target.value);
  };
  const handleCreate = () => {
    console.log('title:', title);
    console.log(' description:', description);
    CreateKnowLedgeService({
      name: title,
      description: description
    })
      .then(() => {
        document.getElementById('alertArea').innerHTML =
          "<div class='alert alert-success' role='alert'>Area de conocimiento creada correctamente!</div>";
      })
      .catch(() => {
        document.getElementById('alertArea').innerHTML =
          "<div class='alert alert-danger' role='alert'>Error!.Verifica los datos!</div>";
      });
  };
  const handleSubmit = event => {
    handleCreate();
    event.preventDefault();
  };
  return (
    <Container maxWidth="sm">
      <Formik
        initialValues={{
          title: '',
          description: '',
          startDate: '',
          endDate: '',
          state: ''
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string()
            .max(255)
            .required('Title is required'),
          description: Yup.string()
            .max(255)
            .required('Description is required'),
          startDate: Yup.string()
            .max(255)
            .required('startDate is required'),
          endDate: Yup.string()
            .max(255)
            .required('endDate is required'),
          state: Yup.string()
            .max(255)
            .required('State is required')
        })}
        onSubmit={() => {}}
      >
        {({ errors, handleBlur, handleChange, touched, values }) => (
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
          >
            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <TextField
                  error={Boolean(touched.title && errors.title)}
                  fullWidth
                  helperText={touched.title && errors.title}
                  label="Title"
                  margin="normal"
                  name="title"
                  onBlur={handleBlur}
                  onChange={e => {
                    handleChangeTitle(e);
                    handleChange(e);
                  }}
                  type="text"
                  value={values.title}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.description && errors.description)}
                  fullWidth
                  helperText={touched.description && errors.description}
                  label="Descripcion"
                  margin="normal"
                  name="description"
                  onBlur={handleBlur}
                  onChange={e => {
                    handleChangeDescription(e);
                    handleChange(e);
                  }}
                  type="text"
                  value={values.description}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Agregar
                  </Button>
                </Box>
              </Box>
            </form>
            <div id="alertArea"></div>
          </Box>
        )}
      </Formik>
    </Container>
  );
};
