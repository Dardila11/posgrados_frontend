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
import service from '../services/service';
import util from '../services/util';

const objService = new service();
const objUtil = new util();

const pais = [
  { value: 'advert', label: 'Seleccione una opción' }, 
  { value: 'T1', label: 'Colombia' },
  { value: 'T2', label: 'España' },
  { value: 'T3', label: 'Mexico' },
  { value: 'T4', label: 'USA' }
];

  const ciudad = [ 
  { value: 'advert', label: 'Seleccione una opción' },
  { value: 'T1', label: 'Madrid' },
  { value: 'T2', label: 'Sevilla' },
  { value: 'T3', label: 'Barcelona' },
  { value: 'T4', label: 'Bilbao' }
];

const institucion = [
  { value: 'advert', label: 'Seleccione una opción' },
  { value: 'T1', label: 'Institucion 1' },
  { value: 'T2', label: 'Institucion 2' },
  { value: 'T3', label: 'Institucion 3' },
  { value: 'T4', label: 'Institucion 4' }
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
    setEmergenteGuardar(true);
  };

  // "handleCancelarNo" controla cuando se da click en el botón "NO" de la ventana emergente
  const handleGuardarNo = () => {
    setEmergenteGuardar(false);
  };
  //TODO: Comentar
  const handleGuardarYEnviar = () => {
    if(values.proposito.length){
      setErrorProposito(null)
    }
    else{
      setErrorProposito("El campo es obligatorio")
    }
    if(values.descripcion.length){
      setErrorDescripcion(null)
    }
    else{
      setErrorDescripcion("El campo es obligatorio")
    }
    if(values.paisSeleccionado.length && values.paisSeleccionado != "Seleccione una opción"){
      setErrorPais(null)
    }
    else{
      setErrorPais("Seleccione una opción válida")
    }
	  if(values.ciudadSeleccionada.length && values.ciudadSeleccionada != "Seleccione una opción"){
      setErrorCiudad(null)
    }
    else{
      setErrorCiudad("Seleccione una opción válida")
    }
	  if(values.institucionSeleccionado.length && values.institucionSeleccionado != "Seleccione una opción"){
      setErrorNombreInstitucion(null)
    }
    else{
      setErrorNombreInstitucion("Seleccione una opción válida")
    }
  	if(values.nombreResponsable.length){
      setErrorNombreResponsable(null)
    }
    else{
      setErrorNombreResponsable("El campo es obligatorio")
    }    
    if(values.fechaInicio.length && values.fechaFin.length){
      if(values.fechaInicio<=values.fechaFin){
        setErrorFechas("")
      }
      else{
        setErrorFechas("La fecha de finalización de la estancia debe ser después de la fecha inicio de estancia")
      }
    }
    else{
      setErrorFechas("Seleccióne una fecha inicio de estancia y fin de estancia válidas")
    }
    setEmergenteGuardarYEnviar(true);
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

    objService.PostActivityFive(
      { 
        "description" : vardescripcion,
        "state" : 1,
        "start_date" : varfecha1,
        "end_date" : varfecha2,
        "academic_year" : "2020-21", /* consultar año academico actual */
        "type" : "researchStays",
        "date_record": now,
        "date_update": now, 
        "purpose": varproposito,
        "responsible" : varnombreresponsable,
        "student" : 1, /* Consultar usuario actual */
        "institution" : varnombreinstitucion,
        "city" : varciudad,
        "country" : varpais
        
      }
    ).then((result) => { 
      alert("actividad registrada");      
        
    }).catch(() => {
      alert("Error, no hay registros para mostrar");
    });
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
            <Button onClick={handleClose} color="primary"variant="outlined">Cancelar</Button>

            <Button onClick={handleGuardar} color="primary" variant="contained"> Guardar </Button>

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
        <RouterLink to = "../"> 
            <Button color="primary">Si</Button>
        </RouterLink>
          <Button onClick={handleCancelarNo} color="primary" autoFocus>No</Button>
        </DialogActions>
      </Dialog> 
      {/*HTML que lanza la ventana emergente de confirmación cuando se pulsa sobre el botón "GUARDAR" en "Crear Actividad" */}
      <Dialog open={emergenteGuardar} onClose={handleGuardarNo} >
        <DialogTitle id="alert-dialog-title">{"¿Esta seguro que desea guardar la actividad?"}</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          {/* TODO: Enviar a backend y guardar */}
          <Button color="primary" onClick={SaveActivity}>Si</Button>
          <Button onClick={handleGuardarNo} color="primary" autoFocus>No</Button>
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
          <Button color="primary" onClick={SaveActivity} >Si</Button>
          <Button onClick={handleGuardarYEnviarNo} color="primary" autoFocus>No</Button>
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
