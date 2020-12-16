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
import { registerStudent } from './service';
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

const RegisterProjectView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [typeAlert, setTypeAlert] = useState('success');
  const [message, setMessage] = useState('');

  const [title, settitle] = useState('');
  const [objetive, setobjetive] = useState('');

  const [line, setline] = useState('');
  const [student, setstudent] = useState('');
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
    setarea(id);
  };

  const handleSubmitRegister = e => {
    console.log('entro');
    console.log('Datos ----');
    console.log(title);

    console.log('id del estudiante ', student);
    console.log('objetivo ', objetive);
    registerStudent({
      provisional_title: title,
      objetive_topic: objetive,
      date_record: '13-6-2020',
      date_update: '13-6-2020',
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
    handleSubmitRegister();
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
              thesisTitle: '',
              area: '',
              lineResearch: '',
              thesisTopic: ''
              //generalObjetive: '',
              //specificObjetive: ''
            }}
            validationSchema={Yup.object().shape({
              thesisTitle: Yup.string().required(
                'Titulo de la tesis requerido'
              ),
              //area: Yup.string().required('Area de conocimiento requerida'),
              lineResearch: Yup.string().required(
                'Linea de investigacion requerida'
              ),
              thesisTopic: Yup.string().required('Tema de la tesis requerido')
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
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <Card className={classes.RegisterProjectView}>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                      <Typography color="textPrimary" variant="h2">
                        Crear nuevo proyecto de investigación
                      </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                      >
                        Cree su proyecto de investigación
                      </Typography>
                    </Box>
                    <SearchStudent callback={getStudent} />
                    <TextField
                      error={Boolean(touched.title && errors.title)}
                      fullWidth
                      helperText={touched.title && errors.title}
                      label="Título provisional de la tesis"
                      margin="normal"
                      name="title"
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e);
                        handleChangeTitle(e);
                      }}
                      value={values.title}
                      variant="outlined"
                    />

                    <TextField
                      error={Boolean(touched.objetive && errors.objetive)}
                      fullWidth
                      helperText={touched.objetive && errors.objetive}
                      label="Tema objeto de la tesis"
                      margin="normal"
                      name="objetivo"
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e);
                        handleChangeObjective(e);
                      }}
                      value={values.objetive}
                      variant="outlined"
                    />
                    <SearchLineLedge callback={getLine} />
                    <SearchKnowLedge callback={getArea} />

                    <TextField
                      error={Boolean(
                        touched.generalObjective && errors.generalObjective
                      )}
                      fullWidth
                      helperText={
                        touched.generalObjective && errors.generalObjective
                      }
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
                      error={Boolean(
                        touched.specificObjetive && errors.specificObjetive
                      )}
                      fullWidth
                      helperText={
                        touched.specificObjetive && errors.specificObjetive
                      }
                      label="Objetivos especificos"
                      margin="normal"
                      name="specificObjective"
                      multiline
                      rows={4}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.specificObjetive}
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

export default RegisterProjectView;
