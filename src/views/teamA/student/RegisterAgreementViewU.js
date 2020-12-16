import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { TextareaAutosize } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,

    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
const discountPercentageOpt = [
  {
    value: '10',
    label: '10%'
  },
  {
    value: '20',
    label: '20%'
  },
  {
    value: '30',
    label: '30%'
  },
  {
    value: '40',
    label: '40%'
  },
  {
    value: '50',
    label: '50%'
  },
  {
    value: '60',
    label: '60%'
  },
  {
    value: '70',
    label: '70%'
  },
  {
    value: '80',
    label: '80%'
  },
  {
    value: '90',
    label: '90%'
  },
  {
    value: '100',
    label: '100%'
  }
];

const agreementSemesterOpt = [
  {
    value: '1',
    label: 'I'
  },
  {
    value: '2',
    label: 'II'
  }
];

const agreementYearOpt = [
  {
    value: '2018',
    label: '2018'
  },
  {
    value: '2019',
    label: '2019'
  },
  {
    value: '2020',
    label: '2020'
  },
  {
    value: '2021',
    label: '2021'
  },
  {
    value: '2022',
    label: '2022'
  }
];

const RegisterAgreementViewU = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page className={classes.root} title="Registrar convenio">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="md">
          <Formik
            initialValues={{
              agreementNumber: '',
              agreementYear: '',
              agreementSemester: '',
              discountPercentage: '',
              description: '',
              document: ''
            }}
            validationSchema={Yup.object().shape({
              agreementNumber: Yup.number().required(
                'Debe ingresar un número para el convenio'
              ),
              description: Yup.string()
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
              <Card className={classes.RegisterAgreement}>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                      <Typography color="textPrimary" variant="h2">
                        Registrar convenio
                      </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                      >
                        Registre un convenio
                      </Typography>
                    </Box>
                    <TextField
                      error={Boolean(
                        touched.agreementNumber && errors.agreementNumber
                      )}
                      fullWidth
                      helperText={
                        touched.agreementNumber && errors.agreementNumber
                      }
                      label="Número de convenio"
                      margin="normal"
                      name="agreementNumber"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.agreementNumber}
                      variant="outlined"
                    />

                    <TextField
                      error={Boolean(
                        touched.institutionName && errors.institutionName
                      )}
                      fullWidth
                      helperText={
                        touched.institutionName && errors.institutionName
                      }
                      label="Nombre de la institución"
                      margin="normal"
                      name="institutionName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.institutionName}
                      variant="outlined"
                    />
                    <TextField
                      fullWidth
                      label="Año del acuerdo"
                      name="agreementYear"
                      margin="normal"
                      onChange={handleChange}
                      select
                      SelectProps={{ native: true }}
                      value={values.agreementYear}
                      variant="outlined"
                    >
                      {agreementYearOpt.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                    <TextField
                      fullWidth
                      label="Año del acuerdoPeriodo"
                      name="agreementSemester"
                      margin="normal"
                      onChange={handleChange}
                      select
                      SelectProps={{ native: true }}
                      value={values.agreementSemester}
                      variant="outlined"
                    >
                      {agreementSemesterOpt.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>

                    <TextField
                      fullWidth
                      label="Porcentaje de descuento: "
                      name="discountPercentage"
                      margin="normal"
                      onChange={handleChange}
                      select
                      SelectProps={{ native: true }}
                      value={values.discountPercentage}
                      variant="outlined"
                    >
                      {discountPercentageOpt.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>

                    <TextField
                      error={Boolean(touched.description && errors.description)}
                      fullWidth
                      helperText={touched.description && errors.description}
                      label="Descripción"
                      margin="normal"
                      name="description"
                      multiline
                      rows={4}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.description}
                      variant="outlined"
                    />
                    <FormLabel>Justificación: </FormLabel>
                    <Button variant="contained" component="label">
                      Explorar...
                      <input type="file" style={{ display: 'none' }} />
                    </Button>

                    <Box my={2}>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Regresar
                      </Button>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Crear
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

export default RegisterAgreementViewU;
