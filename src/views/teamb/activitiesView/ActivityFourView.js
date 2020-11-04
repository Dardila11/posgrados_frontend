import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, TextField, makeStyles, InputLabel, Container, Typography, Divider } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import BreadCrumbs from 'src/views/teamb/activitiesView/BreadCrumbs';
import util from '../services/util';
import service from '../services/service';

import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

//Transición  de la ventana emergente que muestra 
//el resultado de enviar los datos del formulario al backend
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const objService = new service();
const objUtil = new util();

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
    width: '70%',
    marginTop: '15px'
  },
  status: {
    color: 'green'
  }
}));

const ActivityFourView = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    descripcion:'',
    fechaExposicion: '',
    lugarCelebracion:'', 
    nombreEvento:'', 
	  modalidad:'',
    duracionSeleccionada:0
    
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const duracionSeleccionada = (event) => {
    setValues({
      ...values,
      duracionSeleccionada: event.target.value
    });
    };
  //TODO: Comentar 
  const fechaExposicion = (event) => {
    setValues({
      ...values,
      fechaExposicion: event.target.value
    });
  };
  // Costante para definir el estado de la ventana emergente de confirmación cuando se pulsa sobre el botón cancelar
  const [emergenteCancelar, setEmergenteCancelar] = React.useState(false);
  //TODO: Comentar  
  const [emergenteGuardar, setEmergenteGuardar] = React.useState(false);
  const [emergenteGuardarYEnviar, setEmergenteGuardarYEnviar] = React.useState(false);
  const [errorDescripcion, setErrorDescripcion] = useState(null);
  const [errorLugarCelebracion, setErrorLugarCelebracion] = useState(null);
  const [errorNombreEvento, setErrorNombreEvento] = useState(null);
  const [errorModalidad, setErrorModalidad] = useState(null);
  const [errorDuracion, setErrorDuracion] = useState(null);
  const [errorFechas, setErrorFechas] = useState(null);
  
  // Costante para definir el estado de la ventana emergente que muestra 
  //el resultado de enviar los datos del formulario al backend
  const [emergenteEnviarBack, setEmergenteEnviarBack] = React.useState(false);

  // Costante para definir el mensaje de la ventana emergente que muestra 
  //el resultado de enviar los datos del formulario al backend
  const [resultadoBack, setResultadoBack] = useState(null);

  const handleEnviarBackAceptar = () => {
    window.location.href = window.location.href;
    setEmergenteEnviarBack(false);
    setResultadoBack(null);
  };




  // Se modificó "handleClose" para que despliegue la ventana emergente
  const handleClose = () => {
    setEmergenteCancelar(true);
  };
  // "handleNo" controla cuando se da click en el botón "NO" de la ventana emergente
 const handleCancelarNo = () => {
  setEmergenteCancelar(false);
  };
  //TODO: Comentar
  const handleGuardar = () => {
    if(validar()){
      setEmergenteGuardar(true);
    }
  };

  // "handleCancelarNo" controla cuando se da click en el botón "NO" de la ventana emergente
  const handleGuardarNo = () => {
    setEmergenteGuardar(false);
  };

  //"validar" permite verificar que todos los campos requeridos se encuentren diligenciados 
  const validar =()=>{
    var result = true;

    if(values.descripcion.length){
      setErrorDescripcion(null)
    }
    else{
      setErrorDescripcion("El campo es obligatorio");
      result = false;
    }
    if(values.lugarCelebracion.length){
      setErrorLugarCelebracion(null)
    }
    else{
      setErrorLugarCelebracion("El campo es obligatorio");
      result = false;
    }
    if(values.nombreEvento.length){
      setErrorNombreEvento(null)
    }
    else{
      setErrorNombreEvento("El campo es obligatorio");
      result = false;
    }
    if(values.modalidad.length){
      setErrorModalidad(null)
    }
    else{
      setErrorModalidad("El campo es obligatorio");
      result = false;
    }
	  if(values.duracionSeleccionada.length && values.duracionSeleccionada > 0){
      setErrorDuracion(null)
    }
    else{
      setErrorDuracion("Seleccione un número de horas valido");
      result = false;
    }   
    if(values.fechaExposicion.length){
      setErrorFechas("")
    }
    else{
      setErrorFechas("Seleccióne una fecha");
      result = false;
    }
    return result;
  }

  //TODO: Comentar
  const handleGuardarYEnviar = () => {
    
    if(validar()){
      setEmergenteGuardarYEnviar(true);
    }
    };

	const handleGuardarYEnviarNo = () => {
    setEmergenteGuardarYEnviar(false);
  };
  const SaveActivity = () => {
    setEmergenteGuardar(false);
    setEmergenteGuardarYEnviar(false);
    var vardescripcion = document.getElementById("descripcion").value;
    var vardate = document.getElementById("date").value;
    var varlugarcelebracion = document.getElementById("lugarcelebracion").value;
    var varnombreevento = document.getElementById("nombreevento").value;
    var varmodalidadpresentación = document.getElementById("modalidadpresentación").value;
    var varhours = document.getElementById("hours").value;
    var now = objUtil.GetCurretTimeDate();

    //Se captura el valor booleano de "emergenteGuardarYEnviar" y se envía en el 
    //documento JSON con el fin de saber si se debe enviar el email a quien corresponda
    var send_email = emergenteGuardarYEnviar;

    objService.PostActivityFour(
      { 
        "name" : varnombreevento,
        "description": vardescripcion,
        "state" : 1,
        "start_date" : vardate,
        "academic_year" : "2020-21", /* consultar año academico actual */
        "type" : "Exposición de resultados", /* Colocar el tipo numerico al que corresponda */
        "date_record": now,
        "date_update": now, 
        "modality" : varmodalidadpresentación,
        "duration_hours" : varhours,
        "place" : varlugarcelebracion,
        "student" : 36, /* Consultar el id del estudiante actual */
        "send_email": send_email 
      }
    ).then((result) => { 
      setResultadoBack("Actividad registrada correctamente");   
    }).catch(() => {
      setResultadoBack("Ups! Ha ocurrido un error al registrar la actividad, verifique los campos o intentelo mas tarde");
    });
    setEmergenteEnviarBack(true);
    setEmergenteGuardar(false);
    setEmergenteGuardarYEnviar(false);
  }  
  return (
    <div>
      <BreadCrumbs />
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <form autoComplete="off" noValidate className={clsx(classes.root, className)} {...rest}>
            <Card className={classes.root}>
              <h1 style={{ display: 'flex', justifyContent: 'center' }} align="center" name="crearactividad" >Datos de detalle exposición de resultados parciales de investigación</h1>
              <br></br>
              <Divider/>
              <CardContent >
                <br></br>
                <Grid container spacing = {3}>
                <Grid item md={12} xs={12}>
                  <TextField fullWidth label="Descripcion" id="descripcion" name="descripcion" onChange={handleChange} required
                    value={values.descripcion} variant="outlined"/>
                  {/* TODO: Comentar */}
                  {errorDescripcion? <p style={{ display: 'flex', color:'red' }}>{errorDescripcion}</p>:null}
                  <br></br>
                  <br></br>
                  <Grid>
                    <TextField id="date" label="Fecha de exposición" type="date" 
                      className={classes.textField} InputLabelProps={{ shrink: true }} 
                      onChange={fechaExposicion}/>
                  </Grid>
                  {/* TODO: Comentar */}
                  {errorFechas? <p style={{ display: 'flex', color:'red' }}>{errorFechas}</p>:null}
                  <br></br> 
                  
                  <br></br>
                  <TextField fullWidth label="Lugar de celebracion" id="lugarcelebracion" name="lugarCelebracion" onChange={handleChange} required value={values.lugarCelebracion}
                        variant="outlined"
                      />
                    {/* TODO: Comentar */}   
                  {errorLugarCelebracion? <p style={{ display: 'flex', color:'red' }}>{errorLugarCelebracion}</p>:null}   
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Nombre del evento" id="nombreevento" name="nombreEvento" onChange={handleChange} required
                    value={values.nombreEvento} variant="outlined"/>
                    {/* TODO: Comentar */}
                    {errorNombreEvento? <p style={{ display: 'flex', color:'red' }}>{errorNombreEvento}</p>:null}
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Modalidad de presentación" id="modalidadpresentación" name="modalidad" onChange={handleChange} required
                    value={values.modalidad} variant="outlined"/>
                    {/* TODO: Comentar */}
                    {errorModalidad? <p style={{ display: 'flex', color:'red' }}>{errorModalidad}</p>:null}
                  <br></br>
                  <br></br>
                  <TextField id="standard-number" label="Duración en horas" id="hours" type="number" InputLabelProps={{ shrink: true, }} onChange={duracionSeleccionada} variant="outlined" />
                  {/* TODO: Comentar */}
                  {errorDuracion? <p style={{ display: 'flex', color:'red' }}>{errorDuracion}</p>:null}
                  <br></br>
                  <br></br>
                  <Button color="primary" variant="outlined"> Certificado </Button>
                </Grid>
                </Grid>
                <br></br>
              </CardContent>
              <Box display="flex" justifyContent="flex-end" p={2}>
                {/* Se le agrega la propiedad onClick para lanzar la ventana emergente de 
                confirmación cuando se pulsa sobre el botón cancelar, se debe quitar la propiedad RouterLink */}
                <Button onClick={handleClose} color="primary"variant="outlined">Cancelar</Button>&nbsp;

                <Button onClick={handleGuardar} color="primary" variant="contained"> Guardar </Button>&nbsp;

                <Button onClick={handleGuardarYEnviar} color="primary" variant="contained"> Guardar y Enviar </Button>
              </Box>
            </Card>
          </form>
            {/*HTML que lanza la ventana emergente de confirmación cuando se pulsa sobre el botón "cancelar" en "Crear Actividad" */}
            <Dialog open={emergenteCancelar} onClose={handleCancelarNo} >
              <DialogTitle id="alert-dialog-title">{"¿Está seguro que desea cancelar?"}</DialogTitle>
              <DialogContent>
              </DialogContent>
              <DialogActions>
              <Button onClick={handleCancelarNo} color="primary" autoFocus>No</Button>
              <RouterLink to = "../"> 
                  <Button color="primary">Si</Button>
              </RouterLink>
              </DialogActions>
            </Dialog> 
            {/*HTML que lanza la ventana emergente de confirmación cuando se pulsa sobre el botón "GUARDAR" en "Crear Actividad" */}
            <Dialog open={emergenteGuardar} onClose={handleGuardarNo} >
              <DialogTitle id="alert-dialog-title">{"¿Esta seguro que desea guardar la actividad?"}</DialogTitle>
              <DialogContent>
              </DialogContent>
              <DialogActions>
                {/* TODO: Enviar a backend y guardar */}
                <Button onClick={handleGuardarNo} color="primary" autoFocus>No</Button>
                <Button onClick={SaveActivity} color="primary">Si</Button>
              </DialogActions>
            </Dialog> 
            {/*HTML que lanza la ventana emergente de confirmación cuando se pulsa sobre el botón "GUARDAR Y ENVIAR" 
            en "Crear Actividad" */}
            <Dialog open={emergenteGuardarYEnviar} onClose={handleGuardarYEnviarNo}>
          <DialogTitle id="alert-dialog-title">{"¿Esta seguro que desea guardar y enviar la actividad?"}</DialogTitle>
          <DialogContent>
          </DialogContent>
          <DialogActions>
          {/* TODO: GUARDAR EN BACK Y ENVIAR POR E-MAIL */}
            <Button onClick={handleGuardarYEnviarNo} color="primary" autoFocus>No</Button>
            <Button onClick={SaveActivity} color="primary">Si</Button>
          </DialogActions>
        </Dialog>   
                  


          {/* HTML que muestra el resultado de enviar los datos del formulario al backend */}
          <Dialog
            open={emergenteEnviarBack}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleEnviarBackAceptar}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Resultado"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
              {resultadoBack? <Typography component={'span'} variant={'body2'}>{resultadoBack}</Typography>:null}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEnviarBackAceptar} color="primary">
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>


    
        </div>
      </Container>
    </div>
  );
};
ActivityFourView.propTypes = {
  className: PropTypes.string
};
export default ActivityFourView;
