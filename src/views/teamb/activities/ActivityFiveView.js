import React, { useState } from 'react';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardContent, Grid, TextField, makeStyles} from '@material-ui/core';
const pais = [
  { value: 'advert', label: 'Colombia' },
  { value: 'T1', label: 'España' },
  { value: 'T2', label: 'Mexico' },
  { value: 'T3', label: 'USA' }
];
const ciudad = [
  { value: 'T1', label: 'Madrid' },
  { value: 'T2', label: 'Sevilla' },
  { value: 'T3', label: 'Barcelona' },
  { value: 'T4', label: 'Bilbao' }
];

const useStyles = makeStyles(() => ({
  root: {},
  Container: {
    height: 100
},
SearchBar: {
    paddingTop: 0,
    paddingBottom: 2,
    height: 90,
    
},
Select:{
    alignItems: 'center' 
}
}));

const ActivityFiveView = ({ className, ...rest }) => {
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
          <h1 style={{ display: 'flex', justifyContent: 'center' }} name="crearactividad" >Datos de detalle estancias de investigación en otras instituciones</h1>
          <CardContent >
            <br></br>
            <Grid item md={12} xs={12}>
              <TextField fullWidth label="Proposito estancia" name="titulo" onChange={handleChange} required 
                value={values.Titulo} variant="outlined"
              />
              <br></br>
              <br></br>
              <TextField fullWidth label="Descripcion actividades desarrolladas" name="descripcion" onChange={handleChange}
                required value={values.Descripcion} variant="outlined"
              />
              <br></br>
              <br></br>
              <TextField fullWidth label="Pais de estancia" name="programa" onChange={handleChange} required select
                SelectProps={{ native: true }} variant="outlined">
                {pais.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <br></br>
              <br></br>
              <TextField fullWidth label="Ciudad de estancia" name="programa" onChange={handleChange} required select
                SelectProps={{ native: true }} variant="outlined">
                {ciudad.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <br></br>
              <br></br>
              <TextField fullWidth label="Nombre de institución" name="titulo" onChange={handleChange} required
                value={values.Titulo} variant="outlined"
              />
              <br></br>
              <br></br>
            <Grid container spacing = {3} container justify="space-around">
              <Grid>
                <TextField id="date" label="Fecha inicio estancia" type="date" defaultValue="2017-05-24"
                  className={classes.textField} InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid>
                <TextField id="date" label="Fecha fin estancia" type="date" defaultValue="2017-05-24" 
                  className={classes.textField} InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
              <br></br>
              <br></br>
              <TextField fullWidth label="Nombre responsable" name="titulo" onChange={handleChange} required
                value={values.Titulo} variant="outlined"
              />
              <br></br>
              <br></br>
              <Button color="primary" variant="outlined"> Justificante </Button>
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
ActivityFiveView.propTypes = {
  className: PropTypes.string
};
export default ActivityFiveView;
