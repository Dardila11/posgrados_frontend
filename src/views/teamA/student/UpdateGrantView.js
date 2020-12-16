import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { SearchStudent } from '../search/searchStudent';
import { SearchLineLedge } from 'src/views/teamd/Search/searchLineResearch';
import { registerGrant } from './service';
import { AlertView } from 'src/components/Alert';
import { SearchKnowLedge } from 'src/views/teamd/Search/searchKnowLedge';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBlockEnd: theme.spacing(3)
  }
}));

const RegisterGrantView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [typeAlert, setTypeAlert] = useState('success');
  const [message, setMessage] = useState('');

  const [name, setname] = useState('');
  const [announcement, setannouncement] = useState('');

  const [description, setdescription] = useState('');
  const [student, setstudent] = useState('');
  const [resolution, setresolution] = useState('');
  const [long, setlong] = useState('');
  const [startDate, setstartDate] = useState('');
  const [endDate, setendDate] = useState('');

  const getStudent = id => {
    setstudent(id);
  };

  const handleChangeName = e => {
    setname(e);
  };
  const handleChangeDescription = e => {
    setdescription(e);
  };

  const handleChangeResolution = e => {
    setresolution(e);
  };
  const handleChangeAnnouncement = e => {
    setannouncement(e);
  };
  const handleChangeStartDate = e => {
    setstartDate(e);
  };
  const handleChangeEndDate = e => {
    setendDate(e);
  };
  const handleChangeLong = e => {
    setlong(e);
  };

  const handleSubmitRegister = e => {
    registerGrant({
      name: name,
      announcement: announcement,

      is_active: true,
      description: description,
      num_resolution: resolution,
      student: student,
      start_date: startDate,
      end_date: endDate,
      long: long
    })
      .then(result => {
        setOpen(true);
        setTypeAlert('success');
        setMessage('Beca creada correctamente');
      })

      .catch(() => {
        setOpen(true);
        setTypeAlert('error');
        setMessage('No se pudo crear la beca ');
      });
  };
  const handleSubmit = event => {
    event.preventDefault();
    handleSubmitRegister();
  };

  return (
    <Page className={classes.root} title="Registrar beca">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              name: '',
              description: '',
              startDate: '',
              endDate: '',
              long: '',
              announcement:'',
              resolution:'',
           
            }}
            validationSchema={Yup.object().shape({
              
              name: Yup.string().required('Nombre de la beca requerida'),
              description: Yup.string().required('Descripción de la beca requerida'),
              startDate :Yup.string().required('Fecha de inicio requerida'),
              endDate :Yup.string().required('Fecha de fin requerida'),
              long :Yup.string().required('Tiempo de duración requerido'),
              announcement :Yup.string().required('Numero de convocatoria requerdo'),
              resolution :Yup.string().required('Numero de resolución requerido'),

            })}
            onSubmit={() => {
              navigate('/app/dashboard', { replace: true });
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
              <Card className={classes.RegisterProjectView}>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                      <Typography color="textPrimary" variant="h2">
                        Crear nueva beca
                      </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                      >
                        Los campos con * son obligatorios
                      </Typography>
                    </Box>
                    {/* <SearchStudent callback={getStudent} /> */}

                    
                    <TextField
                      error={Boolean(touched.name && errors.name)}
                      fullWidth
                      helperText={touched.name && errors.name}
                      label="Nombre"
                      margin="normal"
                      name="name"
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e);
                        handleChangeName(e.target.value);
                      }}
                      value={values.name}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(
                        touched.announcement && errors.announcement
                      )}
                      fullWidth
                      helperText={touched.announcement && errors.announcement}
                      label="Numero convocatoria"
                      margin="normal"
                      type='number'
                      name="announcement"
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e);
                        handleChangeAnnouncement(e.target.value);
                      }}
                      value={values.announcement}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.description && errors.description)}
                      fullWidth
                      helperText={touched.description && errors.description}
                      label="Descripción"
                      margin="normal"
                      name="description"
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e);
                        handleChangeDescription(e.target.value);
                      }}
                      value={values.description}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.resolution && errors.resolution)}
                      fullWidth
                      helperText={touched.resolution && errors.resolution}
                      label="Numero de resolución"
                      margin="normal"
                      typer="number"
                      name="resolution"
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e);
                        handleChangeResolution(e.target.value);
                      }}
                      value={values.resolution}
                      variant="outlined"
                    />
                    <TextField
                      id="long"
                      label="Tiempo duracion (meses)"
                      variant="outlined"
                      type="number"
                      margin="normal"
                      onChange={e => {
                        handleChange(e);
                        handleChangeLong(e.target.value);
                      }}
                      error={Boolean(touched.long && errors.long)}
                      helperText={touched.long && errors.long}
                      onBlur={handleBlur}
                      value={values.long}
                      required
                      fullWidth
                    />
                    <TextField
                      error={Boolean(touched.startDate && errors.startDate)}
                      fullWidth
                      helperText={touched.startDate && errors.startDate}
                      id="agreementDate"
                      label="Fecha de inicio"
                      margin="normal"
                      name="startDate"
                      type="date"
                      required
                      defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                      onBlur={handleBlur}
                      onChangeCapture={e => {
                        handleChangeStartDate(e.target.value);
                        handleChange(e);
                      }}
                      value={values.startDate}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.endDate && errors.endDate)}
                      fullWidth
                      helperText={touched.endDate && errors.endDate}
                      id="endDate"
                      label="Fecha de fin"
                      margin="normal"
                      name="endDate"
                      type="date"
                      required
                      defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                      onBlur={handleBlur}
                      onChangeCapture={e => {
                        handleChangeEndDate(e.target.value);
                        handleChange(e);
                      }}
                      value={values.endDate}
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
                        Registrar
                      </Button>
                    </Box>
                  </form>
                  <AlertView
                    open={open}
                    typeAlert={typeAlert}
                    message={message}
                  />
                </CardContent>
              </Card>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterGrantView;
