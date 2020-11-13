import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  Select, MenuItem, Button, Card, Grid, TextField, makeStyles, Container, Typography,
  Divider, Input, InputLabel, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions,
  Slide, FormControl
} from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import BreadCrumbs from 'src/views/teamb/activitiesView/BreadCrumbs';

import service from '../services/service';
import util from '../services/util';

const objService = new service();
const objUtil = new util();

// Transición de la ventana emergente que muestra el resultado de enviar los datos del formulario al backend
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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
  form: {
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
  },
  options: {
    marginTop: '10px',
    marginLeft: '8px'
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
    if ( validar() ) { setEmergenteGuardar(true); }
  };
  // "handleGuardarNo" controla cuando se da click en el botón "NO" de la ventana emergente
  const handleGuardarNo = () => {
    setEmergenteGuardar(false);
  };

  // Valida los datos y lanza la ventana emergente
  const handleGuardarYEnviar = () => {
    if ( validar() ) { setEmergenteGuardarYEnviar(true); }
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
    return result;
  }

  // Costante para definir el estado de la ventana emergente que muestra el resultado de enviar los datos del 
  // formulario al backend
  const [emergenteEnviarBack, setEmergenteEnviarBack] = React.useState(false);

  // Costante para definir el mensaje de la ventana emergente que muestra el resultado de enviar los datos del 
  // formulario al backend
  const [resultadoBack, setResultado] = useState(null);

  const handleEnviarBackAceptar = () => {
    if (resultadoBack == "Actividad registrada correctamente") {
      window.location.href = window.location.href;
    }
    setEmergenteEnviarBack(false);
    setResultado(null);
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
    fd.append("receipt", archivo[0]);

    objService.PostActivityOne(fd).then((result) => {
      setResultado("Actividad registrada correctamente");
    }).catch(() => {
      setResultado("Ups! Ha ocurrido un error al registrar la actividad, verifique los campos o intentelo mas tarde");
    });
    setEmergenteEnviarBack(true);
    setEmergenteGuardar(false);
    setEmergenteGuardarYEnviar(false);
  }

  return (
    <Grid className={classes.root}>
      <BreadCrumbs />
      <Container className={classes.container}>
        <Card className={classes.root}>
          <form className={classes.form}>
            <Typography className={classes.title} variant="h1" align="center" gutterBottom>
              Curso, dirección/revisión de proyectos
            </Typography>
            <Divider />
            <Grid>
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
                <InputLabel>Programa</InputLabel>
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

              <Grid container alignItems="center" className={classes.field}>
                <Grid>
                  <Button variant="contained" component="label" startIcon={<CloudUploadIcon />} >
                    Justificante
                    <Input type="file" name="file" inputProps={{ accept: '.pdf' }} style={{ display: "none" }}
                      onChange={(e) => uploadFile(e.target.files)} 
                    />
                  </Button>
                </Grid>
                &nbsp;
                <Grid id="text-file"> </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.field} />
            <Grid container justify="flex-end">
              {/* Onclick, lanzar la ventana emergente de confirmación cuando se pulsa sobre el botón*/}
              <Button className={classes.options} onClick={handleClose} color="primary" variant="outlined">
                Cancelar
              </Button>
              <Button className={classes.options} onClick={handleGuardar} color="primary" variant="contained"> 
                Guardar 
              </Button>
              <Button className={classes.options} onClick={handleGuardarYEnviar} color="primary" variant="contained"> 
                Guardar y Enviar 
              </Button>
            </Grid>
          </form>
        </Card>

        {/* Lanza la ventana emergente de confirmación cuando se pulsa sobre el botón "Cancelar" */}
        <Dialog open={emergenteCancelar} onClose={handleCancelarNo}>
          <DialogTitle> Mensaje </DialogTitle>
          <DialogContent> ¿Esta seguro que desea salir del registro? </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelarNo} color="primary" autoFocus> No </Button>
            <RouterLink to="../">
              <Button color="primary"> Si </Button>
            </RouterLink>
          </DialogActions>
        </Dialog>

        {/* Lanza la ventana emergente de confirmación cuando se pulsa sobre el botón "Guardar" */}
        <Dialog open={emergenteGuardar} onClose={handleGuardarNo} >
          <DialogTitle> Mensaje </DialogTitle>
          <DialogContent> ¿Esta seguro que desea guardar la actividad? </DialogContent>
          <DialogActions>
            <Button onClick={handleGuardarNo} color="primary"> No </Button>
            <Button color="primary" onClick={SaveActivity} autoFocus> Si </Button>
          </DialogActions>
        </Dialog>

        {/* Lanza la ventana emergente de confirmación cuando se pulsa sobre el botón "Guardar y Enviar" */}
        <Dialog open={emergenteGuardarYEnviar} onClose={handleGuardarYEnviarNo}>
          <DialogTitle> Mensaje </DialogTitle>
          <DialogContent> ¿Esta seguro que desea guardar la actividad y enviar el correo a sus directores? </DialogContent>
          <DialogActions>
            <Button onClick={handleGuardarYEnviarNo} color="primary"> No </Button>
            <Button color="primary" onClick={SaveActivity} autoFocus> Si </Button>
          </DialogActions>
        </Dialog>

        {/* Muestra la respuesta del servidor */}
        <Dialog open={emergenteEnviarBack} TransitionComponent={Transition} keepMounted onClose={handleEnviarBackAceptar}
          aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title"> Mensaje </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              {resultadoBack ? <Typography component={'span'} variant={'body2'}> {resultadoBack} </Typography> : null}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEnviarBackAceptar} color="primary"> Aceptar </Button>
          </DialogActions>
        </Dialog>
        
      </Container>
    </Grid>
  );
};
ActivityOneView.propTypes = {
  className: PropTypes.string
};
export default ActivityOneView;