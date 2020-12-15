import React, { useState } from 'react';
import { CreateKnowLedgeService } from './service';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { AlertView } from '../../../../components/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Box,
  Button,
  Container,
  TextField,
  makeStyles,
  Typography,
  FormGroup
} from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import TitleRoundedIcon from '@material-ui/icons/TitleRounded';
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

export const CreateKnowLedgeView = () => {
  const [open, setOpen] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')


  const clases = useStyles();
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const handleChangeTitle = e => {
    setTitle(e.target.value);
  };
  const handleChangeDescription = e => {
    setdescription(e.target.value);
  };
  const handleCreate = () => {
    setOpen(false)
    CreateKnowLedgeService({
      name: title,
      description: description
    })
      .then(() => {
        setOpen(true)
        setTypeAlert('success')
        setMessage('Area de conocimiento creada correctamente')
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
    <Container maxWidth="sm" className={clases.root}>
      <Typography variant="h2" align="center">
      Area de conocimiento
      </Typography>
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
              <FormGroup>
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleRoundedIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </FormGroup>
                <FormGroup>
                <TextField
                  error={Boolean(touched.description && errors.description)}
                  fullWidth
                  multiline
                  rows={4}
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <DescriptionRoundedIcon />
                      </InputAdornment>
                    )
                  }}
                />
                </FormGroup>
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
            
          </Box>
        )}
      </Formik>
      <AlertView open = {open}  typeAlert = {typeAlert} message = {message}/>
    </Container>
  );
};
