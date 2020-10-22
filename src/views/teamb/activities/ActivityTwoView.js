import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

const pais = [
  {
    value: 'advert',
    label: 'Colombia'
  },
  {
    value: 'T1',
    label: 'España'
  },
  {
    value: 'T2',
    label: 'Mexico'
  },
  {
    value: 'T3',
    label: 'USA'
  }
];

const ciudad = [
  {
    value: 'T1',
    label: 'Madrid'
  },
  {
    value: 'T2',
    label: 'Sevilla'
  },
  {
    value: 'T3',
    label: 'Barcelona'
  },
  {
    value: 'T4',
    label: 'Bilbao'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const ActivityTwoView = ({ className, ...rest }) => {
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
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card style={{ width: '40rem'  }}>
        <h1 style={{display: 'flex', justifyContent: 'center'}} name="crearactividad" >Datos de detalle ponencias en congreso, simposios y/o jornadas</h1>
        <CardContent >
        <br></br>
            
            <Grid 
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Titulo de la contribución"
                name="titulo"
                onChange={handleChange}
                required
                value={values.Titulo}
                variant="outlined"
              />
              <br></br>
              <br></br>
              <TextField
                fullWidth
                label="Descripcion general"
                name="descripcion"
                onChange={handleChange}
                required
                value={values.Descripcion}
                variant="outlined"
              />
              <br></br>
              <br></br>
              <TextField
                fullWidth
                label="Nombre del evento"
                name="nombreevento"
                onChange={handleChange}
                required
                value={values.Descripcion}
                variant="outlined"
              />
              <br></br>
              <br></br>
              <TextField
                fullWidth
                label="Entidad organizadora"
                name="entidadorganizadora"
                onChange={handleChange}
                required
                value={values.Descripcion}
                variant="outlined"
              />
              <br></br>
              <br></br>
              <label>Lugar de celebracion:</label>
              <br></br>
              <br></br>
              <TextField 
                fullWidth
                label="Pais"
                name="programa"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {pais.map((option) => (
                  <option 
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
              <br></br>
              <br></br>
              <TextField 
                fullWidth
                label="Ciudad"
                name="programa"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {ciudad.map((option) => (
                  <option 
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </TextField>
              <br></br>
              <br></br>
              <label>Fecha de realización:</label>
              <br></br>
              <br></br>
              <TextField
                id="FechaInicio"
                label="Fecha Inicio"
                type="FechaInicio"
                defaultValue="2020-02-02"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br></br>
              <br></br>
              <TextField
                id="FechaFin"
                label="Fecha Fin"
                type="FechaFin"
                defaultValue="2020-10-18"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <br></br>
              <br></br>
              
              <Button        
                color="primary"
                variant="outlined"
              >
              Justificante
              </Button>
            
            </Grid>
            <br></br>
        </CardContent>
        
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <RouterLink to = "../">
          <Button        
            color="primary"
            variant="outlined"
          >
            Cancelar
          </Button>
          </RouterLink>
          <Button
            color="primary"
            variant="contained"
          >
            Guardar
          </Button>

          <Button
            color="primary"
            variant="contained"
          >
            Guardar y Enviar
          </Button>
        </Box>
      </Card>
     
    </form>
    </div>
  );
  
};

ActivityTwoView.propTypes = {
  className: PropTypes.string
};

export default ActivityTwoView;
