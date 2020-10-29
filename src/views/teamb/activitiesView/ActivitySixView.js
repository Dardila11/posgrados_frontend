import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, TextField, makeStyles, Container, Divider } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import BreadCrumbs from 'src/views/teamb/activitiesView/BreadCrumbs';

const investigador = [
  { value: 'advert', label: 'Seleccione una opción' },
  { value: 'T1', label: 'Investigador-1' },
  { value: 'T2', label: 'Investigador-2' },
  { value: 'T3', label: 'Investigador-3' }
];

const lineaInvestigacion = [
  { value: 'advert', label: 'Seleccione una opción' },
  { value: 'T1', label: 'linea Investigacion-1' },
  { value: 'T2', label: 'linea Investigacion-2' },
  { value: 'T3', label: 'linea Investigacion-3' }
];

const tipo = [
  { value: 'advert', label: 'Seleccione una opción' },
  { value: 'T1', label: 'Interna' },
  { value: 'T2', label: 'Externa' },
];

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
    width: '70%',
    height: '950px',
    marginTop: '15px'
  },
  status: {
    color: 'green'
  }
}));

const ActivitySixView = ({ className, ...rest }) => {
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
    <div>
      <BreadCrumbs />
    <Container>
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form autoComplete="off" noValidate className={clsx(classes.root, className)} {...rest}>
        <Card className={classes.root}>
          <h1 style={{ display: 'flex', justifyContent: 'center' }}  align="center" name="crearactividad">
            Datos de detalle Participación en proyectos de investigación
          </h1>
          <br></br>
          <Divider/>
          <CardContent >
            <br></br>
            <Grid item md={12} xs={12}>
              <TextField fullWidth label="Nombre del proyecto" name="titulo" onChange={handleChange} required value={values.Titulo} 
                variant="outlined"
              />
              <br></br>
              <br></br>
              <TextField fullWidth label="Nombre investigador principal" name="descripcion" onChange={handleChange} required select
                SelectProps={{ native: true }} variant="outlined">
                {investigador.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <br></br>
              <br></br>
              <TextField fullWidth label="Lugar de trabajo" name="lugartrabajo" onChange={handleChange}  required value={values.Descripcion}
                variant="outlined"
              />
              <br></br>
              <br></br>
              <TextField fullWidth label="Descripción de actividad" name="descripcion" onChange={handleChange} required value={values.Descripcion}
                variant="outlined"
              />
              <br></br>
              <br></br>
              <TextField fullWidth label="Linea de investigacion" name="lineainvestigacion" onChange={handleChange} required select
                SelectProps={{ native: true }} variant="outlined">
                {lineaInvestigacion.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <br></br>
              <br></br>
              <TextField id="standard-number" label="Codigo VRI" type="number" InputLabelProps={{ shrink: true, }} variant="outlined" />
              <br></br>
              <br></br>
              <TextField fullWidth label="Convocatoria" name="convocatoria" onChange={handleChange} required value={values.Descripcion}
                variant="outlined"
              />
              <br></br>
              <br></br>
              <TextField fullWidth label="Tipo convocatoria" name="tipoconvocatoria" onChange={handleChange} required select
                SelectProps={{ native: true }} variant="outlined">
                {tipo.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <br></br>
              <br></br>
              <br></br>
              <Grid container spacing = {3} container justify="space-around">
                <Grid>
                  <TextField id="date" label="Fecha Inicio proyecto" type="date" defaultValue="2017-05-24"
                    className={classes.textField} InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid>
                  <TextField id="date" label="Fecha Fin proyecto" type="date" defaultValue="2017-05-24" 
                    className={classes.textField} InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            <br></br>
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
    </Container>
    </div>
  );
};

ActivitySixView.propTypes = {
  className: PropTypes.string
};

export default ActivitySixView;