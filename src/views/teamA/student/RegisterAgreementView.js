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
import { registerAgreement } from './service';
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

const RegisterAgreementView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [typeAlert, setTypeAlert] = useState('success');
  const [message, setMessage] = useState('');

  const [observation, setobservation] = useState('');
  const [period, setperiod] = useState('');

  const [percentage, setpercentage] = useState('');
  const [student, setstudent] = useState('');
  const [agreementDate, setagreementDate] = useState('');
  const [long, setlong] = useState('');
  const [startDate, setstartDate] = useState('');
  const [endDate, setendDate] = useState('');

  const getStudent = id => {
    setstudent(id);
  };

  const handleChangeObservation = e => {
    setobservation(e);
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
  const handleChangePeriod = e => {
    setperiod(e);
  };
  const handleChangePercentage = e => {
    setpercentage(e);
  };
  const handleChangeAgreementDate = e => {
    setagreementDate(e);
  };

  const handleSubmitRegister = e => {
    registerAgreement({
      observation: observation,
      percentage_discount: percentage,

      is_active: true,
      period_academic: period,
      student: student,
      agreement_date: agreementDate,
      start_date: startDate,
      end_date: endDate,
      long: long
    })
      .then(result => {
        setOpen(true);
        setTypeAlert('success');
        setMessage('Convenio creado correctamente');
      })

      .catch(() => {
        setOpen(true);
        setTypeAlert('error');
        setMessage('Convenio creado incorrectamente');
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
              long: '',
              period: '',
              agreementDate: '',
              observation: '',
              startDate: '',
              endDate: ''
              //generalObjetive: '',
              //specificObjetive: ''
            }}
            validationSchema={Yup.object().shape({
              observation: Yup.string().required('Observaciones requerida'),
              //area: Yup.string().required('Area de conocimiento requerida'),
              period: Yup.string()
                .required('Periodo requerido'),
                
                agreementDate: Yup.number()
                .required('Año del acuerdo requerido')
                .positive(),
              percentage: Yup.number()
                .required('Porcentaje requerido')
                .positive(),
              startDate: Yup.date().required(
                'Debe ingresar la fecha de inicio'
              ),
              long: Yup.string().required('Seleccione la duración'),
              endDate: Yup.date()
                .required('Debe ingresar la fecha de finalización')
                .when(
                  'startDate',
                  (startDate, schema) =>
                    startDate &&
                    schema.min(
                      startDate,
                      'La fecha final debe ser posterior a la inicial'
                    )
                )

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
                        Crear nuevo Convenio
                      </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                      >
                        Los campos con * son obligatorios
                      </Typography>
                    </Box>
                    <SearchStudent callback={getStudent} />

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
                      error={Boolean(touched.period && errors.period)}
                      fullWidth
                      helperText={touched.period && errors.period}
                      label="Periodo academico (aaaa.semestre)"
                      margin="normal"
                      
                      name="period"
                      onBlur={handleBlur}
                      InputProps={{ inputProps: { min: 1, max: 2 } }}
                      onChange={e => {
                        handleChange(e);
                        handleChangePeriod(e.target.value);
                      }}
                      value={values.period}
                      variant="outlined"
                    />

                    <TextField
                      id="percentage"
                      label="Porcentaje de descuento"
                      variant="outlined"
                      type="number"
                      InputProps={{ inputProps: { min: 1, max: 100 } }}
                      margin="normal"
                      onChange={e => {
                        handleChange(e);
                        handleChangePercentage(e.target.value);
                      }}
                      error={Boolean(touched.percentage && errors.percentage)}
                      helperText={touched.percentage && errors.percentage}
                      onBlur={handleBlur}
                      value={values.percentage}
                      required
                      fullWidth
                    />
                    <TextField
                      id="long"
                      label="Tiempo duracion (meses)"
                      variant="outlined"
                      type="number"
                      margin="normal"
                      InputProps={{ inputProps: { min: 1, max: 100 } }}
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
                      id="agreementDate"
                      label="Año del acuerdo"
                      variant="outlined"
                      type="number"
                      margin="normal"
                      InputProps={{ inputProps: { min: 1990, max: 2100 } }}
                      onChange={e => {
                        handleChange(e);
                        handleChangeAgreementDate(e.target.value);
                      }}
                      error={Boolean(
                        touched.agreementDate && errors.agreementDate
                      )}
                      helperText={touched.agreementDate && errors.agreementDate}
                      onBlur={handleBlur}
                      value={values.agreementDate}
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
                    <TextField
                      error={Boolean(touched.observation && errors.observation)}
                      fullWidth
                      helperText={touched.observation && errors.observation}
                      label="Observaciones"
                      margin="normal"
                      name="observation"
                      onBlur={handleBlur}
                      multiline
                      onChange={e => {
                        handleChange(e);
                        handleChangeObservation(e.target.value);
                      }}
                      value={values.observation}
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

export default RegisterAgreementView;
