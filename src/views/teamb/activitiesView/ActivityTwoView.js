import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, TextField, makeStyles, InputLabel, Container, Divider } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import BreadCrumbs from 'src/views/teamb/activitiesView/BreadCrumbs';
import service from '../services/service';
import util from '../services/util';

const objService = new service();
const objUtil = new util();

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
  }
}));

const ActivityTwoView = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    titulo:'',
    descripcion:'',
    nombreEvento:'',
    lugarCelebracion:'', 
  	institucionSeleccionado:'',
	  fechaRealizacion: ''
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  //Asignamos a "InstitucionSeleccionado"en  el valor de "event.target.value"
  const institucionSeleccionado = (event) => {
    setValues({
      ...values,
      institucionSeleccionado: event.target.value
    });
  };
  //TODO: Comentar 
  const fechaRealizacion = (event) => {
    setValues({
      ...values,
      fechaRealizacion: event.target.value
    });
  };
  // Costante para definir el estado de la ventana emergente de confirmación cuando se pulsa sobre el botón cancelar
  const [emergenteCancelar, setEmergenteCancelar] = React.useState(false);
  //TODO: Comentar
  const [emergenteGuardar, setEmergenteGuardar] = React.useState(false);
  const [emergenteGuardarYEnviar, setEmergenteGuardarYEnviar] = React.useState(false);
  const [errorTitulo, setErrorTitulo] = useState(null);
  const [errorDescripcion, setErrorDescripcion] = useState(null);
  const [errorNombreEvento, setErrorNombreEvento] = useState(null);
  const [errorLugar, setErrorLugar] = useState(null);
  const [errorInstitucion, setErrorInstitucion] = useState(null);
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
    if(values.titulo.length){
      setErrorTitulo(null)
    }
    else{
      setErrorTitulo("El campo es obligatorio")
    }
    if(values.descripcion.length){
      setErrorDescripcion(null)
    }
    else{
      setErrorDescripcion("El campo es obligatorio")
    }
    if(values.nombreEvento.length){
      setErrorNombreEvento(null)
    }
    else{
      setErrorNombreEvento("El campo es obligatorio")
    }
	  if(values.lugarCelebracion.length){
      setErrorLugar(null)
    }
    else{
      setErrorLugar("El campo es obligatorio")
    }
    if(values.institucionSeleccionado.length && values.institucionSeleccionado != "Seleccione una opción"){
      setErrorInstitucion(null)
    }
    else{
      setErrorInstitucion("Seleccione una opción válida")
    }
	  if(values.fechaRealizacion.length){
        setErrorFechas("")
    }    
    else{
        setErrorFechas("Seleccióne fecha")  
    }
    //setEmergenteGuardarYEnviar(true);
    };
	const handleGuardarYEnviarNo = () => {
    
    setEmergenteGuardarYEnviar(false);
    };

  const SaveActivity = () => {
    setEmergenteGuardar(false);
    var vartitulo = document.getElementById("titulo").value;
    var vardescripcion = document.getElementById("descripcion").value;
    var varnombreevento = document.getElementById("nombreevento").value;
    var varlugarcelebracion = document.getElementById("lugarcelebracion").value;
    var varentidadorganizadora = document.getElementById("entidadorganizadora").value;
    var vardate = document.getElementById("date").value;
    var now = objUtil.GetCurretTimeDate();
    objService.PostActivityTwo(
      { 
        "title": vartitulo,
        "description" : vardescripcion,
        "name" : varnombreevento,
        "place" : varlugarcelebracion,
        "institution": varentidadorganizadora,
        "start_date" : vardate,
        "state" : 1,
        "academic_year" : "2020-21", /* consultar año academico actual */
        "type" : "lecture",
        "student" : 1, /* Consultar usuario actual */
        "date_record": now,
        "date_update": now         
      }
    ).then((result) => { 
      alert("Actividad registrada");      
        
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
              <h1 style={{ display: 'flex', justifyContent: 'center' }} align="center" name="crearactividad">
                Datos de detalle ponencias en congreso, simposios y/o jornadas
              </h1>
              <br></br>
              <Divider />
              <CardContent >
                <br></br>
                <Grid item md={12} xs={12}>
                <TextField fullWidth label="Titulo de la contribución" id="titulo" name="titulo" onChange={handleChange} required value={values.titulo} variant="outlined"/>
                  {/* TODO: Comentar */}
                  {errorTitulo? <p style={{ display: 'flex', color:'red' }}>{errorTitulo}</p>:null}
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Descripcion general" id="descripcion" name="descripcion" onChange={handleChange} required value={values.descripcion} variant="outlined"/>
                  {/* TODO: Comentar */}
                  {errorDescripcion? <p style={{ display: 'flex', color:'red' }}>{errorDescripcion}</p>:null}
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Nombre del evento" id="nombreevento" name="nombreEvento" onChange={handleChange} required value={values.nombreEvento} variant="outlined"/>
                  {/* TODO: Comentar */}
                  {errorNombreEvento? <p style={{ display: 'flex', color:'red' }}>{errorNombreEvento}</p>:null}
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Lugar de celebracion" id="lugarcelebracion" name="lugarCelebracion" onChange={handleChange} required value={values.lugarCelebracion}
                    variant="outlined"/>
                     {/* TODO: Comentar */}
                    {errorLugar? <p style={{ display: 'flex', color:'red' }}>{errorLugar}</p>:null}
                  <br></br>
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Entidad organizadora" id="entidadorganizadora" name="entidadorganizadora" onChange={institucionSeleccionado} required select SelectProps={{ native: true }}
                    variant="outlined"
                  >
                    {institucion.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  {errorInstitucion? <p style={{ display: 'flex', color:'red' }}>{errorInstitucion}</p>:null}
                  <br></br>
                  <br></br>
                  <br></br>
                  <TextField id="date" label="Fecha de realización" type="date"
                    className={classes.textField} InputLabelProps={{ shrink: true }}
                    onChange={fechaRealizacion}/>
                  <br></br>
                  {errorFechas? <p style={{ display: 'flex', color:'red' }}>{errorFechas}</p>:null}
                  <br></br>
                  <Button color="primary" variant="outlined"> Agregar premio </Button>
                  <br></br>
                  <br></br>
                  <Button color="primary" variant="outlined"> Justificante </Button>
                </Grid>
                <br></br>
              </CardContent>

              <Box display="flex" justifyContent="flex-end" p={2}>
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
          <Button onClick={SaveActivity} color="primary">Si</Button>
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
          <Button color="primary">Si</Button>
          <Button onClick={handleGuardarYEnviarNo} color="primary" autoFocus>No</Button>
        </DialogActions>
      </Dialog>  
        </div>
      </Container>
    </div>
  );
};
ActivityTwoView.propTypes = {
  className: PropTypes.string
};
export default ActivityTwoView;
