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
import service from 'src/views/teamb/activities/service';
import { Grid, Select, TextField, MenuItem, InputLabel } from '@material-ui/core';
import { render } from 'nprogress';
const ObtPeriodo = new service();
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
  const refPeriodo = React.createRef();
  const [open, setOpen] = React.useState(false);
  const [activity, setActivity] = React.useState("");
  // Costante para definir el estado de la ventana emergente de confirmación cuando se pulsa sobre el botón cancelar
  const [emergente, setEmergente] = React.useState(false);
  const changeActivityType = (e) => { 
    setActivity(e) 
  }
  const [values, setValues] = useState({
  });
  const handleClickOpen = () => {
    ObtPeriodo.ObtPeriodoService({ "periodo": refPeriodo }).then((result) => {
      var periodoActual = result.data[0].periodo_matricula;
      var cadena = periodoActual.split(".");
      var añoAct = cadena[0];
      var semestre = cadena[1];
      
      var año1 = "";
      var año2 = "";
      var añoAcadActual = "";

      if( parseInt(semestre) > 1 ) {
        año1 = añoAct;
        año2 = añoAct.slice(2);
        parseInt(año2);
        año2++;
      }
      else {
        año2 = añoAct.slice(2);
        año1 = parseInt(añoAct);
        parseInt(año1);
        año1--;
      }
      añoAcadActual = año1 + "-" + año2
      document.getElementById("añoAcadActual").textContent = "Año academico actual " + añoAcadActual;
      
    }).catch(() => {
      alert("Error");
    });
    setOpen(true);
  };
  // Se modificó "handleClose" para que despliegue la ventana emergente
  const handleClose = () => {
    setEmergente(true);
  };

  // "handleSi" controla cuando se da click en el botón "SI" de la ventana emergente
  const handleSi = () => {
    setOpen(false);
    setEmergente(false);
  };
  // "handleNo" controla cuando se da click en el botón "NO" de la ventana emergente
  const handleNo = () => {
    setEmergente(false);
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}> CREAR ACTIVIDAD </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <br></br>
        <h1 style={{ display: 'flex', justifyContent: 'center' }}>Crear actividad</h1>
        <br></br>
        <InputLabel style={{ display: 'flex', justifyContent: 'center' }} id="añoAcadActual" title="añoAcadActual"> </InputLabel>
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
              <MenuItem value={'activitysix'}>participación en proyectos de investigación</MenuItem>
            </Select>
          </Grid>
          <br></br>
          <Grid item xs={12}>
            <TextField fullWidth label="Descripción" name="descripcion" onChange={handleChange} required value={values.Descripcion}
              variant="outlined" />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary"> Cancelar </Button>
          <RouterLink to={activity}> 
            <Button variant="contained" color="primary"> Datos de detalle </Button>
          </RouterLink>
        </DialogActions>
        </Dialog>
        {/*HTML que lanza la ventana emergente de confirmación cuando se pulsa sobre el botón cancelar 
        en "Crear Actividad" */}
        <Dialog
          open={emergente}
          onClose={handleNo}
        >
          <DialogTitle id="alert-dialog-title">{"¿Está seguro que desea cancelar?"}</DialogTitle>
          <DialogContent>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSi} color="primary">
              Si
            </Button>
            <Button onClick={handleNo} color="primary" autoFocus>
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