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
import { registerProject } from './service';
import { registerGeneralObjective } from './service';
import { registerSpecificObjective } from './service';
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
  const [specificObjective, setSObjective] = useState('');
  const [generalObjective, setGObjective] = useState('');

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
  const handleChangeGObjective = e => {
    setGObjective(e);
  };
  const handleChangeSObjective = e => {
    setSObjective(e);
  };
  const getLine = id => {
    setline(id);
  };
  const getArea = id => {
    setarea(id);
  };

  const handleSubmitRegister = e => {
    registerProject({
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
        console.log(result);

        registerSpecificObjective({
          objetive_specifico: specificObjective,
          project: result.data.id
        }).then(result => {
          setOpen(true);
          setTypeAlert('success');
          setMessage('Objetivo creado correctamente');
        });
        registerGeneralObjective({
          objetive_general: generalObjective,
          project: result.data.id
        }).then(result => {
          setOpen(true);
          setTypeAlert('success');
          setMessage('Objetivo creado correctamente');
        });
      })

      .catch(() => {
        setOpen(true);
        setTypeAlert('error');
        setMessage('Proyecto creado incorrectamente');
      });
    setOpen(false);
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
              title: '',
              area: '',
              lineResearch: '',
              objetive: '',
              generalObjective: '',
              specificObjective: ''
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string()
                .required('Titulo de la tesis requerido')

                .min(12, 'Demasiado corto')
                .max(255, 'Demasiado largo'),
              //area: Yup.string().required('Area de conocimiento requerida'),
              lineResearch: Yup.string().required(
                'Linea de investigacion requerida'
              ),
              objetive: Yup.string()
                .required('Tema de la tesis requerido')

                .min(12, 'Demasiado corta')
                .max(255, 'Demasiado larga'),
              generalObjective: Yup.string()
                .required('Objetivo general requerido')
                .min(3, 'Demasiado corto')
                .max(255, 'Demasiado largo'),
              specificObjective: Yup.string()
                .required('Objetivos especificos requeridos')
                .min(3, 'Demasiado corto')
                .max(255, 'Demasiado largo')
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
                        Crear nuevo proyecto de investigacion
                      </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                      >
                        Cree su proyecto de investigacion
                      </Typography>
                    </Box>
                    <SearchStudent callback={getStudent} />
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
                      onChange={e => {
                        handleChange(e);
                        handleChangeGObjective(e.target.value);
                      }}
                      value={values.generalObjective}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(
                        touched.specificObjective && errors.specificObjective
                      )}
                      fullWidth
                      helperText={
                        touched.specificObjective && errors.specificObjective
                      }
                      label="Objetivos especificos"
                      margin="normal"
                      name="specificObjective"
                      multiline
                      rows={4}
                      onBlur={handleBlur}
                      onChange={e => {
                        handleChange(e);
                        handleChangeSObjective(e.target.value);
                      }}
                      value={values.specificObjective}
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
