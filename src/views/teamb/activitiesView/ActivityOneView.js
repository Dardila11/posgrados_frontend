import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Select, MenuItem, Box, Button, Card, CardContent, Grid, TextField, makeStyles, Container, Typography, Divider, Input, InputLabel } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import BreadCrumbs from 'src/views/teamb/activitiesView/BreadCrumbs';

import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

import service from '../services/service';
import util from '../services/util';

//Transición  de la ventana emergente que muestra 
//el resultado de enviar los datos del formulario al backend
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const objService = new service();
const objUtil = new util();

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

const ActivityOneView = ({ className, ...rest }) => {
  var fecha = new Date;
  const classes = useStyles();
  //TODO: Comentar 
  const [values, setValues] = useState({
    titulo: '',
    descripcion: '',
    programaSeleccionado: '',
    horasAsignadas: 0,
    fechaInicio: '',
    fechaFin: '',
  });
  //Asignamos a "programaSeleccionado" el valor de "event.target.value"
  const handleProgramas = (event) => {
    setValues({
      ...values,
      programaSeleccionado: event.target.value
    });
  };
  //programs list

  const [NumPrograms, setPrograms] = useState({
    programs: []
  })

  useEffect(() => {
    /* Dato quemado desde la tabla User: id_user */
    objService.GetPrograms().then((result) => {
      var dataPrograms = result.data;
      setPrograms({ programs: dataPrograms });

    }).catch(() => {
      alert("Error, no hay registros para mostrar");
    });
  }, []);

  //Asignamos a "HorasSeleccionado" el valor de "event.target.value"
  const handleHoras = (event) => {
    setValues({
      ...values,
      horasAsignadas: event.target.value
    });
  };
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
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
  const [errorTitulo, setErrorTitulo] = useState(null);
  const [errorDescripcion, setErrorDescripcion] = useState(null);
  const [errorPrograma, setErrorPrograma] = useState(null);
  const [errorHoras, setErrorHoras] = useState(null);
  const [errorFechas, setErrorFechas] = useState(null);

  // Costante para definir el estado de la ventana emergente que muestra 
  //el resultado de enviar los datos del formulario al backend
  const [emergenteEnviarBack, setEmergenteEnviarBack] = React.useState(false);

  // Costante para definir el mensaje de la ventana emergente que muestra 
  //el resultado de enviar los datos del formulario al backend
  const [resultadoBack, setResultadoBack] = useState(null);

  const handleEnviarBackAceptar = () => {
    if (resultadoBack == "Actividad registrada correctamente") {
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
    if (validar()) {
      setEmergenteGuardar(true);
    }

  };

  // "handleCancelarNo" controla cuando se da click en el botón "NO" de la ventana emergente
  const handleGuardarNo = () => {
    setEmergenteGuardar(false);
  };
  //"validar" permite verificar que todos los campos requeridos se encuentren diligenciados 
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
    if (values.programaSeleccionado != "") {
      setErrorPrograma(null)
    }
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
  //TODO: Comentar
  const handleGuardarYEnviar = () => {

    if (validar()) {
      setEmergenteGuardarYEnviar(true);
    }
  };

  const handleGuardarYEnviarNo = () => {
    setEmergenteGuardarYEnviar(false);
  };

  const [archivo, setArchivo] = useState(null);

  const uploadFile = e => {
    setArchivo(e);
  }

  const SaveActivity = () => {
    var vartitulo = document.getElementById("titulo").value;
    var vardescripcion = document.getElementById("descripcion").value;
    var vardate1 = document.getElementById("date1").value;
    var vardate2 = document.getElementById("date2").value;
    var varnumber = document.getElementById("number").value;
    var now = objUtil.GetCurretTimeDate();
    //Se captura el valor booleano de "emergenteGuardarYEnviar" y se envía en el 
    //documento JSON con el fin de saber si se debe enviar el email a quien corresponda
    var send_email = emergenteGuardarYEnviar;

    const fd = new FormData();

    fd.append("title", vartitulo);
    fd.append("description", vardescripcion);
    fd.append("state", 1);
    fd.append("program", values.programaSeleccionado);
    fd.append("start_date", vardate1);
    fd.append("end_date", vardate2);
    fd.append("academic_year", "2020-21"); // Consultar año academico actual 
    fd.append("assigned_hours", varnumber);
    fd.append("type", 1);
    fd.append("student", 36); // Consultar el id del estudiante actual
    fd.append("date_record", now);
    fd.append("date_update", now);
    fd.append("send_email", send_email);
    fd.append("receipt", archivo[0]);

    objService.PostActivityOne(fd).then((result) => {
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
              <h1 style={{ display: 'flex', align: 'center', justifyContent: 'center' }} align="center" name="crearactividad">
                Curso, dirección/revisión de proyectos
              </h1>
              <br></br>
              <Divider />
              <CardContent >
                <br></br>
                <Grid item md={12} xs={12}>
                  <TextField fullWidth label="Titulo" id="titulo" name="titulo" onChange={handleChange} required
                    value={values.titulo} variant="outlined"
                  />
                  {/* TODO: Comentar */}
                  {errorTitulo ? <p style={{ display: 'flex', color: 'red' }}>{errorTitulo}</p> : null}
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Descripcion" id="descripcion" name="descripcion" onChange={handleChange} required
                    value={values.descripcion} variant="outlined" />
                  {/* TODO: Comentar */}
                  {errorDescripcion ? <p style={{ display: 'flex', color: 'red' }}>{errorDescripcion}</p> : null}
                  <br></br>
                  <br></br>
                  <InputLabel>Programa *</InputLabel>
                  <Select fullWidth label="Programa" id="programa" type="select" defaultValue
                    variant="outlined" onChange={handleProgramas}
                  >
                    {NumPrograms.programs.map(element => (
                      <MenuItem key={element.id} value={element.id}> {element.name} </MenuItem>
                    ))}
                  </Select>
                  {/* TODO: Comentar */}
                  {errorPrograma ? <p style={{ display: 'flex', color: 'red' }}>{errorPrograma}</p> : null}
                  <br></br>
                  <br></br>
                  <br></br>
                  <Grid container spacing={3} container justify="space-around">
                    <Grid>
                      <TextField id="date1" name="date1" label="Fecha inicio" type="date" className={classes.textField}
                        InputLabelProps={{ shrink: true }} onChange={handleFechaInicio}
                      />
                    </Grid>
                    <Grid>
                      <TextField id="date2" name="date2" label="Fecha fin" type="date" className={classes.textField}
                        InputLabelProps={{ shrink: true }} onChange={handleFechaFin}
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                  {errorFechas ? <p style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>{errorFechas}</p> : null}
                  <br></br>
                  <TextField id="number" label="Número de horas asignadas" type="number" InputLabelProps={{ shrink: true, }}
                    onChange={handleHoras} variant="outlined"
                  />
                  {/* TODO: Comentar */}
                  {errorHoras ? <p style={{ display: 'flex', color: 'red' }}>{errorHoras}</p> : null}
                  <br></br>
                  <br></br>
                  <InputLabel>Justificante *</InputLabel>
                  <Input type="file" name="file" inputProps={{ accept: '.pdf' }} onChange={(e) => uploadFile(e.target.files)} />
                </Grid>
                <br></br>
              </CardContent>

              <Box display="flex" justifyContent="flex-end" p={2}>
                {/* Se le agrega la propiedad onClick para lanzar la ventana emergente de 
                confirmación cuando se pulsa sobre el botón cancelar, se debe quitar la propiedad RouterLink */}
                <Button onClick={handleClose} color="primary" variant="outlined">Cancelar</Button> &nbsp;

            <Button onClick={handleGuardar} color="primary" variant="contained"> Guardar </Button> &nbsp;

            <Button onClick={handleGuardarYEnviar} color="primary" variant="contained"> Guardar y Enviar </Button>
              </Box>
            </Card>
          </form>

          {/*HTML que lanza la ventana emergente de confirmación cuando se pulsa sobre el botón "cancelar" 
          en "Crear Actividad" */}
          <Dialog open={emergenteCancelar} onClose={handleCancelarNo}>
            <DialogTitle id="alert-dialog-title">{"¿Esta seguro que desea cancelar?"}</DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelarNo} color="primary" autoFocus>No</Button>
              <RouterLink to="../">
                <Button color="primary">Si</Button>
              </RouterLink>
            </DialogActions>
          </Dialog>

          {/*HTML que lanza la ventana emergente de confirmación cuando se pulsa sobre el botón "GUARDAR" 
          en "Crear Actividad" */}
          <Dialog open={emergenteGuardar} onClose={handleGuardarNo} >
            <DialogTitle id="alert-dialog-title">{"¿Esta seguro que desea guardar la actividad?"}</DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
              {/* TODO: Enviar a backend y guardar */}
              <Button onClick={handleGuardarNo} color="primary" autoFocus>No</Button>
              <Button color="primary" onClick={SaveActivity} >Si</Button>
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
          <Dialog open={emergenteEnviarBack} TransitionComponent={Transition} keepMounted onClose={handleEnviarBackAceptar}
            aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Resultado"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {resultadoBack ? <Typography component={'span'} variant={'body2'}>{resultadoBack}</Typography> : null}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEnviarBackAceptar} color="primary"> Aceptar </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Container>
    </div>
  );
};
ActivityOneView.propTypes = {
  className: PropTypes.string
};
export default ActivityOneView;