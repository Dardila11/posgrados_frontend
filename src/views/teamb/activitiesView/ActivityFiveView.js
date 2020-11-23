import React, { useState } from 'react';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Box, Button, Card, CardContent, Grid, TextField, makeStyles, Container, Typography, Divider} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import BreadCrumbs from 'src/views/teamb/activitiesView/BreadCrumbs';
import service from '../services/service';
import util from '../services/util';

import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

//Transición  de la ventana emergente que muestra 
//el resultado de enviar los datos del formulario al backend
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const objService = new service();
const objUtil = new util();

const pais = [
  { value: 'advert', label: 'Seleccione una opción' }, 
  { value: 'T1', label: 5 },
  { value: 'T2', label: 1 },
  { value: 'T3', label: 2 },
  { value: 'T4', label: 3 }
];

  const ciudad = [ 
  { value: 'advert', label: 'Seleccione una opción' },
  { value: 'T1', label: 5 },
  { value: 'T2', label: 1 },
  { value: 'T3', label: 2 },
  { value: 'T4', label: 3 }
];

const institucion = [
  { value: 'advert', label: 'Seleccione una opción' },
  { value: 'T1', label: 1 },
  { value: 'T2', label: 2 },
  { value: 'T3', label: 3 },
  { value: 'T4', label: 4 }
];

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
    width: '70%',
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
    proposito:'',
    descripcion:'',
  	paisSeleccionado:'',
  	ciudadSeleccionada: '',
    institucionSeleccionado:'',
    nombreResponsable:'',
    fechaInicio: '',
    fechaFin:''
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  //Asignamos a "PaisSeleccionado"en  el valor de "event.target.value"
  const paisSeleccionado = (event) => {
    setValues({
      ...values,
      paisSeleccionado: event.target.value
    });
  };
  //Asignamos a "CiudadSeleccionado" en el valor de "event.target.value"
 const ciudadSeleccionada = (event) => {
  setValues({
    ...values,
    ciudadSeleccionada: event.target.value
  });
  };
  //Asignamos a "institucionSeleccionado" en el valor de "event.target.value"
 const institucionSeleccionado = (event) => {
  setValues({
    ...values,
    institucionSeleccionado: event.target.value
  });
  };
  //TODO: Comentar 
  const handleFechaInicio = (event) => {
    setValues({
      ...values,
      fechaInicio: event.target.value
    });
  };
  const handleFechaFin = (event) => {
    setValues({
      ...values,
      fechaFin: event.target.value
    });
  };
  // Costante para definir el estado de la ventana emergente de confirmación cuando se pulsa sobre el botón cancelar
  const [emergenteCancelar, setEmergenteCancelar] = React.useState(false);
  //TODO: Comentar
  const [emergenteGuardar, setEmergenteGuardar] = React.useState(false);
  const [emergenteGuardarYEnviar, setEmergenteGuardarYEnviar] = React.useState(false);
  const [errorProposito, setErrorProposito] = useState(null);
  const [errorDescripcion, setErrorDescripcion] = useState(null);
  const [errorPais, setErrorPais] = useState(null);
  const [errorCiudad, setErrorCiudad] = useState(null);  
  const [errorNombreInstitucion, setErrorNombreInstitucion] = useState(null);
  const [errorNombreResponsable, setErrorNombreResponsable] = useState(null);
  const [errorFechas, setErrorFechas] = useState(null);

  // Costante para definir el estado de la ventana emergente que muestra 
  //el resultado de enviar los datos del formulario al backend
  const [emergenteEnviarBack, setEmergenteEnviarBack] = React.useState(false);

  // Costante para definir el mensaje de la ventana emergente que muestra 
  //el resultado de enviar los datos del formulario al backend
  const [resultadoBack, setResultadoBack] = useState(null);

  const handleEnviarBackAceptar = () => {
    if(resultadoBack == "Actividad registrada correctamente") {
      window.location.href = window.location.href;
    }
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
    
    if(values.proposito.length){
      setErrorProposito(null)
    }
    else{
      setErrorProposito("El campo es obligatorio");
      result = false;
    }
    if(values.descripcion.length){
      setErrorDescripcion(null)
    }
    else{
      setErrorDescripcion("El campo es obligatorio");
      result = false;
    }
    if(values.paisSeleccionado.length && values.paisSeleccionado != "Seleccione una opción"){
      setErrorPais(null)
    }
    else{
      setErrorPais("Seleccione una opción válida");
      result = false;
    }
	  if(values.ciudadSeleccionada.length && values.ciudadSeleccionada != "Seleccione una opción"){
      setErrorCiudad(null)
    }
    else{
      setErrorCiudad("Seleccione una opción válida");
      result = false;
    }
	  if(values.institucionSeleccionado.length && values.institucionSeleccionado != "Seleccione una opción"){
      setErrorNombreInstitucion(null)
    }
    else{
      setErrorNombreInstitucion("Seleccione una opción válida");
      result = false;
    }
  	if(values.nombreResponsable.length){
      setErrorNombreResponsable(null)
    }
    else{
      setErrorNombreResponsable("El campo es obligatorio");
      result = false;
    }    
    if(values.fechaInicio.length && values.fechaFin.length){
      if(values.fechaInicio<=values.fechaFin){
        setErrorFechas("")
      }
      else{
        setErrorFechas("La fecha de finalización de la estancia debe ser después de la fecha inicio de estancia");
        result = false;
      }
    }
    else{
      setErrorFechas("Seleccióne una fecha inicio de estancia y fin de estancia válidas");
      result = false;
    }
    return result
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
    var varproposito = document.getElementById("proposito").value;
    var vardescripcion = document.getElementById("descripcion").value;
    var varpais = document.getElementById("pais").value;
    var varciudad = document.getElementById("ciudad").value;
    var varnombreinstitucion = document.getElementById("nombreinstitucion").value;
    var varfecha1 = document.getElementById("fecha1").value;
    var varfecha2 = document.getElementById("fecha2").value;
    var varnombreresponsable = document.getElementById("nombreresponsable").value;
    var now = objUtil.GetCurretTimeDate();


    //Se captura el valor booleano de "emergenteGuardarYEnviar" y se envía en el 
    //documento JSON con el fin de saber si se debe enviar el email a quien corresponda
    var send_email = emergenteGuardarYEnviar;

    objService.PostActivityFive(
      { 
        "description" : vardescripcion,
        "state" : 1,
        "start_date" : varfecha1,
        "end_date" : varfecha2,
        "academic_year" : "2020-21", /* consultar año academico actual */
        "type" : "Estancia de investigación", /* Colocar el tipo numerico al que corresponda */
        "date_record": now,
        "date_update": now, 
        "purpose": varproposito,
        "responsible" : varnombreresponsable,
        "student" : 36, /* Consultar el id del estudiante actual */
        "institution" : varnombreinstitucion,
        "city" : varciudad,
        "country" : varpais,
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
          <h1 style={{ display: 'flex', justifyContent: 'center' }} align="center" name="crearactividad" >Datos de detalle estancias de investigación en otras instituciones</h1>
          <br></br>
          <Divider/>
          <CardContent >
            <br></br>
            <Grid item md={12} xs={12}>
              <TextField fullWidth label="Proposito estancia" id="proposito" name="proposito" onChange={handleChange} required 
                value={values.proposito} variant="outlined"/>
			        {/* TODO: Comentar */}
              {errorProposito? <p style={{ display: 'flex', color:'red' }}>{errorProposito}</p>:null}
              <br></br>
              <br></br>
              <TextField fullWidth label="Descripcion actividades desarrolladas" id="descripcion" name="descripcion" onChange={handleChange}
                required value={values.descripcion} variant="outlined"/>
			        {/* TODO: Comentar */}
              {errorDescripcion? <p style={{ display: 'flex', color:'red' }}>{errorDescripcion}</p>:null}
              <br></br>
              <br></br>
              <TextField fullWidth label="Pais de estancia" id="pais" name="pais" onChange={paisSeleccionado} required select
                SelectProps={{ native: true }} variant="outlined">
                {pais.map((option) => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </TextField>
			        {/* TODO: Comentar */}
              {errorPais? <p style={{ display: 'flex', color:'red' }}>{errorPais}</p>:null}
              <br></br>
              <br></br>
              <TextField fullWidth label="Ciudad de estancia" id="ciudad" name="ciudad" onChange={ciudadSeleccionada} required select
                SelectProps={{ native: true }} variant="outlined">
                {ciudad.map((option) => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </TextField>
			         {/* TODO: Comentar */}
              {errorCiudad? <p style={{ display: 'flex', color:'red' }}>{errorCiudad}</p>:null}
              <br></br>
              <br></br>
              <TextField fullWidth label="Nombre de la institucion" id="nombreinstitucion" name="programa" onChange={institucionSeleccionado} required select
                SelectProps={{ native: true }} variant="outlined">
                {institucion.map((option) => (
                  <option key={option.value} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              {/* TODO: Comentar */}
              {errorNombreInstitucion? <p style={{ display: 'flex', color:'red' }}>{errorNombreInstitucion}</p>:null}
              <br></br>
              <br></br>
              <br></br>
              <Grid container spacing = {3} container justify="space-around">
              <Grid>
                <TextField id="fecha1" label="Fecha inicio estancia" type="date"
                  className={classes.textField} InputLabelProps={{ shrink: true }}
                  onChange={handleFechaInicio}/>
              </Grid>
              <Grid>
                <TextField id="fecha2" label="Fecha fin estancia" type="date"
                  className={classes.textField} InputLabelProps={{ shrink: true }}
                  onChange={handleFechaFin}/>
              </Grid>
            </Grid>
              <br></br>
              {errorFechas? <p style={{ display: 'flex', justifyContent: 'center', color:'red' }}>{errorFechas}</p>:null}
              <br></br> 
              <br></br>
              <TextField fullWidth label="Nombre responsable" id="nombreresponsable" name="nombreResponsable" onChange={handleChange} required
                value={values.nombreResponsable} variant="outlined"/>
			        {/* TODO: Comentar */}
              {errorNombreResponsable? <p style={{ display: 'flex', color:'red' }}>{errorNombreResponsable}</p>:null}	
              <br></br>
              <br></br>
              <Button color="primary" variant="outlined"> Justificante </Button>
            </Grid>
            <br></br>
          </CardContent>
          
          <Box spacing = {3} display="flex" justifyContent="flex-end" p={2}>
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
              <Button color="primary" onClick={SaveActivity}>Si</Button>
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
                <Button color="primary" onClick={SaveActivity} >Si</Button>
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
ActivityFiveView.propTypes = {
  className: PropTypes.string
};
export default ActivityFiveView;
