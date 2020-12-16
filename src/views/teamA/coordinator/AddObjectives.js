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

const AddObjectives = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [typeAlert, setTypeAlert] = useState('success');
  const [message, setMessage] = useState('');
  const [objetive, setobjetive] = useState('');

  const handleChangeObjective = e => {
    setobjetive(e);
  };
  const handleSubmitRegister = e => {
    registerSpecificObjective({
      objective_specifico: specificObjetive
    })
      .then(result => {
        setOpen(true);
        setTypeAlert('success');
        setMessage('Objetivo creado correctamente');
      })

      .catch(() => {
        setOpen(true);
        setTypeAlert('error');
        setMessage('Oops, algo salió mal!');
      });
    registerGeneralObjective({
      objective_general: generalObjective
    })
      .then(result => {
        setOpen(true);
        setTypeAlert('success');
        setMessage('Objetivo creado correctamente');
      })

      .catch(() => {
        setOpen(true);
        setTypeAlert('error');
        setMessage('Oops, algo salió mal!');
      });
  };
  const handleSubmit = event => {
    event.preventDefault();
    handleSubmitRegister();
  };

  return (
    <Page className={classes.root} title="Registrar objetivos">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              specificObjetive: '',
              generalObjective: ''
            }}
            validationSchema={Yup.object().shape({
              specificObjective: Yup.string().required(
                'Objetivos especificos requeridos'
              ),
              generalObjective: Yup.string().required('Objetivo general')
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

export default AddObjectives;
