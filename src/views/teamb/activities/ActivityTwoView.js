import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, TextField, makeStyles, InputLabel } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  const [emergente, setEmergente] = React.useState(false);
  const handleClose = () => {
    setEmergente(true);
  };
  const handleNo = () => {
    setEmergente(false);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form autoComplete="off" noValidate className={clsx(classes.root, className)} {...rest}>
        <Card style={{ width: '40rem' }}>
          <h1 style={{ display: 'flex', justifyContent: 'center' }} name="crearactividad">
            Datos de detalle ponencias en congreso, simposios y/o jornadas
          </h1>
          <CardContent >
            <br></br>
            <Grid item md={12} xs={12}>
              <TextField fullWidth label="Titulo de la contribución" name="titulo" onChange={handleChange} required value={values.Titulo} 
                variant="outlined"
              />
              <br></br>
              <br></br>
              <TextField fullWidth label="Descripcion general" name="descripcion" onChange={handleChange} required value={values.Descripcion}
                variant="outlined"
              />
              <br></br>
              <br></br>
              <TextField fullWidth label="Nombre del evento" name="nombreevento" onChange={handleChange} required value={values.Descripcion}
                variant="outlined"
              />
              <br></br>
              <br></br>
              <TextField fullWidth label="Entidad organizadora" name="entidadorganizadora" onChange={handleChange} required value={values.Descripcion}
                variant="outlined"
              />
              <br></br>
              <br></br>              
              <InputLabel>Lugar de celebracion:</InputLabel>
              <br></br>
              <br></br>
              <Grid container spacing = {2} container justify="space-around">
                <TextField label="Pais" name="pais" onChange={handleChange} required select SelectProps={{ native: true }}
                  variant="outlined"
                >
                  {pais.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
                <br></br>
                <br></br>
                <TextField label="Ciudad" name="ciudad" onChange={handleChange} required select SelectProps={{ native: true }}
                  variant="outlined"
                >
                  {ciudad.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <br></br>
              <br></br>
              <InputLabel>Fecha de realización:</InputLabel>
              <br></br>
              <br></br>
              <Grid container spacing = {2} container justify="space-around">
                <Grid>
                  <TextField id="date" label="Fecha inicio" type="date" defaultValue="2017-05-24"
                    className={classes.textField} InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid>
                  <TextField id="date" label="Fecha fin" type="date" defaultValue="2017-05-24" 
                    className={classes.textField} InputLabelProps={{ shrink: true }}
                  />
                </Grid>
            </Grid>
              <br></br>
              <br></br>
              <Button color="primary" variant="outlined"> Justificante </Button>
            </Grid>
            <br></br>
          </CardContent>

          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button onClick={handleClose} color="primary"variant="outlined">Cancelar</Button>

            <Button color="primary" variant="contained"> Guardar </Button>

            <Button color="primary" variant="contained"> Guardar y Enviar </Button>
          </Box>
        </Card>
      </form>
      <Dialog
        open={emergente}
        onClose={handleNo}
      >
        <DialogTitle id="alert-dialog-title">{"¿Está seguro que desea cancelar?"}</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
        <RouterLink to = "../"> 
            <Button color="primary">
              Si
            </Button>
        </RouterLink>
          <Button onClick={handleNo} color="primary" autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>  
    </div>
  );
};
ActivityTwoView.propTypes = {
  className: PropTypes.string
};
export default ActivityTwoView;
