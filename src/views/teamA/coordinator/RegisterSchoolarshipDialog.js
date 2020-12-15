import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { TextareaAutosize } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Page from 'src/components/Page';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { FormLabel } from '@material-ui/core';
import './styles.css';

import {
  Box,
  Button,
  Grid,
  DialogActions,
  Container,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    paddingBottom: theme.spacing(3)
  }
}));
const institutionTypeOpt = [
  {
    value: 'public',
    label: 'Pública'
  },
  {
    value: 'private',
    label: 'Privada'
  }
];

const institutionLocationOpt = [
  {
    value: 'national',
    label: 'Nacional'
  },
  {
    value: 'foreigner',
    label: 'Extranjera'
  }
];

const RegisterSchoolarshipDialog = props => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <h1> {props.title} </h1>

      <Formik
        initialValues={{
          name: '',
          convocatoryNumber: '',
          description: '',
          institutionName: '',
          institutionType: '',
          institutionLocation: '',
          startDate: '',
          endDate: '',
          resolutionNumber: '',
          document: ''
        }}
        validationSchema={Yup.object().shape({
          tname: Yup.string().required('Debe ingresar un nombre para la beca'),
          convocatoryNumber: Yup.number().required(
            'Debe ingresar un número para la convocatoria'
          ),
          description: Yup.string(),
          institutionName: Yup.string().required(
            'Debe ingresar el nombre de la institución'
          ),
          institutionType: Yup.string().required(
            'Debe seleccionar el tipo de la institución'
          ),
          startDate: Yup.date().required('Debe ingresar la fecha de inicio'),
          endDate: Yup.date().required(
            'Debe ingresar la fecha de finalización'
          ),
          resolutionNumber: Yup.string().required(
            'Debe ingresar el npumero de resolución'
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
          <form className={classes.root} onSubmit={handleSubmit}>
            <TextField
              error={Boolean(touched.name && errors.name)}
              fullWidth
              helperText={touched.name && errors.name}
              label="Nombre"
              margin="normal"
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              variant="outlined"
            />
            <TextField
              error={Boolean(
                touched.convocatoryNumber && errors.convocatoryNumber
              )}
              fullWidth
              helperText={touched.convocatoryNumber && errors.convocatoryNumber}
              label="Número de convocatoria"
              margin="normal"
              name="convocatoryNumber"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.convocatoryNumber}
              variant="outlined"
            />

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
            <TextField
              error={Boolean(touched.institutionName && errors.institutionName)}
              fullWidth
              helperText={touched.institutionName && errors.institutionName}
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
              label="Tipo de institución"
              name="institutionType"
              margin="normal"
              onChange={handleChange}
              select
              SelectProps={{ native: true }}
              value={values.institutionType}
              variant="outlined"
            >
              {institutionTypeOpt.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="Localización de institución"
              name="institutionLocation"
              margin="normal"
              onChange={handleChange}
              select
              SelectProps={{ native: true }}
              value={values.institutionLocation}
              variant="outlined"
            >
              {institutionLocationOpt.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
            <TextField
              error={Boolean(touched.startDate && errors.startDate)}
              fullWidth
              helperText={touched.startDate && errors.startDate}
              id="date"
              label="Fecha de inicio"
              margin="normal"
              name="startDate"
              type="date"
              required
              defaultValue="2020-10-19"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.startDate}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.endDate && errors.endDate)}
              fullWidth
              helperText={touched.startDate && errors.endDate}
              id="date"
              label="Fecha de finalización"
              margin="normal"
              name="endDate"
              type="date"
              required
              defaultValue="2020-10-19"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.endDate}
              variant="outlined"
            />
            <TextField
              error={Boolean(
                touched.resolutionNumber && errors.resolutionNumber
              )}
              fullWidth
              helperText={touched.resolutionNumber && errors.resolutionNumber}
              label="Número de resolución:"
              margin="normal"
              name="resolutionNumber"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.resolutionNumber}
              variant="outlined"
            />
            <FormLabel>Justificación: </FormLabel>
            <Button
              variant="contained"
              component="label"
              id="mg-left"
              startIcon={<CloudUploadIcon />}
            >
              Explorar...
              <input type="file" style={{ display: 'none' }} />
            </Button>
          </form>
        )}
      </Formik>
      <DialogActions>
        <Button variant="contained" color="primary">
          Registrar
        </Button>
      </DialogActions>
    </>
  );
};

export default RegisterSchoolarshipDialog;
