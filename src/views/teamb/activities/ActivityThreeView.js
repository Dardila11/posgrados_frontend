import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, TextField, makeStyles } from '@material-ui/core';
const tipo = [
  { value: 'advert', label: 'Tipo 1' },
  { value: 'T1', label: 'Tipo 2' },
  { value: 'T2', label: 'Tipo 3' },
  { value: 'T3', label: 'Tipo 4' }
];
const premios = [
  { value: 'T1', label: 'NO' },
  { value: 'T2', label: 'SI' }
];
const useStyles = makeStyles(() => ({
  root: {}
}));

const ActivityThreeView = ({ className, ...rest }) => {
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
    <div style={{display: 'flex', justifyContent: 'center'}}>
    <form autoComplete="off" noValidate className={clsx(classes.root, className)} {...rest}>
      <Card style={{ width: '40rem'  }}>
        <h1 style={{display: 'flex', justifyContent: 'center'}} name="crearactividad" >Datos de detalle Publicaciones</h1>
        <CardContent >
        <br></br>
            <Grid item md={12} xs={12}>
              <TextField fullWidth label="Nombre de publicación" name="nombre" onChange={handleChange} required
                value={values.Titulo} variant="outlined"
              />
              <br></br>
              <br></br>
              <TextField fullWidth label="Titulo del articulo, capitulo, libro, monografia..." name="descripcion"
                onChange={handleChange} required value={values.Descripcion} variant="outlined"
              />
              <br></br>
              <br></br>
              <TextField  fullWidth label="Tipo de publicación" name="programa" onChange={handleChange} required
                select SelectProps={{ native: true }} variant="outlined">
                {tipo.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <br></br>
              <br></br>
              <TextField fullWidth label="Nombre de la publicación o titulo del libro" name="descripcion" onChange={handleChange}
                required value={values.Descripcion} variant="outlined"
              />
              <br></br>
              <br></br>
              <TextField fullWidth label="Autores" name="descripcion" onChange={handleChange} required value={values.Descripcion}
                variant="outlined"
              />
              <br></br>
              <br></br>
              <TextField fullWidth label="Nombre de la editorial" name="descripcion" onChange={handleChange} required
                value={values.Descripcion} variant="outlined"
              />
              <br></br>
              <br></br>
              <TextField fullWidth label="Datos generales del tipo de publicación" name="descripcion" onChange={handleChange}
                required value={values.Descripcion} variant="outlined"
              />
              <br></br>
              <br></br>
              <TextField fullWidth label="Premios" name="programa" onChange={handleChange} required select
                SelectProps={{ native: true }} variant="outlined">
                {premios.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <br></br>
              <br></br>
              <TextField id="FechaInicio" label="Fecha de envío editorial" type="FechaInicio" defaultValue="2020-02-02"
                className={classes.textField} InputLabelProps={{ shrink: true}}
              />
              <br></br>
              <br></br>
              <TextField id="FechaFin" label="Fecha de publicación" type="FechaFin" defaultValue="2020-10-18"
                className={classes.textField} InputLabelProps={{ shrink: true }}
              />
              <br></br>
              <br></br>
              <Button color="primary" variant="outlined"> Justificante </Button>
            </Grid>
            <br></br>
        </CardContent>
        <Box display="flex" justifyContent="flex-end" p={2}>
          <RouterLink to = "../">
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
ActivityThreeView.propTypes = {
  className: PropTypes.string
};
export default ActivityThreeView;
