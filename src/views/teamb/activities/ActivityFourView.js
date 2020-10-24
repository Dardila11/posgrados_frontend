import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, TextField, makeStyles, InputLabel } from '@material-ui/core';

const pais = [
  { value: 'advert', label: 'España'},
  { value: 'T1', label: 'Colombia'},
  { value: 'T2', label: 'Mexico'},
  { value: 'T3', label: 'USA'}
];
const ciudad = [
  { value: 'T1', label: 'Madrid'},
  { value: 'T2', label: 'Sevilla' },
  { value: 'T3', label: 'Barcelona'},
  { value: 'T4', label: 'Bilbao'}
];
const modalidad = [
  { value: 'T1', label: 'Presencial'},
  { value: 'T2', label: 'Virtual'}
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const ActivityFourView = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form autoComplete="off" noValidate className={clsx(classes.root, className)} {...rest}>
        <Card style={{ width: '40rem' }}>
          <h1 style={{ display: 'flex', justifyContent: 'center' }} name="crearactividad" >Datos de detalle exposición de resultados parciales de investigación</h1>
          <CardContent >
            <br></br>
            <Grid container spacing = {3}>
            <Grid item md={12} xs={12}>
              <TextField fullWidth label="Descripcion" name="descripcion" onChange={handleChange} required
                value={values.Descripcion} variant="outlined"
              />
              <br></br>
              <br></br>
              <TextField id="FechaInicio" label="Fecha de exposición" type="FechaInicio" defaultValue="2020-02-02"
                className={classes.textField} InputLabelProps={{ shrink: true }}
              />
              
              <br></br>
              <br></br>
              <InputLabel>Lugar de exposición</InputLabel>
              <br></br>
              <br></br>
              <TextField fullWidth label="Pais" name="programa" onChange={handleChange} required select 
                SelectProps={{ native: true }} variant="outlined">
                {pais.map((option) => (
                  <option key={option.value} value={option.value}> 
                    {option.label}
                  </option>
                ))}
              </TextField>
              <br></br>
              <br></br>
              <TextField fullWidth label="Ciudad" name="programa" onChange={handleChange} required select
                SelectProps={{ native: true }} variant="outlined">
                {ciudad.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <br></br>
              <br></br>
              <TextField fullWidth label="Nombre del evento" name="descripcion" onChange={handleChange} required
                value={values.Descripcion} variant="outlined"/>
              <br></br>
              <br></br>
              <TextField fullWidth label="Modalidad de presentación" name="numero de horas asignadas" onChange={handleChange} 
                required select SelectProps={{ native: true }} variant="outlined">
                {modalidad.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <br></br>
              <br></br>
              <TextField fullWidth label="Duración en horas" name="descripcion" onChange={handleChange} required
                value={values.Descripcion} variant="outlined"/>
              
              <br></br>
              <br></br>
              <Button color="primary" variant="outlined"> Justificante </Button>
            </Grid>
            </Grid>
            <br></br>
          </CardContent>
          <Box display="flex" justifyContent="flex-end" p={2}>
            <RouterLink to="../">
              <Button color="primary" variant="outlined"> Cancelar </Button>
            </RouterLink>
            <Button color="primary" variant="contained"> Guardar </Button>
            <Button color="primary" variant="contained"> Guardar y Enviar </Button>
          </Box>
        </Card>
      </form>
    </div>
  );
};
ActivityFourView.propTypes = {
  className: PropTypes.string
};
export default ActivityFourView;
