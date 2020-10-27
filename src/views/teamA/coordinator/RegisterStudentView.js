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
  Grid,
  Card,
  CardContent,
  InputLabel,
  Select,
  MenuItem,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { CenterFocusStrong, Height, BathtubRounded } from '@material-ui/icons';
import { unstable_batchedUpdates } from 'react-dom';
import './styles.css';

const typeDedications = [
  {
    value: 'exclusive',
    label: 'Exclusiva'
  },
  {
    value: 'partTime',
    label: 'Tiempo parcial'
  }
];
const states = [
  {
    value: 'active',
    label: 'Activo'
  },
  {
    value: 'inactive',
    label: 'Inactivo'
  },
  {
    value: 'retired',
    label: 'Retirado'
  },
  {
    value: 'graduade',
    label: 'Graduado'
  },
  {
    value: 'balanced',
    label: 'Puto inutil'
  }
];
const academicHelp = [
  {
    value: 'scholarship',
    label: 'Beca'
  },
  {
    value: 'Agreement',
    label: 'Convenio'
  },
  {
    value: 'none',
    label: 'Ninguno'
  }
];

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBlockEnd: theme.spacing(3)
  },
  BtmCreate: {
    paddingTop: 4,
    paddingBottom: 2,
    height: 90
  }
}));

const RegisterStudentView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page className={classes.root} title="Registrar estudiante">
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Container maxWidth="md">
          <Formik
            initialValues={{
              identification: '',
              code: '',
              names: '',
              lastnames: '',
              email: '',
              program: '',
              admissionDate: '',
              enrollmentDate: '',
              phone: '',
              address: '',
              academicTitle: '',
              institution: '',
              institutionCity: '',
              institutionCountry: '',
              provenanceDepartament: '',
              dedicationType: '',
              stateStudent: '',
              scholarshipAgreement: '',
              director: '',
              coDirectors: '',
              investigationGroup: ''
            }}
            validationSchema={Yup.object().shape({
              identification: Yup.string().required('Debe ingresar un código'),
              code: Yup.string().required('Debe ingresar un código'),
              names: Yup.string().required('Debe ingresar nombres'),
              lastnames: Yup.string().required('Debe ingresar apellidos'),
              email: Yup.string()
                .email('Debe ingresar un email válido')
                .max(255)
                .required('Debe ingresar un email'),
              program: Yup.string().required('Debe ingresar el programa'),
              admissionDate: Yup.date().required(
                'Debe ingresar una fecha de admisión'
              ),
              enrollmentDate: Yup.date().required(
                'Debe ingresar una fecha de matrícula'
              ),
              phone: Yup.number()
                .required('Debe ingresar un teléfono')
                .min(6, 'Ingrese un teléfonoc on mínimo 6 caracteres'),
              address: Yup.string().required('Debe ingresar una dirección'),
              dedicationType: Yup.string().required(
                'Debe seleccionar el tipo de dedicación'
              ),
              studentState: Yup.string().required(
                'Debe seleccionar el estado del estudiante'
              ),
              scholarshipAgreement: Yup.string().required(
                'Debe seleccionar si tiene una beca o convenio'
              ),
              director: Yup.string().required('Debe ingresar un director'),
              coDirectors: Yup.string().required('Debe ingresar un codirector'),
              investigationGroup: Yup.string().required(
                'Debe ingresar un grupo de investigación'
              )
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
              <Card className={classes.RegisterStudentView}>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                      <Typography color="textPrimary" variant="h2">
                        Registrar estudiante
                      </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                      >
                        Registre un nuevo estudiante
                      </Typography>
                    </Box>
                    <TextField
                      error={Boolean(
                        touched.identification && errors.identification
                      )}
                      fullWidth
                      helperText={
                        touched.identification && errors.identification
                      }
                      label="Identificación"
                      margin="normal"
                      name="identification"
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.identification}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.code && errors.code)}
                      fullWidth
                      helperText={touched.code && errors.code}
                      label="Código"
                      margin="normal"
                      name="code"
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.code}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.names && errors.names)}
                      fullWidth
                      helperText={touched.names && errors.names}
                      label="Nombres"
                      margin="normal"
                      name="names"
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.names}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.lastnames && errors.lastnames)}
                      fullWidth
                      helperText={touched.lastnames && errors.lastnames}
                      label="Apellidos"
                      margin="normal"
                      name="lastnames"
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastnames}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="E-mail"
                      margin="normal"
                      name="email"
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="outlined"
                    />
                    <Grid container spacing={3}>
                      <Grid item md={10}>
                        <TextField
                          error={Boolean(touched.program && errors.program)}
                          fullWidth
                          helperText={touched.program && errors.program}
                          label="Programa"
                          margin="normal"
                          name="program"
                          required
                          type="search"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.program}
                          variant="outlined"
                        />
                      </Grid>
                      <Box>
                        <Grid item xs={2}>
                          <Button
                            id="btAdd1"
                            classname={classes.BtmCreate}
                            color="primary"
                            variant="contained"
                            margin="normal"
                            direction="row"
                            size="large"
                            paddingTop="4px"
                          >
                            Crear
                          </Button>
                        </Grid>
                      </Box>
                    </Grid>
                    <TextField
                      error={Boolean(
                        touched.admissionDate && errors.admissionDate
                      )}
                      fullWidth
                      helperText={touched.admissionDate && errors.admissionDate}
                      id="date"
                      label="Fecha de adimisión"
                      margin="normal"
                      name="admissionDate"
                      type="date"
                      required
                      defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.admissionDate}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(
                        touched.enrollmentDate && errors.enrollmentDate
                      )}
                      fullWidth
                      helperText={
                        touched.enrollmentDate && errors.enrollmentDate
                      }
                      id="date"
                      label="Fecha de matricula"
                      margin="normal"
                      name="enrollmentDate"
                      type="date"
                      required
                      defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.enrollmentDate}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.phone && errors.phone)}
                      fullWidth
                      helperText={touched.phone && errors.phone}
                      label="Teléfono"
                      margin="normal"
                      name="phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="number"
                      value={values.phone}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.address && errors.address)}
                      fullWidth
                      helperText={touched.address && errors.address}
                      label="Dirección"
                      margin="normal"
                      name="address"
                      required
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.address}
                      variant="outlined"
                    />

                    <TextField
                      fullWidth
                      label="Tipo dedicación"
                      name="dedicationType"
                      onChange={handleChange}
                      required
                      select
                      margin="normal"
                      required
                      SelectProps={{ native: true }}
                      value={values.state}
                      variant="outlined"
                    >
                      {typeDedications.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth
                      label="Estado"
                      name="state"
                      margin="normal"
                      onChange={handleChange}
                      required
                      select
                      SelectProps={{ native: true }}
                      value={values.state}
                      variant="outlined"
                    >
                      {states.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth
                      label="Ayuda"
                      name="scholarshipAgreement"
                      margin="normal"
                      onChange={handleChange}
                      select
                      SelectProps={{ native: true }}
                      value={values.scholarshipAgreement}
                      variant="outlined"
                    >
                      {academicHelp.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                    <Grid container spacing={1}>
                      <Grid item md={10} xs={2}>
                        <TextField
                          error={Boolean(touched.director && errors.director)}
                          fullWidth
                          helperText={touched.director && errors.director}
                          label="Director"
                          margin="normal"
                          name="director"
                          type="search"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.director}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={10} xs={2}>
                        <Box className={classes.BtmCreate}>
                          <Button
                            color="primary"
                            variant="contained"
                            id="btAdd"
                          >
                            Crear
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={10}>
                        <TextField
                          error={Boolean(
                            touched.coDirectors && errors.coDirectors
                          )}
                          fullWidth
                          helperText={touched.coDirectors && errors.coDirectors}
                          label="Co-Directores"
                          margin="normal"
                          name="coDirectors"
                          type="search"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.coDirectors}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          id="btAdd"
                          color="primary"
                          variant="contained"
                          margin="normal"
                          direction="row"
                          justify="right"
                        >
                          Crear
                        </Button>
                      </Grid>
                    </Grid>
                    <Grid container spacing={1}>
                      <Grid item xs={10}>
                        <TextField
                          error={Boolean(
                            touched.investigationGroup &&
                              errors.investigationGroup
                          )}
                          fullWidth
                          helperText={
                            touched.investigationGroup &&
                            errors.investigationGroup
                          }
                          label="Grupo de investigacion"
                          margin="normal"
                          name="investigationGroup"
                          type="search"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.investigationGroup}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          id="btAdd"
                          color="primary"
                          variant="contained"
                          margin="normal"
                          direction="row"
                          justify="right"
                        >
                          Crear
                        </Button>
                      </Grid>
                    </Grid>

                    <Box my={2}>
                      <Button
                        id="btAdd"
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

export default RegisterStudentView;
