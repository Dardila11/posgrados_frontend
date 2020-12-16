import React, { useState } from 'react';
import { ReportService } from './service';
import * as Yup from 'yup';
import { Formik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  root: {
    background: 'white',
    border: 1,
    borderRadius: 3,
    boxShadow: '-1px 8px 36px 4px rgba(158,158,158,1)',
    paddingTop: '30px',
    paddingLeft: '50px',
    paddingRight: '50px',
    paddingBottom: '40px'
  },
  container: {
    marginTop: '30px'
  }
});
const GenerateReportView = () => {
 
  const clases = useStyles();
  const [year, setyear] = useState(' ');
  const [type, setType] = useState(' ');

  const handleCreate = () => {
    
    ReportService({
      year: year,      
      type: type
    })
      .then(() => {
        let url = `https://mdquilindo.pythonanywhere.com/api/1.0/report/${year}/${type}`;
        console.log(url)
        window.open (url,'reporte',"directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=400, height=400");
      })
      .catch(() => {
       
      });
  };
  const handleSubmit = event => {
    event.preventDefault()
    handleCreate();
  };
  const handleOnchangeyear = e => {
    setyear(e.target.value);
  };
  const handleOnchangetype = e => {
    setType(e.target.value);
  };
  return (
    <Container maxWidth="sm" className={clases.container}>
      <Formik
        initialValues={{
          year: ''
        }}
        validationSchema={Yup.object().shape({
          year: Yup.string()
            .max(255)
            .required('year is required')
        })}
        onSubmit={() => {
          return 1;
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
          <>
            <Box
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="center"
            >
              <form onSubmit={e => handleSubmit(e)} className={clases.root}>
                <Typography color="textPrimary" variant="h1" align="center">
                  Generar Reporte por año de Ingreso
                </Typography>
                <Box mb={3}>
                  <TextField
                    error={Boolean(touched.year && errors.year)}
                    fullWidth
                    helperText={touched.year && errors.year}
                    label="Año de Ingreso"
                    margin="normal"
                    name="year"
                    onChange={e => {
                      handleOnchangeyear(e);
                      handleChange(e);
                    }}
                    onBlur={handleBlur}
                    type="text"
                    value={values.year}
                    variant="outlined"
                  />

                  <Select 
                    id="Select-cohorte"
                    onChange={handleOnchangetype}>
                                            
                      <MenuItem value={1}>Excel</MenuItem>
                      <MenuItem value={2}>Pdf</MenuItem>
                      
                  </Select>

                  <Box my={2}>
                    <Button
                      color="primary"
                      disabled={isSubmitting}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Generar Reporte
                    </Button>
                  </Box>
                </Box>
              </form>
              
            </Box>
          </>
        )}
      </Formik>
      
    </Container>
    
  );
};

export default GenerateReportView;
