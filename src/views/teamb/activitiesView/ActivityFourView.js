import React, { useEffect, useState } from 'react';
import {
  Card, Grid, TextField, makeStyles, Container, Typography, Divider
} from '@material-ui/core';

import BreadCrumbs from 'src/views/teamb/activitiesView/components/BreadCrumbs';
import PDFUpload from 'src/views/teamb/activitiesView/components/UploadPDF';
import FormOption from 'src/views/teamb/activitiesView/components/FormOption';
import ConfirmOption from 'src/views/teamb/activitiesView/components/ConfirmOption';
import Response from 'src/views/teamb/activitiesView/components/Response';

import service from '../services/service';
import util from '../services/util';

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
    maxWidth: '50%',
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

const ActivityFourView = () => {
  const classes = useStyles();
  // Estado que controla los valores del formulario
  const [values, setValues] = useState({
    descripcion: '',
    fechaExposicion: '',
    lugar: '',
    nombreEvento: '',
    modalidad: '',
    duracionSeleccionada: 0
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const [archivo, setArchivo] = useState(null);
  const uploadFile = e => {
    setArchivo(e);
    if (e.length > 0) { document.getElementById("text-file").textContent = e[0].name; }
    else { document.getElementById("text-file").textContent = ""; }
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

  const  resetError = () => {
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
    var result = true;

    if (values.descripcion.length) { setErrorDescripcion(null) }
    else {
      setErrorDescripcion("El campo es obligatorio");
      result = false;
    }
    if (values.lugar.length) { setErrorLugar(null) }
    else {
      setErrorLugar("El campo es obligatorio");
      result = false;
    }
    if (values.nombreEvento.length) { setErrorNombreEvento(null) }
    else {
      setErrorNombreEvento("El campo es obligatorio");
      result = false;
    }
    if (values.modalidad.length) { setErrorModalidad(null) }
    else {
      setErrorModalidad("El campo es obligatorio");
      result = false;
    }
    if (values.duracionSeleccionada.length && values.duracionSeleccionada > 0) {
      setErrorDuracion(null)
    }
    else {
      setErrorDuracion("Seleccione un número de horas valido");
      result = false;
    }
    if (values.fechaExposicion.length) { setErrorFecha("") }
    else {
      setErrorFecha("Seleccióne una fecha");
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

    if (values.descripcion.length) { setErrorDescripcion(null) }
    else {
      setErrorDescripcion("El campo es obligatorio");
      result = false;
    }
    if (values.lugar.length) { setErrorLugar(null) }
    else {
      setErrorLugar("El campo es obligatorio");
      result = false;
    }
    if (values.modalidad.length) { setErrorModalidad(null) }
    else {
      setErrorModalidad("El campo es obligatorio");
      result = false;
    }    
    if (values.duracionSeleccionada.length == null || values.duracionSeleccionada > 0) {
      setErrorDuracion(null)
    }
    else {
      setErrorDuracion("Seleccione un número de horas valido");
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
    if (response == "Actividad registrada correctamente") {
      window.location.href = window.location.href;
    }
    setPopUpRequestPost(false);
    setResponse(null);
  };

  const handleBack = () => {
    window.location.href = './';
  };

  const [currentAcadYear, setCurrentAcadYear] = useState(null);
  useEffect(() => {
    /* Dato quemado desde la tabla User: id_user */
    objService.GetPeriodService(8).then((result) => {
      var CurrentPeriod = result.data.period;
      var CurrentAcadYear = objUtil.GetCurrentYear(CurrentPeriod);
      setCurrentAcadYear(CurrentAcadYear);
    }).catch(() => {
      alert("Error, no hay registros para mostrar");
    });
  }, []);

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
    fd.append("academic_year", currentAcadYear);
    fd.append("type", 4);
    fd.append("student", 36); // Consultar el id del estudiante actual
    fd.append("date_record", now);
    fd.append("date_update", now);
    //fd.append("is_active", true);
    if (send_email) {
      fd.append("send_email", send_email);
      fd.append("state", 2);
    }
    else { fd.append("state", 1); }
    if (archivo !== null) { fd.append("receipt", archivo[0]); }

    objService.PostActivityFour(fd).then((result) => {
      setResponse("Actividad registrada correctamente");
    }).catch(() => {
      setResponse("Ups! Ha ocurrido un error al registrar la actividad, intentelo mas tarde o contacte con el administrador");
    });
    setPopUpRequestPost(true);
    setEmergenteGuardar(false);
    setEmergenteGuardarYEnviar(false);
  }

  return (
    <Grid className={classes.root}>
      <BreadCrumbs />
      <Container className={classes.container}>
        <Card className={classes.card}>
          <Grid className={classes.content}>
            <Typography className={classes.title} variant="h1" align="center" gutterBottom>
              Exposición de resultados parciales de investigación
            </Typography>
            <Divider />
            <form>
              <TextField className={classes.field} fullWidth label="Descripción" name="descripcion" 
                onChange={handleChange} required variant="outlined" 
              />
              {/* Validacion del campo */}
              {errorDescripcion ? <Typography className={classes.validator}> {errorDescripcion} </Typography> : null}
              
              <TextField className={classes.field} name="fechaExposicion" label="Fecha de exposición" type="date"
                InputLabelProps={{ shrink: true }} onChange={handleChange} variant="outlined" required
              />
              {/* Validacion del campo */}
              {errorFecha ? <Typography className={classes.validator}> {errorFecha} </Typography> : null}

              <TextField className={classes.field} fullWidth label="Lugar de la exposición" name="lugar" 
                onChange={handleChange} required variant="outlined"
              />
              {/* Validacion del campo */}
              {errorLugar ? <Typography className={classes.validator}> {errorLugar} </Typography> : null}

              <TextField className={classes.field} fullWidth label="Nombre del evento" name="nombreEvento" 
                onChange={handleChange} required variant="outlined" 
              />
              {/* Validacion del campo */}
              {errorNombreEvento ? <Typography className={classes.validator}> {errorNombreEvento} </Typography> : null}

              <TextField className={classes.field} fullWidth label="Modalidad de presentación" name="modalidad" 
                onChange={handleChange} required variant="outlined" 
              />
              {/* TODO: Comentar */}
              {errorModalidad ? <Typography className={classes.validator}> {errorModalidad} </Typography> : null}

              <TextField className={classes.field} name="duracionSeleccionada" label="Duración en horas" type="number"
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
    </Grid>
  );
};
export default ActivityFourView;
