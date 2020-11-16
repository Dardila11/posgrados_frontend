import React, { useEffect, useState } from 'react';
import {
  Card, Grid, TextField, makeStyles, Container, Typography, Divider, InputLabel, Select, MenuItem, FormControl
} from '@material-ui/core';

import BreadCrumbs from 'src/views/teamb/activitiesView/BreadCrumbs';
import PDFUpload from 'src/views/teamb/activitiesView/UploadPDF';
import FormOption from 'src/views/teamb/activitiesView/FormOption';
import ConfirmOption from 'src/views/teamb/activitiesView/ConfirmOption';
import Response from 'src/views/teamb/activitiesView/Response';
import SelectField from 'src/views/teamb/activitiesView/SelectField';

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

const tipo = [
  { value: 'T1', label: 'Interna' },
  { value: 'T2', label: 'Externa' },
];

const ActivitySixView = () => {
  const classes = useStyles();
  // Estado que controla los valores del formulario
  const [values, setValues] = useState({
    nombreProyecto: '',
    investigadorSeleccionado: '',
    lugarTrabajo: '',
    descripcion: '',
    lineaSeleccionada: '',
    codigoVRI: 0,
    convocatoria: '',
    tipoSeleccionado: '',
    fechaInicio: '',
    fechaFin: ''
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

  const [errorNombreProyecto, setErrorNombreProyecto] = useState(null);
  const [errorNombreInvestigador, setErrorNombreInvestigador] = useState(null);
  const [errorLugarTrabajo, setErrorLugarTrabajo] = useState(null);
  const [errorDescripcion, setErrorDescripcion] = useState(null);
  const [errorLinea, setErrorLinea] = useState(null);
  const [errorCodigoVRI, setErrorCodigoVRI] = useState(null);
  const [errorConvocatoria, setErrorConvocatoria] = useState(null);
  const [errorTipo, setErrorTipo] = useState(null);
  const [errorFechas, setErrorFechas] = useState(null);
  const [errorFile, setErrorFile] = useState(null);

  //"validar" permite verificar que todos los campos requeridos se encuentren diligenciados 
  const validar = () => {
    var result = true;

    if (values.nombreProyecto.length) { setErrorNombreProyecto(null) }
    else {
      setErrorNombreProyecto("El campo es obligatorio");
      result = false;
    }
    if (values.investigadorSeleccionado != "") { setErrorNombreInvestigador(null) }
    else {
      setErrorNombreInvestigador("Seleccione una opción válida");
      result = false;
    }
    if (values.lugarTrabajo.length) { setErrorLugarTrabajo(null) }
    else {
      setErrorLugarTrabajo("El campo es obligatorio");
      result = false;
    }
    if (values.descripcion.length) { setErrorDescripcion(null) }
    else {
      setErrorDescripcion("El campo es obligatorio");
      result = false;
    }
    if (values.lineaSeleccionada != "") { setErrorLinea(null) }
    else {
      setErrorLinea("Seleccione una opción válida");
      result = false;
    }
    if (values.codigoVRI.length && values.codigoVRI > 0) { setErrorCodigoVRI(null) }
    else {
      setErrorCodigoVRI("Código invalido");
      result = false;
    }
    if (values.convocatoria.length) { setErrorConvocatoria(null) }
    else {
      setErrorConvocatoria("El campo es obligatorio");
      result = false;
    }
    if (values.tipoSeleccionado != "") { setErrorTipo(null) }
    else {
      setErrorTipo("Seleccione una opción válida");
      result = false;
    }
    if (values.fechaInicio.length && values.fechaFin.length) {
      if (values.fechaInicio <= values.fechaFin) { setErrorFechas("") }
      else {
        setErrorFechas("La fecha Fin del proyecto debe ser después de la fecha de inicio del proyecto");
        result = false;
      }
    }
    else {
      setErrorFechas("Seleccióne fechas de inicio y fin del proyecto válidas");
      result = false;
    }
    var textFile = document.getElementById("text-file").textContent;
    if (textFile.length > 0) { setErrorFile(null) }
    else {
      setErrorFile("Es necesario subir el archivo");
      result = false;
    }
    return result
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
    fd.append("name", values.nombreProyecto);
    fd.append("description", values.descripcion);
    fd.append("start_date", values.fechaInicio);
    fd.append("end_date", values.fechaFin);
    fd.append("place", values.lugarTrabajo);
    fd.append("code_VRI", values.codigoVRI);
    fd.append("convocation", values.convocatoria);
    fd.append("type_convocation", values.tipoSeleccionado);
    fd.append("investigation_line", values.lineaSeleccionada);
    fd.append("investigator", values.investigadorSeleccionado);
    // Datos adicionales
    fd.append("academic_year", currentAcadYear);
    fd.append("type", 6);
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

    objService.PostActivitySix(fd).then((result) => {
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
              Participación en proyectos de investigación
            </Typography>
            <Divider />
            <form>
              <TextField className={classes.field} fullWidth label="Nombre del proyecto" name="nombreProyecto" 
                onChange={handleChange} required variant="outlined" 
              />
              {/* Validacion del campo */}
              {errorNombreProyecto ? <Typography className={classes.validator}> {errorNombreProyecto} </Typography> : null}

              <SelectField name="investigadorSeleccionado" label="Investigador" handleChange={handleChange} />
              {/* Validacion del campo */}
              {errorNombreInvestigador ? <Typography className={classes.validator}> {errorNombreInvestigador} </Typography> : null}

              <TextField className={classes.field} fullWidth label="Lugar de trabajo" name="lugarTrabajo" onChange={handleChange} 
                required variant="outlined" 
              />
              {/* Validacion del campo */}
              {errorLugarTrabajo ? <Typography className={classes.validator}> {errorLugarTrabajo} </Typography> : null}

              <TextField className={classes.field} fullWidth label="Descripción de actividad" name="descripcion" 
                onChange={handleChange} required variant="outlined" 
              />
              {/* Validacion del campo */}
              {errorDescripcion ? <Typography className={classes.validator}> {errorDescripcion} </Typography> : null}

              <SelectField name="lineaSeleccionada" label="Linea de investigación" handleChange={handleChange} />
              {/* Validacion del campo */}
              {errorLinea ? <Typography className={classes.validator}> {errorLinea} </Typography> : null}

              <TextField className={classes.field} name="codigoVRI" label="Codigo VRI" type="number"
                onChange={handleChange} required variant="outlined"
              />
              {/* Validacion del campo */}
              {errorCodigoVRI ? <Typography className={classes.validator}> {errorCodigoVRI} </Typography> : null}

              <TextField className={classes.field} fullWidth label="Convocatoria" name="convocatoria" 
                onChange={handleChange} required variant="outlined"
              />
              {/* Validacion del campo */}
              {errorConvocatoria ? <Typography className={classes.validator}> {errorConvocatoria} </Typography> : null}

              <FormControl className={classes.field} fullWidth required variant="outlined">
                <InputLabel> Tipo de convocatoria </InputLabel>
                <Select defaultValue={0} onChange={handleChange} label="Tipo de convocatoria" name="tipoSeleccionado">
                  <MenuItem disabled value={0}> Seleccione una opción... </MenuItem>
                  {tipo.map(element => (
                    <MenuItem key={element.value} value={element.label}> { element.label} </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* Validacion del campo */}
              {errorTipo ? <Typography className={classes.validator}> {errorTipo} </Typography> : null}

              {/*justify="space-evenly"*/}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField fullWidth className={classes.field} name="fechaInicio" label="Fecha de inicio" type="date"
                    InputLabelProps={{ shrink: true }} onChange={handleChange} variant="outlined" required
                  />
                  {/* Validacion del campo */}
                  {errorFechas ? <Typography className={classes.validator}> {errorFechas} </Typography> : null}
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth className={classes.field} name="fechaFin" label="Fecha de fin" type="date"
                    InputLabelProps={{ shrink: true }} onChange={handleChange} variant="outlined"
                  />
                  {/* Validacion del campo */}
                  {errorFechas ? <Typography className={classes.validator}> {errorFechas} </Typography> : null}
                </Grid>
              </Grid>
              
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
export default ActivitySixView;