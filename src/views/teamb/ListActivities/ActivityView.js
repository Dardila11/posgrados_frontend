import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import service from 'src/views/teamb/services/service';
import { Grid, Select, TextField, MenuItem, InputLabel } from '@material-ui/core';

const objService = new service();
const styles = (theme) => ({
  root: { margin: 0, padding: theme.spacing(2) },
  closeButton: { position: 'absolute', right: theme.spacing(1), top: theme.spacing(1), color: theme.palette.grey[500] },
});
const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});
const DialogContent = withStyles((theme) => ({
  root: { padding: theme.spacing(2) },
}))(MuiDialogContent);
const DialogActions = withStyles((theme) => ({
  root: { margin: 0, padding: theme.spacing(1) },
}))(MuiDialogActions);

const ActivityView = ({ className, ...rest }) => {
  const [open, setOpen] = React.useState(false);
  const [activity, setActivity] = React.useState("");
  // Costante para definir el estado de la ventana emergente de confirmación cuando se pulsa sobre el botón cancelar
  const [emergenteCancelar, setEmergenteCancelar] = React.useState(false);
  //TODO: comentar
  const [EmergenteDatosDetalle, setEmergenteDatosDetalle] = React.useState(false);
  const changeActivityType = (e) => { 
    setActivity(e) 
  }
  //Agregamos el valor inicial a "descripcion"
  const [values, setValues] = useState({descripcion:''});
  //Constante para definir el estdo de "errorActivity"
  const [errorActivity, setErrorActivity] = useState(null);
  //Constante para definir el estdo de "errorDescripcion"
  const [errorDescripcion, setErrorDescripcion] = useState(null);
  const handleClickOpen = () => {
    objService.GetPeriodService().then((result) => { 
      var CurrentPeriod = result.data[0].periodo_matricula;
      var CurrentAcadYear = objService.GetCurrentYear(CurrentPeriod);
      document.getElementById("CurrentAcadYear").textContent = "Año academico actual " + CurrentAcadYear;
      
    }).catch(() => {
      alert("Error, no hay registros para mostrar");
    });
    setOpen(true);
  };
  // Se modificó "handleClose" para que despliegue la ventana emergente
  const handleClose = () => {
    setEmergenteCancelar(true);
  };

  // "handleCancelarSi" controla cuando se da click en el botón "SI" de la ventana emergente
  const handleCancelarSi = () => {
    setValues({descripcion:''});
    setActivity('');
    setErrorDescripcion('');
    setErrorActivity('');
    setOpen(false);
    setEmergenteCancelar(false);
  };
  // "handleCancelarNo" controla cuando se da click en el botón "NO" de la ventana emergente
  const handleCancelarNo = () => {
    setEmergenteCancelar(false);
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  //"handleDatosDetalle" para que despliegue la ventana emergente que pide confirmar la creacion de la actividad
  const handleDatosDetalle = () => {
     
    //Validamos que los campos tengan los datos correspondientes 
    if(values.descripcion.length){
      setErrorDescripcion(null)
    }
    else{
      setErrorDescripcion("El campo es obligatorio")
    }
    if(activity.length){
      setErrorActivity(null)
    }
    else{
      setErrorActivity("Seleccione una opción válida")
    }

    if(values.descripcion.length && activity.length){
      setEmergenteDatosDetalle(true);
    }   
  };

 
  // "handleCancelarNo" controla cuando se da click en el botón "NO" de la ventana emergente
  const handleDatosDetalleNo = () => {
    setEmergenteDatosDetalle(false);
  };

  const handleDetails = () => {
    
  }

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}> CREAR ACTIVIDAD </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <br></br>
        <h1 style={{ display: 'flex', justifyContent: 'center' }}>Crear actividad</h1>
        <br></br>
        <InputLabel style={{ display: 'flex', justifyContent: 'center' }} id="CurrentAcadYear" title="periodo">  </InputLabel>
        <br></br>
        <DialogContent dividers>
          <Grid item xs={12} >
            <InputLabel>Tipo de actividad:</InputLabel>
            <Select fullWidth label="Tipo de actividad" id="activity-type" variant="outlined" type="select" defaultValue={""}
              onChange={e => changeActivityType(e.target.value)}>
              <MenuItem value={'activityone'}>Curso, dirección/revisión de proyectos</MenuItem>
              <MenuItem value={'activitytwo'}>Ponencias en congresos, simposios y/o jornadas</MenuItem>
              <MenuItem value={'activitythree'}>Publicaciones</MenuItem>
              <MenuItem value={'activityfour'}>Exposición de resultados parciales de investigación</MenuItem>
              <MenuItem value={'activityfive'}>Estancias de investigación en otras instituciones</MenuItem>
              <MenuItem value={'activitysix'}>Participación en proyectos de investigación</MenuItem>
            </Select>
            {/* Se verifica el estado de "errorDescripcion" y se muestra el mensaje en caso de que 
              el usuario desee crear la actividad sin agregar la descripcion */} 
            {errorActivity ? <p style={{ display: 'flex', color:'red' }}>{errorActivity}</p> : null}
          </Grid>
          <br></br>
          <Grid item xs={12}>
            <TextField fullWidth label="Descripción" name="descripcion" onChange={handleChange} required value={values.descripcion}
              variant="outlined" />
              {/* Se verifica el estado de "errorDescripcion" y se muestra el mensaje en caso de que 
              el usuario desee crear la actividad sin agregar la descripcion */} 
            {errorDescripcion ? <p style={{ display: 'flex', color:'red' }}>{errorDescripcion}</p> : null} 
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary"> Cancelar </Button>
          {/*Todo: comentar*/}
          <Button onClick={handleDatosDetalle} variant="contained" color="primary"> Datos de detalle</Button>
        </DialogActions>
        </Dialog>
        {/*HTML que lanza la ventana emergente de confirmación cuando se pulsa sobre el botón cancelar 
        en "Crear Actividad" */}
        <Dialog open={emergenteCancelar} onClose={handleCancelarNo}>
          <DialogTitle id="alert-dialog-title">{"¿Está seguro que desea cancelar?"}</DialogTitle>
          <DialogContent>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelarSi} color="primary"> Si </Button>
            <Button onClick={handleCancelarNo} color="primary" autoFocus> No </Button>
          </DialogActions>
        </Dialog>
        {/*HTML que lanza la ventana emergente de confirmación cuando se pulsa sobre el botón "DATOS DE DETALLE" 
        en "Crear Actividad" */}
        <Dialog
          open={EmergenteDatosDetalle}
          onClose={handleDatosDetalleNo}
        >
          <DialogTitle id="alert-dialog-title">{"¿Esta seguro que desea crear la actividad?"}</DialogTitle>
          <DialogContent>
          </DialogContent>
          <DialogActions>
          <RouterLink to={activity}>
              <Button color="primary">
                Si
              </Button>
          </RouterLink>
            <Button onClick={handleDatosDetalleNo} color="primary" autoFocus>
              No
            </Button>
          </DialogActions>
        </Dialog>
    </div>
  );
};
ActivityView.propTypes = {
  className: PropTypes.string
};
export default ActivityView;