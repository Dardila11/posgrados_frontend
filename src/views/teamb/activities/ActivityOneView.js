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

const programa = [
  {
    value: 'advert',
    label: 'Seleccione una opción'
  },
  {
    value: 'T1',
    label: 'Programa-1'
  },
  {
    value: 'T2',
    label: 'Programa-2'
  },
  {
    value: 'T3',
    label: 'Programa-3'
  }
];

const horas = [
  {
    value: 'T1',
    label: '5'
  },
  {
    value: 'T2',
    label: '10'
  },
  {
    value: 'T3',
    label: '15'
  },
  {
    value: 'T4',
    label: '20'
  }
];

const useStyles = makeStyles(() => ({
  root: {}
}));

const ActivityOneView = ({ className, ...rest }) => {
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
        <h1 style={{display: 'flex', justifyContent: 'center'}} name="crearactividad" >Datos de detalle Curso, dirección/revisión de proyectos</h1>
        <CardContent >
        <br></br>
            
            <Grid 
              item
              md={12}
              xs={12}
            >
              <TextField
                fullWidth
                label="Titulo"
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
                label="Descripcion"
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
                label="Programa"
                name="programa"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {programa.map((option) => (
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
              <TextField 
                fullWidth
                label="Numero de horas asignadas"
                name="numero de horas asignadas"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                variant="outlined"
              >
                {horas.map((option) => (
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

ActivityOneView.propTypes = {
  className: PropTypes.string
};

export default ActivityOneView;
