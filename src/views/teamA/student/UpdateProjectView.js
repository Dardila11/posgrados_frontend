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
import { registerProject, registerStudent } from './service';
import { AlertView } from 'src/components/Alert';
import { SearchKnowLedge } from 'src/views/teamd/Search/searchKnowLedge';
import {UpdateProjectService} from './service'
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBlockEnd: theme.spacing(3)
  }
}));


// TODO HACER EL CONSULTAR PROYECTO DEL ESTUDIANTE




const UpdateProjectView = () => {


  
  const [proyecto, setProyecto] = useState(
    {
      "id": 1,
      "provisional_title": "Cambio climatico",
      "objetive_topic": "Cambio climatico",
      "date_record": "2020-11-08T18:10:16.891707-05:00",
      "date_update": "2020-11-08T18:10:16.891764-05:00",
      "is_active": true,
      "investigation_line": 3,
      "student": 1
  }
  )
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [typeAlert, setTypeAlert] = useState('success');
  const [message, setMessage] = useState('');

  const [title, settitle] = useState(proyecto.provisional_title);
  const [objetive, setobjetive] = useState(proyecto.objetive_topic);

  const [line, setline] = useState(proyecto.investigation_line);
  const [student, setstudent] = useState(proyecto.student);
  const [area, setarea] = useState('');




  const getStudent = id => {
    setstudent(id);
  };

  const handleChangeTitle = e => {
    settitle(e);
  };
  const handleChangeObjective = e => {
    setobjetive(e);
  };
  const getLine = id => {
    setline(id);
  };
  const getArea = id => {
    console.log('este es el id del area', id);
    setarea(id);
  };

  const handleSubmitUpdate = e => {
    UpdateProjectService({
      "id": 1,
      provisional_title: title,
      objetive_topic: objetive,

      is_active: true,
      investigation_line: line,
      student: student
    })
      .then(result => {
        setOpen(true);
        setTypeAlert('success');
        setMessage('Proyecto creado correctamente');
      })

      .catch(() => {
        setOpen(true);
        setTypeAlert('error');
        setMessage('Proyecto creado incorrectamente');
      });
  };
  const handleSubmit = event => {
    event.preventDefault();
    handleSubmitUpdate();
  };

  return (
    <Page className={classes.root} title="Registrar proyecto de investigacion">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              title: proyecto.provisional_title,
              area: '',
              lineResearch: '',
              objetive: proyecto.objetive_topic
              //generalObjetive: '',
              //specificObjetive: ''
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().required('Titulo de la tesis requerido'),
              //area: Yup.string().required('Area de conocimiento requerida'),
              lineResearch: Yup.string().required(
                'Linea de investigacion requerida'
              ),
              objetive: Yup.string().required('Tema de la tesis requerido')
              // generalObjective: Yup.string().required('Objetivo general requerido'),
              // specificObjective: Yup.string().required('Objetivos especificos requeridos')
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
                        Actulizar proyecto de investigacion
                      </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                      >
                        Actualice su proyecto de investigacion
                      </Typography>
                    </Box>
                    {/* <SearchStudent callback={getStudent} /> */}
                    <TextField
                      error={Boolean(touched.title && errors.title)}
                      fullWidth
                      helperText={touched.title && errors.title}
                      label="Titulo tesis"
                      margin="normal"
                      name="title"
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e);
                        handleChangeTitle(e.target.value);
                      }}
                      value={values.title}
                      variant="outlined"
                    />

                    {/* <TextField
                    error={Boolean(touched.lineResearch && errors.lineResearch)}
                    fullWidth
                    helperText={touched.lineResearch && errors.lineResearch}
                    label="Linea de investigacion"
                    margin="normal"
                    name="lineResearch"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.lineResearch}
                    variant="outlined"
                  /> */}
                    <TextField
                      error={Boolean(touched.objetive && errors.objetive)}
                      fullWidth
                      helperText={touched.objetive && errors.objetive}
                      label="Tema de la tesis"
                      margin="normal"
                      name="objetive"
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e);
                        handleChangeObjective(e.target.value);
                      }}
                      value={values.objetive}
                      variant="outlined"
                    />
                    <SearchKnowLedge callback={getArea} />
                    <SearchLineLedge callback={getLine} idKnowLedge={area} />

                    {/* <TextField
                    error={Boolean(touched.generalObjective && errors.generalObjective)}
                    fullWidth
                    helperText={touched.generalObjective && errors.generalObjective}
                    label="Objetivo general"
                    margin="normal"
                    name="generalObjective"
                    multiline
                    rows={4}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.generalObjective}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.specificObjetive && errors.specificObjetive)}
                    fullWidth
                    helperText={touched.specificObjetive && errors.specificObjetive}
                    label="Objetivos especificos"
                    margin="normal"
                    name="specificObjective"
                    multiline
                    rows={4}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.specificObjetive}
                    variant="outlined"
                  /> */}

                    <Box my={2}>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Actualizar
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

export default UpdateProjectView;
