import React, { useState } from 'react';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardContent, Grid, TextField, makeStyles, Container, Divider} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import BreadCrumbs from 'src/views/teamb/activitiesView/BreadCrumbs';

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

const institucion = [
  { value: 'T1', label: 'Institucion 1' },
  { value: 'T2', label: 'Institucion 2' },
  { value: 'T3', label: 'Institucion 3' },
  { value: 'T4', label: 'Institucion 4' }
];

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
    width: '70%',
    height: '790px',
    marginTop: '15px'
  }, 
  status: {
    color: 'green'
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
          <h1 style={{ display: 'flex', justifyContent: 'center' }} align="center" name="crearactividad" >Datos de detalle estancias de investigación en otras instituciones</h1>
          <br></br>
          <Divider/>
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
              <TextField fullWidth label="Nombre de la institucion" name="programa" onChange={handleChange} required select
                SelectProps={{ native: true }} variant="outlined">
                {institucion.map((option) => (
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
          
          <Box spacing = {3} display="flex" justifyContent="flex-end" p={2}>
            <Button onClick={handleClose} color="primary"variant="outlined">Cancelar</Button>
            <Button color="primary" variant="contained"> Guardar </Button>
            <Button color="primary" variant="contained"> Guardar y Enviar </Button>
          </Box>
          
        </Card>
      </form>
      <Dialog open={emergente} onClose={handleNo}>
        <DialogTitle id="alert-dialog-title">{"¿Está seguro que desea cancelar?"}</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
        <RouterLink to = "../"> 
            <Button color="primary"> Si </Button>
        </RouterLink>
          <Button onClick={handleNo} color="primary" autoFocus> No </Button>
        </DialogActions>
      </Dialog> 
    </div>
    </Container>
    </div>
  );
};
ActivityFiveView.propTypes = {
  className: PropTypes.string
};
export default ActivityFiveView;
