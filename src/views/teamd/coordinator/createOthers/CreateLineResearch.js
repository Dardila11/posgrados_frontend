import React, { useState } from 'react';
import { CreateLineRearchService } from './service';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { SearchKnowLedge } from 'src/views/teamd/Search/searchKnowLedge';
import { AlertView } from '../../../../components/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Box,
  Button,
  Container,
  TextField,
  makeStyles,
  Typography
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

export const CreateLineResearchView = () => {
  const [open, setOpen] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')

  const clases = useStyles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [knowLedge, setKnowLedge] = useState('');
  const handleCreate = () => {
    setOpen(false)
    CreateLineRearchService({
      name: title,
      description: description,
      know_area: knowLedge
    })
      .then(() => {
        setOpen(true)
        setTypeAlert('success')
        setMessage('Linea de investigación creada correctamente')
      })
      .catch(() => {
        setOpen(true)
        setTypeAlert('error')
        setMessage('Error, verifica los datos!')
      });
  };
  const handleChangeTitle = e => {
    setTitle(e.target.value);
  };
  const handleChangeDescription = e => {
    setDescription(e.target.value);
  };
  const handleChangeKnowLedge = id => {
    setKnowLedge(id);
  };
  const handleSubmit = event => {
    handleCreate();
    event.preventDefault();
  };
  return (
    <Container maxWidth="sm" className={clases.container}>
      <Formik
        initialValues={{
          title: '',
          description: ''
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string()
            .max(255)
            .required('Title is required'),
          description: Yup.string()
            .max(255)
            .required('Description is required'),
          KnowLedge: Yup.string()
            .max(255)
            .required('KnowLedge is required')
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
            <form onSubmit={handleSubmit} className={clases.root}>
              <Typography variant="h2" align="center">
                Linea de investigacion
              </Typography>
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
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TitleRoundedIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  error={Boolean(touched.description && errors.description)}
                  fullWidth
                  helperText={touched.description && errors.description}
                  multiline
                  rows={4}
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

                <SearchKnowLedge callback={handleChangeKnowLedge} />
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
            <AlertView open = {open}  typeAlert = {typeAlert} message = {message}/>
          </Box>
        )}
      </Formik>
    </Container>
  );
};
