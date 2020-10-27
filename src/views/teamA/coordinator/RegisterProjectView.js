import React from 'react';
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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterProjectView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page
      className={classes.root}
      title="Registrar proyecto de investigacion"
    >
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
              thesisTopic: '',
              generalObjetive: '',
              specificObjetive: ''
            }}
            validationSchema={
              Yup.object().shape({
                thesisTitle: Yup.string().required('Titulo de la tesis requerido'),
                area: Yup.string().required('Area de conocimiento requerida'),
                lineResearch: Yup.string().required('Linea de investigacion requerida'),
                thesisTopic: Yup.string().required('Tema de la tesis requerido'),
                generalObjective: Yup.string().required('Objetivo general requerido'),
                specificObjective: Yup.string().required('Objetivos especificos requeridos')
              })
            }
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
              <Card className = {classes.RegisterProjectView}>
                  <CardContent>
                <form onSubmit={handleSubmit}>
                  <Box mb={3}>
                    <Typography
                      color="textPrimary"
                      variant="h2"
                    >
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
                  <TextField
                    error={Boolean(touched.thesisTitle && errors.thesisTitle)}
                    fullWidth
                    helperText={touched.thesisTitle && errors.thesisTitle}
                    label="Titulo tesis"
                    margin="normal"
                    name="thesisTitle"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.thesisTitle}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(touched.area && errors.area)}
                    fullWidth
                    helperText={touched.area && errors.area}
                    label="Area de conocimiento"
                    margin="normal"
                    name="area"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.area}
                    variant="outlined"
                  />
                  <TextField
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
                  />
                  <TextField
                    error={Boolean(touched.thesisTopic && errors.thesisTopic)}
                    fullWidth
                    helperText={touched.thesisTopic && errors.thesisTopic}
                    label="Tema de la tesis"
                    margin="normal"
                    name="thesisTopic"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.thesisTopic}
                    variant="outlined"
                  />
                  <TextField
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
