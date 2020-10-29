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


const programa = [
  { value: 'advert', label: 'Seleccione una opción' },
  { value: 'T1', label: 'Programa-1' },
  { value: 'T2', label: 'Programa-2' },
  { value: 'T3', label: 'Programa-3' }
];

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
    width: '70%',
    height: '650px',
    marginTop: '15px'
  },
  status: {
    color: 'green'
  }
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
  // Costante para definir el estado de la ventana emergente de confirmación cuando se pulsa sobre el botón cancelar
  const [emergente, setEmergente] = React.useState(false);
  // Se modificó "handleClose" para que despliegue la ventana emergente
  const handleClose = () => {
    setEmergente(true);
  };
  // "handleNo" controla cuando se da click en el botón "NO" de la ventana emergente
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
              <h1 style={{ display: 'flex', align: 'center', justifyContent: 'center' }} align="center" name="crearactividad">
                Datos de detalle Curso, dirección/revisión de proyectos
          </h1>
              <br></br>
              <Divider />
              <CardContent >
                <br></br>
                <Grid item md={12} xs={12}>
                  <TextField fullWidth label="Titulo" name="titulo" onChange={handleChange} required value={values.Titulo} variant="outlined" />
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Descripcion" name="descripcion" onChange={handleChange} required value={values.Descripcion}
                    variant="outlined"
                  />
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Programa" name="programa" onChange={handleChange} required select SelectProps={{ native: true }}
                    variant="outlined"
                  >
                    {programa.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <br></br>
                  <br></br>
                  <br></br>
                  <Grid container spacing={3} container justify="space-around">
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
                  <br></br>
                  <TextField id="standard-number" label="Número de horas asignadas" type="number" InputLabelProps={{ shrink: true, }} variant="outlined" />
                  <br></br>
                  <br></br>
                  <Button color="primary" variant="outlined"> Justificante </Button>
                </Grid>
                <br></br>
              </CardContent>

              <Box display="flex" justifyContent="flex-end" p={2}>
                {/* Se le agrega la propiedad onClick para lanzar la ventana emergente de 
          confirmación cuando se pulsa sobre el botón cancelar, se debe quitar la propiedad RouterLink */}
                <Button onClick={handleClose} color="primary" variant="outlined">Cancelar</Button>

                <Button color="primary" variant="contained"> Guardar </Button>

                <Button color="primary" variant="contained"> Guardar y Enviar </Button>
              </Box>
            </Card>
          </form>
          {/*HTML que lanza la ventana emergente de confirmación cuando se pulsa sobre el botón cancelar 
        en "Crear Actividad" */}
          <Dialog open={emergente} onClose={handleNo}>
            <DialogTitle id="alert-dialog-title">{"¿Está seguro que desea cancelar?"}</DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
              <RouterLink to="../">
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
ActivityOneView.propTypes = {
  className: PropTypes.string
};
export default ActivityOneView;
