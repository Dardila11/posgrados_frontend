import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Select, MenuItem, Card, Grid, TextField, makeStyles, Container, Typography, Divider, InputLabel, FormControl
} from '@material-ui/core';

import BreadCrumbs from 'src/views/teamb/activitiesView/BreadCrumbs';
import PDFUpload from 'src/views/teamb/activitiesView/UploadPDF';
import FormOption from 'src/views/teamb/activitiesView/FormOption';
import ConfirmOption from 'src/views/teamb/activitiesView/ConfirmOption';
import Response from 'src/views/teamb/activitiesView/Response';

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

const ActivityOneView = ({ className, ...rest }) => {
  const classes = useStyles();
  // Estado que controla los valores del formulario
  const [values, setValues] = useState({
    titulo: '',
    descripcion: '',
    programaSeleccionado: '',
    horasAsignadas: 0,
    fechaInicio: '',
    fechaFin: '',
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const [statePrograms, setStatePrograms] = useState({
    programs: []
  })

  useEffect(() => {
    objService.GetPrograms().then((result) => {
      var dataPrograms = result.data;
      setStatePrograms({ programs: dataPrograms });
    }).catch(() => {
      alert("No hay programas registrados");
    });
  }, []);

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

  // Costantes para controlar las validaciones del formulario
  const [errorTitulo, setErrorTitulo] = useState(null);
  const [errorDescripcion, setErrorDescripcion] = useState(null);
  const [errorPrograma, setErrorPrograma] = useState(null);
  const [errorHoras, setErrorHoras] = useState(null);
  const [errorFechas, setErrorFechas] = useState(null);
  const [errorFile, setErrorFile] = useState(null);

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

  // Permite verificar que todos los campos requeridos se encuentren diligenciados 
  const validar = () => {
    var result = true;

    if (values.titulo.length) { setErrorTitulo(null) }
    else {
      setErrorTitulo("El campo es obligatorio")
      result = false;
    }
    if (values.descripcion.length) { setErrorDescripcion(null) }
    else {
      setErrorDescripcion("El campo es obligatorio")
      result = false;
    }
    if (values.programaSeleccionado != "") { setErrorPrograma(null) }
    else {
      setErrorPrograma("Seleccione una opción válida")
      result = false;
    }
    if (values.horasAsignadas.length && values.horasAsignadas > 0) { setErrorHoras(null) }
    else {
      setErrorHoras("Seleccione un número de horas valido")
      result = false;
    }
    if (values.fechaInicio.length && values.fechaFin.length) {
      if (values.fechaInicio <= values.fechaFin) { setErrorFechas("") }
      else {
        setErrorFechas("La fecha de finalización debe ser después de la fecha de inicio")
        result = false;
      }
    }
    else {
      setErrorFechas("Seleccióne una fecha inicial y una fecha final válidas")
      result = false;
    }
    var textFile = document.getElementById("text-file").textContent;
    if (textFile.length > 0) { setErrorFile(null) }
    else {
      setErrorFile("Es necesario subir el justificante")
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
    window.location.href='./';
  };

  const SaveActivity = () => {
    var now = objUtil.GetCurretTimeDate();
    /* Se captura el valor booleano de "emergenteGuardarYEnviar", para saber si se enviara en el
    documento JSON, la validacion para el correo */
    var send_email = emergenteGuardarYEnviar;

    const fd = new FormData();
    fd.append("title", values.titulo);
    fd.append("description", values.descripcion);
    fd.append("state", 1);
    fd.append("program", values.programaSeleccionado);
    fd.append("start_date", values.fechaInicio);
    fd.append("end_date", values.fechaFin);
    fd.append("academic_year", "2020-21"); // Consultar año academico actual 
    fd.append("assigned_hours", values.horasAsignadas);
    fd.append("type", 1);
    fd.append("student", 36); // Consultar el id del estudiante actual
    fd.append("date_record", now);
    fd.append("date_update", now);
    if (send_email) { fd.append("send_email", send_email); }
    if (archivo !== null) { fd.append("receipt", archivo[0]); }

    objService.PostActivityOne(fd).then((result) => {
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
        <Card className={classes.root}>
          <Grid className={classes.content}>
            <Typography className={classes.title} variant="h1" align="center" gutterBottom>
              Curso, dirección/revisión de proyectos
            </Typography>
            <Divider />
            <form>
              <TextField className={classes.field} fullWidth label="Titulo" name="titulo" onChange={handleChange}
                required variant="outlined"
              />
              {/* Validacion del campo */}
              {errorTitulo ? <Typography className={classes.validator}> {errorTitulo} </Typography> : null}

              <TextField className={classes.field} fullWidth label="Descripcion" name="descripcion"
                onChange={handleChange} required value={values.descripcion} variant="outlined"
              />
              {/* Validacion del campo */}
              {errorDescripcion ? <Typography className={classes.validator}> {errorDescripcion} </Typography> : null}

              <FormControl className={classes.field} fullWidth required variant="outlined">
                <InputLabel> Programa </InputLabel>
                <Select defaultValue={0} onChange={handleChange} label="Programa" name="programaSeleccionado">
                  <MenuItem disabled value={0}> Seleccione una opción... </MenuItem>
                  {statePrograms.programs.map(element => (
                    <MenuItem key={element.id} value={element.id}> {element.name} </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* Validacion del campo */}
              {errorPrograma ? <Typography className={classes.validator}> {errorPrograma} </Typography> : null}

              {/*justify="space-evenly"*/}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField fullWidth className={classes.field} name="fechaInicio" label="Fecha inicio" type="date"
                    InputLabelProps={{ shrink: true }} onChange={handleChange} variant="outlined" required
                  />
                  {/* Validacion del campo */}
                  {errorFechas ? <Typography className={classes.validator}> {errorFechas} </Typography> : null}
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth className={classes.field} name="fechaFin" label="Fecha fin" type="date"
                    InputLabelProps={{ shrink: true }} onChange={handleChange} variant="outlined"
                  />
                  {/* Validacion del campo */}
                  {errorFechas ? <Typography className={classes.validator}> {errorFechas} </Typography> : null}
                </Grid>
              </Grid>

              <TextField className={classes.field} name="horasAsignadas" label="Horas asignadas" type="number"
                onChange={handleChange} required variant="outlined"
              />
              {/* Validacion del campo */}
              {errorHoras ? <Typography className={classes.validator}> {errorHoras} </Typography> : null}

              <PDFUpload uploadFile={uploadFile} />
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
ActivityOneView.propTypes = {
  className: PropTypes.string
};
export default ActivityOneView;