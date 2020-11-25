import React, { useEffect, useState } from 'react';
import {
  Card, Grid, TextField, makeStyles, Container, Typography, Divider, InputLabel, Select, MenuItem, FormControl
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

const tipo = [
  { value: 'T1', label: 'Artículo de revista' },
  { value: 'T2', label: 'Acta de congreso' },
  { value: 'T3', label: 'Libro' },
  { value: 'T4', label: 'Otras publicaciones' }
];

const ActivityThreeView = () => {
  const classes = useStyles();
  // Estado que controla los valores del formulario
  const [values, setValues] = useState({
    titulo: '',
    tipoSeleccionado: '',
    nombre: '',
    autores: '',
    editorial: '',
    datosGenerales: '',
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

  const [errorTitulo, setErrorTitulo] = useState(null);
  const [errorTipo, setErrorTipo] = useState(null);
  const [errorNombre, setErrorNombre] = useState(null);
  const [errorAutores, setErrorAutores] = useState(null);
  const [errorEditorial, setErrorEditorial] = useState(null);
  const [errorDatosGenerales, setErrorDatosGenerales] = useState(null);
  const [errorStartDate, setErrorStartDate] = useState(null);
  const [errorEndDate, setErrorEndDate] = useState(null);
  const [errorFile, setErrorFile] = useState(null);

  const  resetError = () => {
    setErrorTitulo(null);
    setErrorTipo(null);
    setErrorNombre(null);
    setErrorAutores(null);
    setErrorEditorial(null);
    setErrorDatosGenerales(null);
    setErrorStartDate(null);
    setErrorEndDate(null);
    setErrorFile(null);
  }

  //"validar" permite verificar que todos los campos requeridos se encuentren diligenciados 
  const validarGuardarYEnviar = () => {
    resetError();
    var result = true;

    if (values.titulo.length) { setErrorTitulo(null) }
    else {
      setErrorTitulo("El campo es obligatorio");
      result = false;
    }
    if (values.tipoSeleccionado != "") { setErrorTipo(null) }
    else {
      setErrorTipo("Seleccione una opción válida");
      result = false;
    }
    if (values.nombre.length) { setErrorNombre(null) }
    else {
      setErrorNombre("El campo es obligatorio");
      result = false;
    }
    if (values.autores.length) { setErrorAutores(null) }
    else {
      setErrorAutores("El campo es obligatorio");
      result = false;
    }
    if (values.editorial.length) { setErrorEditorial(null) }
    else {
      setErrorEditorial("El campo es obligatorio");
      result = false;
    }
    if (values.datosGenerales.length) { setErrorDatosGenerales(null) }
    else {
      setErrorDatosGenerales("El campo es obligatorio");
      result = false;
    }
    if (values.fechaInicio.length ) {
      setErrorStartDate("") 
    }
    else {
      setErrorStartDate("Seleccióne una fecha de envió publicación válida")
      result = false;
    }
    if (values.fechaFin.length) {
      if (values.fechaInicio <= values.fechaFin) { setErrorEndDate("") }
      else {
        setErrorEndDate("La fecha de publicación debe ser después de la fecha de envió")
        result = false;
      }
    }
    else {
      setErrorEndDate("Seleccióne una fecha de publicación válida")
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
  //"validar" permite verificar que todos los campos requeridos se encuentren diligenciados en Guardar
  const validarGuardar = () => {
    resetError();
    var result = true;

    if (values.titulo.length) { setErrorTitulo(null) }
    else {
      setErrorTitulo("El campo es obligatorio");
      result = false;
    }
    if (values.tipoSeleccionado != "") { setErrorTipo(null) }
    else {
      setErrorTipo("Seleccione una opción válida");
      result = false;
    }
    if (values.nombre.length) { setErrorNombre(null) }
    else {
      setErrorNombre("El campo es obligatorio");
      result = false;
    }
    if (values.fechaInicio.length) {
      setErrorStartDate("") 
    }
    else {
      setErrorStartDate("Seleccióne una fecha de envió publicación válida")
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
    fd.append("title", values.titulo);
    fd.append("type_publication", values.tipoSeleccionado);
    fd.append("name", values.nombre);
    fd.append("authors", values.autores);
    fd.append("editorial", values.editorial);
    fd.append("general_data", values.datosGenerales);
    fd.append("start_date", values.fechaInicio);
    fd.append("end_date", values.fechaFin);
    // Datos adicionales
    fd.append("academic_year", currentAcadYear);
    fd.append("type", 3);
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

    objService.PostActivityThree(fd).then((result) => {
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
              Publicaciones
            </Typography>
            <Divider />
            <form>
              <TextField className={classes.field} fullWidth label="Titulo del articulo, capitulo, libro, monografia..."
                name="titulo" onChange={handleChange} required variant="outlined"
              />
              {/* Validacion del campo */}
              {errorTitulo ? <Typography className={classes.validator}> {errorTitulo} </Typography> : null}

              <FormControl className={classes.field} fullWidth required variant="outlined">
                <InputLabel> Tipo de publicación </InputLabel>
                <Select defaultValue={0} onChange={handleChange} label="Tipo de publicación" name="tipoSeleccionado">
                  <MenuItem disabled value={0}> Seleccione una opción... </MenuItem>
                  {tipo.map(element => (
                    <MenuItem key={element.value} value={element.label}> { element.label} </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {/* Validacion del campo */}
              {errorTipo ? <Typography className={classes.validator}> {errorTipo} </Typography> : null}

              <TextField className={classes.field} fullWidth label="Nombre de la publicación o titulo del libro" 
                name="nombre" onChange={handleChange} required variant="outlined" 
              />
              {/* Validacion del campo */}
              {errorNombre ? <Typography className={classes.validator}> {errorNombre} </Typography> : null}
              
              <TextField className={classes.field} fullWidth label="Autores" name="autores" onChange={handleChange} 
                required variant="outlined" 
              />
              {/* Validacion del campo */}
              {errorAutores ? <Typography className={classes.validator}> {errorAutores} </Typography> : null}

              <TextField className={classes.field} fullWidth label="Nombre de la editorial" name="editorial" 
                onChange={handleChange} required variant="outlined" 
              />
              {/* Validacion del campo */}
              {errorEditorial ? <Typography className={classes.validator}> {errorEditorial} </Typography> : null}

              <TextField className={classes.field} fullWidth label="Datos generales del tipo de publicación" 
                name="datosGenerales" onChange={handleChange} required variant="outlined"
              />
              {/* Validacion del campo */}
              {errorDatosGenerales ? <Typography className={classes.validator}> {errorDatosGenerales} </Typography> : null}

              {/*justify="space-evenly"*/}
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField fullWidth className={classes.field} name="fechaInicio" label="Envío publicación" type="date"
                    InputLabelProps={{ shrink: true }} onChange={handleChange} variant="outlined" required
                  />
                  {/* Validacion del campo */}
                  {errorStartDate ? <Typography className={classes.validator}> {errorStartDate} </Typography> : null}
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth className={classes.field} name="fechaFin" label="Fecha de publicación" type="date"
                    InputLabelProps={{ shrink: true }} onChange={handleChange} variant="outlined"
                  />
                  {/* Validacion del campo */}
                  {errorEndDate ? <Typography className={classes.validator}> {errorEndDate} </Typography> : null}
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
export default ActivityThreeView;
