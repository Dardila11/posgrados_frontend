import React, { useEffect, useState } from 'react';
import {
  Card, Grid, TextField, makeStyles, Container, Typography, Divider
} from '@material-ui/core';

import BreadCrumbs from 'src/views/teamb/activitiesView/components/BreadCrumbs';
import PDFUpload from 'src/views/teamb/activitiesView/components/UploadPDF';
import FormOption from 'src/views/teamb/activitiesView/components/FormOption';
import ConfirmOption from 'src/views/teamb/activitiesView/components/ConfirmOption';
import Response from 'src/views/teamb/activitiesView/components/Response';
import SelectField from 'src/views/teamb/activitiesView/components/SelectField';

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

export const ActivityTwoEdit = ({state, callbackDialogOpen}) => {
  const classes = useStyles();
  // Estado que controla los valores del formulario
  const [values, setValues] = useState({
    titulo: state.title,
    descripcion: state.descripcion,
    nombreEvento: state.name,
    lugarCelebracion: state.place,
    institucionSeleccionada: state.institution,
    fechaRealizacion: state.start_date,
  });

  console.log(state);
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
    objService.PutActivityTwoEdit({
      title:values.titulo, 
      id:state.id, 
      description:values.descripcion,
      /*receipt:"http://mdquilindo.pythonanywhere.com/media/b_activities_app/archivos/PDF_ejemplo.pdf", */
      start_date:values.fechaInicio, 
      end_date:values.fechaFin,
      place:values.lugarCelebracion, 
      academic_year:2018,
      institution:values.institucionSeleccionada,
      date_record:"2020-11-08T12:15:55-05:00",
      date_update:"2020-11-08T12:15:56-05:00",
      name:values.nombreEvento,
      }).then((request)=>console.log("Actividad editada")).catch(()=>console.log("No se guardo"))
  callbackDialogOpen(false);
  if (validar()) { setEmergenteGuardar(true); }
};
  // "handleGuardarNo" controla cuando se da click en el botón "NO" de la ventana emergente
  const handleGuardarNo = () => {
    setEmergenteGuardar(false);
  };

  // Valida los datos y lanza la ventana emergente
  const handleGuardarYEnviar = () => {
    if (validar()) { setEmergenteGuardarYEnviar(true); }
  };
  // Controla cuando se da click en el botón "NO" de la ventana emergente
  const handleGuardarYEnviarNo = () => {
    setEmergenteGuardarYEnviar(false);
  };

  const [errorTitulo, setErrorTitulo] = useState(null);
  const [errorDescripcion, setErrorDescripcion] = useState(null);
  const [errorNombreEvento, setErrorNombreEvento] = useState(null);
  const [errorLugar, setErrorLugar] = useState(null);
  const [errorInstitucion, setErrorInstitucion] = useState(null);
  const [errorFecha, setErrorFecha] = useState(null);
  const [errorFile, setErrorFile] = useState(null);

  const  resetError = () => {
    setErrorTitulo(null);
    setErrorDescripcion(null);
    setErrorNombreEvento(null);
    setErrorLugar(null);
    setErrorInstitucion(null);
    setErrorFecha(null);
    setErrorFile(null);
  }
  // Permite verificar que todos los campos requeridos se encuentren diligenciados 
  const validar = () => {
    resetError();
    var result = true;

    if (values.titulo.length) { setErrorTitulo(null) }
    else {
      setErrorTitulo("El campo es obligatorio");
      result = false;
    }
    if (values.descripcion.length) { setErrorDescripcion(null) }
    else {
      setErrorDescripcion("El campo es obligatorio");
      result = false;
    }
    if (values.nombreEvento.length) { setErrorNombreEvento(null) }
    else {
      setErrorNombreEvento("El campo es obligatorio");
      result = false;
    }
    if (values.lugarCelebracion.length) { setErrorLugar(null) }
    else {
      setErrorLugar("El campo es obligatorio");
      result = false;
    }
    if (values.institucionSeleccionada != "") { setErrorInstitucion(null) }
    else {
      setErrorInstitucion("Seleccione una opción válida");
      result = false;
    }
    if (values.fechaRealizacion.length) { setErrorFecha("") }
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
    // Permite verificar que todos los campos requeridos se encuentren diligenciados en Guardar
    const validarGuardar = () => {
      resetError();
      var result = true;
  
      if (values.titulo.length) { setErrorTitulo(null) }
      else {
        setErrorTitulo("El campo es obligatorio");
        result = false;
      }
      if (values.descripcion.length) { setErrorDescripcion(null) }
      else {
        setErrorDescripcion("El campo es obligatorio");
        result = false;
      }
      if (values.nombreEvento.length) { setErrorNombreEvento(null) }
      else {
        setErrorNombreEvento("El campo es obligatorio");
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
    /* Se captura el valor booleano de "emergenteGuardarYEnviar", para saber si se enviara en el
    documento JSON, la validacion para el correo */
    var send_email = emergenteGuardarYEnviar;

    const fd = new FormData();
    fd.append("title", values.titulo);
    fd.append("description", values.descripcion);
    fd.append("name", values.nombreEvento);
    fd.append("place", values.lugarCelebracion);
    fd.append("institution", values.institucionSeleccionada);
    fd.append("start_date", values.fechaRealizacion);
    // Datos adicionales
    fd.append("academic_year", currentAcadYear);
    fd.append("type", 2);
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

    objService.PostActivityTwo(fd).then((result) => {
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
      <Container >
        <Card >
          <Grid >
            <Typography variant="h1" align="center" gutterBottom>
              Ponencias en congreso, simposios y/o jornadas
            </Typography>
            <Divider />
            <form>
              <TextField className={classes.field} fullWidth label="Titulo de la contribución" value={values.titulo} name="titulo"
                onChange={handleChange} required variant="outlined"
              />
              {/* Validacion del campo */}
              {errorTitulo ? <Typography className={classes.validator}> {errorTitulo} </Typography> : null}

              <TextField className={classes.field} fullWidth label="Descripcion general" value={values.descripcion} name="descripcion"
                onChange={handleChange} required variant="outlined"
              />
              {/* Validacion del campo */}
              {errorDescripcion ? <Typography className={classes.validator}> {errorDescripcion} </Typography> : null}

              <TextField className={classes.field} fullWidth label="Nombre del evento" value={values.nombreEvento} name="nombreEvento"
                onChange={handleChange} required variant="outlined"
              />
              {/* Validacion del campo */}
              {errorNombreEvento ? <Typography className={classes.validator}> {errorNombreEvento} </Typography> : null}

              <SelectField name="institucionSeleccionada" label="Entidad organizadora" value={values.institucionSeleccionada} handleChange={handleChange} />
              {/* Validacion del campo */}
              {errorInstitucion ? <Typography className={classes.validator}> {errorInstitucion} </Typography> : null}

              <TextField className={classes.field} fullWidth label="Lugar de celebracion" value={values.lugarCelebracion} name="lugarCelebracion"
                onChange={handleChange} required variant="outlined"
              />
              {/* Validacion del campo */}
              {errorLugar ? <Typography className={classes.validator}> {errorLugar} </Typography> : null}

              <TextField className={classes.field} x name="fechaRealizacion" value={values.fechaRealizacion} label="Fecha de realización" type="date"
                InputLabelProps={{ shrink: true }} onChange={handleChange} variant="outlined" required
              />
              {errorFecha ? <Typography className={classes.validator}> {errorFecha} </Typography> : null}

              <PDFUpload uploadFile={uploadFile} name="Justificante" />
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
export default ActivityTwoEdit;
