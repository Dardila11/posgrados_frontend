import React, { useEffect, useState } from 'react';
import {
  Card, Grid, TextField, makeStyles, Container, Typography, Divider
} from '@material-ui/core';

import PDFUpload from 'src/views/teamb/activitiesView/components/UploadPDF';
import FormOption from 'src/views/teamb/activitiesView/components/FormOption';
import ConfirmOption from 'src/views/teamb/activitiesView/components/ConfirmOption';
import Response from 'src/views/teamb/activitiesView/components/Response';

import service from '../../services/service';
import util from '../../services/util';

const objService = new service();
const objUtil = new util();

const useStyles = makeStyles(() => ({
  root: {
    margin: '10px'
  },
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  card: {
    margin: '10px'
  },
  title: {
    margin: '20px'
  },
  content: {
    marginBottom: '16px',
    marginLeft: '16px',
    marginRight: '16px'
  },
  field: {
    marginTop: '18px'
  },
  validator: {
    color: 'red',
    fontSize: 13
  }
}));

export const ActivityFourEdit = ({ state, callbackDialogOpen }) => {
  const classes = useStyles();
  const [listaEstudiantes, setListaEstudiantes] = useState([]);

  useEffect(() => {
    objService.GetStudents().then(result => setListaEstudiantes(result.data));

    if (state.receipt !== null) {
      document.getElementById("text-file").textContent = "El archivo previamente registrado esta cargado";
    }
  }, []);

  // Estado que controla los valores del formulario
  const [values, setValues] = useState({
    id: state.id,
    descripcion: state.description,
    fechaExposicion: state.start_date,
    lugar: state.place,
    nombreEvento: state.name,
    modalidad: state.modality,
    duracionSeleccionada: state.duration_hours,
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const [archivo, setArchivo] = useState(null);
  const uploadFile = e => {
    if (e.length > 0) {
      setArchivo(e);
      var name = e[0].name;
      var nameSplit = name.split(".");
      var ext = nameSplit[nameSplit.length - 1];

      if (ext === "pdf") { document.getElementById("text-file").textContent = e[0].name; }
      else { 
        setResponse('Solo es posible subir archivos con extension .pdf!');
        setPopUpRequestPost(true);
      }
    }
    else { document.getElementById("text-file").textContent = "El archivo previamente registrado esta cargado"; }
  }
  // Costantes para definir el estado de la ventana emergente de confirmación cuando se pulsa sobre una de las 
  // opciones disponibles
  const [emergenteCancelar, setEmergenteCancelar] = React.useState(false);
  const [emergenteGuardar, setEmergenteGuardar] = React.useState(false);
  const [emergenteGuardarYEnviar, setEmergenteGuardarYEnviar] = React.useState(false);

  // Se modificó "handleClose" para que despliegue la ventana emergente
  const handleClose = () => {
    setEmergenteCancelar(true);
  };
  // "handleNo" controla cuando se da click en el botón "NO" de la ventana emergente
  const handleCancelarNo = () => {
    setEmergenteCancelar(false);
  };

  // "handleGuardar" valida los datos y lanza la ventana emergente
  const handleGuardar = () => {
    if (validarGuardar()) { setEmergenteGuardar(true); }
  };
  // "handleGuardarNo" controla cuando se da click en el botón "NO" de la ventana emergente
  const handleGuardarNo = () => {
    setEmergenteGuardar(false);
  };

  // Valida los datos y lanza la ventana emergente
  const handleGuardarYEnviar = () => {
    if (validarGuardarYEnviar()) { setEmergenteGuardarYEnviar(true); }
  };
  // Controla cuando se da click en el botón "NO" de la ventana emergente
  const handleGuardarYEnviarNo = () => {
    setEmergenteGuardarYEnviar(false);
  };

  const [errorDescripcion, setErrorDescripcion] = useState(null);
  const [errorLugar, setErrorLugar] = useState(null);
  const [errorNombreEvento, setErrorNombreEvento] = useState(null);
  const [errorModalidad, setErrorModalidad] = useState(null);
  const [errorDuracion, setErrorDuracion] = useState(null);
  const [errorFecha, setErrorFecha] = useState(null);
  const [errorFile, setErrorFile] = useState(null);

  const resetError = () => {
    setErrorDescripcion(null);
    setErrorLugar(null);
    setErrorNombreEvento(null);
    setErrorModalidad(null);
    setErrorDuracion(null);
    setErrorFecha(null);
    setErrorFile(null);
  }

 //"validar" permite verificar que todos los campos requeridos se encuentren diligenciados 
 const validarGuardarYEnviar = () => {
  resetError();
  var result = validarGuardar();

  if(values.nombreEvento !== ''){
    if (values.nombreEvento.length < 61) { setErrorNombreEvento(null) }
    else {
      setErrorNombreEvento("El campo debe tener máximo 60 caracteres")
      result = false;
    }
  }
  else{
    setErrorNombreEvento("El campo es obligatorio");
      result = false;
  }
  
  if (values.duracionSeleccionada > 0 && values.duracionSeleccionada !== ""){ 
    if(values.duracionSeleccionada < 10000) {setErrorDuracion(null) }
    else {
      setErrorDuracion("El numero de horas asignadas debe ser menor a 10000")
      result = false;
    }
  }
  else {
    setErrorDuracion("Seleccione un número de horas valido")
    result = false;
  }
  var textFile = document.getElementById("text-file").textContent;
  if (textFile.length > 0) { setErrorFile(null) }
  else {
    setErrorFile("Es necesario subir el archivo");
    result = false;
  }
  return result;
}
//"validar" permite verificar que todos los campos requeridos se encuentren diligenciados en guardar
const validarGuardar = () => {
  resetError();
  var result = true;

  if(values.descripcion !== ''){
    if (values.descripcion.length < 149) { setErrorDescripcion(null) }
    else {
      setErrorDescripcion("El campo debe tener máximo 148 caracteres")
      result = false;
    }
  }
  else {
    setErrorDescripcion("El campo es obligatorio")
    result = false;
  }
  if (values.fechaExposicion.length) { setErrorFecha("") }
  else {
    setErrorFecha("Seleccióne una fecha");
    result = false;
  }
  if(values.lugar !== ''){
    if (values.lugar.length < 41) { setErrorLugar(null) }
    else {
      setErrorLugar("El campo debe tener máximo 40 caracteres")
      result = false;
    }
  }
  else{
    setErrorLugar("El campo es obligatorio");
      result = false;
  }
  if (values.nombreEvento.length < 61) { setErrorNombreEvento(null)}
  else {
    setErrorNombreEvento("El campo debe tener máximo 60 caracteres")
    result = false;
  }
  if(values.modalidad !== ''){
    if (values.modalidad.length <41) { setErrorModalidad(null) }
    else {
      setErrorModalidad("El campo debe tener máximo 40 caracteres")
      result = false;
    }
  }
  else{
    setErrorModalidad("El campo es obligatorio");
      result = false;
  }
  if (values.duracionSeleccionada >= 0 && values.duracionSeleccionada !== "") { 
    if(values.duracionSeleccionada < 10000) {setErrorDuracion(null) }
    else {
      setErrorDuracion("El numero de horas asignadas debe ser menor a 10000")
      result = false;
    }
  }
  else{
    setErrorDuracion("Seleccione un número de horas valido")
    result = false;
  } 
  
  return result;
}
  // Costante para definir el estado de la ventana emergente que muestra el resultado de enviar los datos del 
  // formulario al backend
  const [popUpRequestPost, setPopUpRequestPost] = React.useState(false);

  // Costante para definir el mensaje de la ventana emergente que muestra el resultado de enviar los datos del 
  // formulario al backend
  const [response, setResponse] = useState(null);

  const handleResponseAccept = () => {
    if (response === "Actividad editada correctamente") {
      window.location.href = window.location.href;
      callbackDialogOpen(false);
    }
    setPopUpRequestPost(false);
    setResponse(null);
  };

  const handleBack = () => {
    setEmergenteCancelar(false);
    callbackDialogOpen(false);
  };

  const SaveActivity = () => {
    var now = objUtil.GetCurretTimeDate();
    //Se captura el valor booleano de "emergenteGuardarYEnviar" y se envía en el 
    //documento JSON con el fin de saber si se debe enviar el email a quien corresponda
    var send_email = emergenteGuardarYEnviar;

    const fd = new FormData();
    fd.append("description", values.descripcion);
    fd.append("name", values.nombreEvento);
    fd.append("start_date", values.fechaExposicion);
    fd.append("place", values.lugar);
    fd.append("modality", values.modalidad);
    fd.append("duration_hours", values.duracionSeleccionada);
    // Datos adicionales
    fd.append("academic_year", state.academic_year);
    fd.append("student", objUtil.GetEstudianteConIdUsuario(listaEstudiantes, localStorage.getItem('id'))); // Consultar el id del estudiante actual
    fd.append("date_record", state.date_record);
    fd.append("date_update", now);
    fd.append("is_active", true);
    if (send_email) {
      fd.append("send_email", send_email);
      fd.append("state", 2);
    }
    if (archivo !== null) { fd.append("receipt", archivo[0]); }

    objService.PutActivityFourEdit(fd, values.id).then((request) => {
      setResponse("Actividad editada correctamente");
    }).catch(() => {
      setResponse("Ups! Ha ocurrido un error al editar la actividad, intentelo mas tarde o contacte con el administrador");
    });
    setPopUpRequestPost(true);
    setEmergenteGuardar(false);
    setEmergenteGuardarYEnviar(false);
  }

  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <Grid className={classes.content}>
          <form>
            <TextField className={classes.field} fullWidth value={values.descripcion} label="Descripción" name="descripcion"
              onChange={handleChange} required variant="outlined"
            />
            {/* Validacion del campo */}
            {errorDescripcion ? <Typography className={classes.validator}> {errorDescripcion} </Typography> : null}
            
            <TextField className={classes.field} name="fechaExposicion" value={values.fechaExposicion} label="Fecha de exposición" type="date"
              InputLabelProps={{ shrink: true }} onChange={handleChange} variant="outlined" required
            />
            {/* Validacion del campo */}
            {errorFecha ? <Typography className={classes.validator}> {errorFecha} </Typography> : null}

            <TextField className={classes.field} fullWidth value={values.lugar} label="Lugar de la exposición" name="lugar"
              onChange={handleChange} required variant="outlined"
            />
            {/* Validacion del campo */}
            {errorLugar ? <Typography className={classes.validator}> {errorLugar} </Typography> : null}

            <TextField className={classes.field} fullWidth value={values.nombreEvento} label="Nombre del evento" name="nombreEvento"
              onChange={handleChange} required variant="outlined"
            />
            {/* Validacion del campo */}
            {errorNombreEvento ? <Typography className={classes.validator}> {errorNombreEvento} </Typography> : null}

            <TextField className={classes.field} fullWidth value={values.modalidad} label="Modalidad de presentación" name="modalidad"
              onChange={handleChange} required variant="outlined"
            />
            {/* TODO: Comentar */}
            {errorModalidad ? <Typography className={classes.validator}> {errorModalidad} </Typography> : null}

            <TextField className={classes.field} name="duracionSeleccionada" value={values.duracionSeleccionada} label="Duración en horas" type="number"
              onChange={handleChange} required variant="outlined"
            />
            {/* Validacion del campo */}
            {errorDuracion ? <Typography className={classes.validator}> {errorDuracion} </Typography> : null}

            <PDFUpload uploadFile={uploadFile} name="Certificado" />
            {errorFile ? <Typography className={classes.validator}> {errorFile} </Typography> : null}
          </form>
          <Divider className={classes.field} />
          <Grid container justify="flex-end">
            <FormOption name={"Cancelar"} onClick={handleClose} variant={"outlined"} />
            <FormOption name={"Guardar"} onClick={handleGuardar} variant={"contained"} />
            <FormOption name={"Guardar y Enviar"} onClick={handleGuardarYEnviar} variant={"contained"} />
          </Grid>
        </Grid>
      </Card>

      {/* Muestra un mensaje de confirmacion para cada una de las opciones del formulario */}
      <ConfirmOption open={emergenteCancelar} onClose={handleCancelarNo} onClickPositive={handleBack}
        msg={'¿Esta seguro de que desea salir del registro?'}
      />
      <ConfirmOption open={emergenteGuardar} onClose={handleGuardarNo} onClickPositive={SaveActivity}
        msg={'¿Esta seguro de que desea guardar la actividad?'}
      />
      <ConfirmOption open={emergenteGuardarYEnviar} onClose={handleGuardarYEnviarNo} onClickPositive={SaveActivity}
        msg={'¿Esta seguro de que desea guardar la actividad y enviar un correo a sus directores?'}
      />

      {/* Muestra la respuesta del servidor cuando se realiza la peticion */}
      <Response popUpRequestPost={popUpRequestPost} handleResponseAccept={handleResponseAccept} response={response} />
    </Container>
  );
};
export default ActivityFourEdit;
