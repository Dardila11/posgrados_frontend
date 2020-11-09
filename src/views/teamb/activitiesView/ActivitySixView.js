import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, TextField, makeStyles, Container, Typography, Divider, Input, InputLabel } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import BreadCrumbs from 'src/views/teamb/activitiesView/BreadCrumbs';
import service from '../services/service';
import util from '../services/util';

import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

//Transición  de la ventana emergente que muestra 
//el resultado de enviar los datos del formulario al backend
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const objService = new service();
const objUtil = new util();

const investigador = [
  { value: 'advert', label: 'Seleccione una opción' },
  { value: 'T1', label: 1 },
  { value: 'T2', label: 2 },
  { value: 'T3', label: 3 }
];

const lineaInvestigacion = [
  { value: 'advert', label: 'Seleccione una opción' },
  { value: 'T1', label: 1 },
  { value: 'T2', label: 2 },
  { value: 'T3', label: 3 }
];

const tipo = [
  { value: 'advert', label: 'Seleccione una opción' },
  { value: 'T1', label: 'Interna' },
  { value: 'T2', label: 'Externa' },
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

const ActivitySixView = ({ className, ...rest }) => {
  const classes = useStyles();
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
  //Asignamos a "investigadorSeleccionado" el valor de "event.target.value"
  const investigadorSeleccionado = (event) => {
    setValues({
      ...values,
      investigadorSeleccionado: event.target.value
    });
  };
  //Asignamos a "lineaSeleccionada" el valor de "event.target.value"
  const lineaSeleccionada = (event) => {
    setValues({
      ...values,
      lineaSeleccionada: event.target.value
    });
  };
  //Asignamos a "tipoSeleccionado" el valor de "event.target.value"
  const tipoSeleccionado = (event) => {
    setValues({
      ...values,
      tipoSeleccionado: event.target.value
    });
  };
  //Asignamos a "codigoVRI" el valor de "event.target.value"
  const codigoVRI = (event) => {
    setValues({
      ...values,
      codigoVRI: event.target.value
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
  const [errorNombreProyecto, setErrorNombreProyecto] = useState(null);
  const [errorNombreInvestigador, setErrorNombreInvestigador] = useState(null);
  const [errorLugarTrabajo, setErrorLugarTrabajo] = useState(null);
  const [errorDescripcion, setErrorDescripcion] = useState(null);
  const [errorLinea, setErrorLinea] = useState(null);
  const [errorCodigoVRI, setErrorCodigoVRI] = useState(null);
  const [errorConvocatoria, setErrorConvocatoria] = useState(null);
  const [errorTipo, setErrorTipo] = useState(null);
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

    if (values.nombreProyecto.length) {
      setErrorNombreProyecto(null)
    }
    else {
      setErrorNombreProyecto("El campo es obligatorio");
      result = false;
    }
    if (values.investigadorSeleccionado.length && values.investigadorSeleccionado != "Seleccione una opción") {
      setErrorNombreInvestigador(null)
    }
    else {
      setErrorNombreInvestigador("Seleccione una opción válida");
      result = false;
    }
    if (values.lugarTrabajo.length) {
      setErrorLugarTrabajo(null)
    }
    else {
      setErrorLugarTrabajo("El campo es obligatorio");
      result = false;
    }
    if (values.descripcion.length) {
      setErrorDescripcion(null)
    }
    else {
      setErrorDescripcion("El campo es obligatorio");
      result = false;
    }
    if (values.lineaSeleccionada.length && values.lineaSeleccionada != "Seleccione una opción") {
      setErrorLinea(null)
    }
    else {
      setErrorLinea("Seleccione una opción válida");
      result = false;
    }
    if (values.codigoVRI.length && values.codigoVRI > 0) {
      setErrorCodigoVRI(null)
    }
    else {
      setErrorCodigoVRI("código invalido");
      result = false;
    }
    if (values.convocatoria.length) {
      setErrorConvocatoria(null)
    }
    else {
      setErrorConvocatoria("El campo es obligatorio");
      result = false;
    }
    if (values.tipoSeleccionado.length && values.tipoSeleccionado != "Seleccione una opción") {
      setErrorTipo(null)
    }
    else {
      setErrorTipo("Seleccione una opción válida");
      result = false;
    }
    if (values.fechaInicio.length && values.fechaFin.length) {
      if (values.fechaInicio <= values.fechaFin) {
        setErrorFechas("")
      }
      else {
        setErrorFechas("La fecha Fin del proyecto debe ser después de la fecha de inicio del proyecto");
        result = false;
      }
    }
    else {
      setErrorFechas("Seleccióne fechas de inicio y fin del proyecto válidas");
      result = false;
    }
    return result
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
    var varnombreproyecto = document.getElementById("nombreproyecto").value;
    var varnombreinvestigador = document.getElementById("nombreinvestigador").value;
    var varlugartrabajo = document.getElementById("lugartrabajo").value;
    var vardescripcion = document.getElementById("descripcion").value;
    var varlineainvestigacion = document.getElementById("lineainvestigacion").value;
    var varnumber = document.getElementById("number").value;
    var varconvocatoria = document.getElementById("convocatoria").value;
    var vartipoconvocatoria = document.getElementById("tipoconvocatoria").value;
    var vardate1 = document.getElementById("date1").value;
    var vardate2 = document.getElementById("date2").value;
    var now = objUtil.GetCurretTimeDate();
    //Se captura el valor booleano de "emergenteGuardarYEnviar" y se envía en el 
    //documento JSON con el fin de saber si se debe enviar el email a quien corresponda
    var send_email = emergenteGuardarYEnviar;

    const fd = new FormData();

    fd.append("name", varnombreproyecto);
    fd.append("description", vardescripcion);
    fd.append("state", 1);
    fd.append("start_date", vardate1);
    fd.append("end_date", vardate2);
    fd.append("academic_year", "2020-21"); // Consultar año academico actual 
    fd.append("type", 6);
    fd.append("date_record", now);
    fd.append("date_update", now);
    fd.append("place", varlugartrabajo);
    fd.append("code_VRI", varnumber);
    fd.append("convocation", varconvocatoria);
    fd.append("type_convocation", vartipoconvocatoria);
    fd.append("student", 36); // Consultar el id del estudiante actual
    fd.append("investigation_line", varlineainvestigacion);
    fd.append("investigator", varnombreinvestigador);
    fd.append("send_email", send_email);
    fd.append("receipt", archivo[0]);

    objService.PostActivitySix(fd).then((result) => {
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
              <h1 style={{ display: 'flex', justifyContent: 'center' }} align="center" name="crearactividad">
                Datos de detalle Participación en proyectos de investigación
          </h1>
              <Divider />
              <CardContent >
                <Grid item md={12} xs={12}>
                  <TextField fullWidth label="Nombre del proyecto" id="nombreproyecto" name="nombreProyecto" onChange={handleChange} required value={values.nombreProyecto}
                    variant="outlined" />
                  {/* TODO: Comentar */}
                  {errorNombreProyecto ? <p style={{ display: 'flex', color: 'red' }}>{errorNombreProyecto}</p> : null}
                  <br></br>

                  <br></br>
                  <TextField fullWidth label="Nombre investigador principal" id="nombreinvestigador" name="investigador" onChange={investigadorSeleccionado} required select
                    SelectProps={{ native: true }} variant="outlined">
                    {investigador.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  {/* TODO: Comentar */}
                  {errorNombreInvestigador ? <p style={{ display: 'flex', color: 'red' }}>{errorNombreInvestigador}</p> : null}
                  <br></br>
                  <br></br>

                  <TextField fullWidth label="Lugar de trabajo" id="lugartrabajo" name="lugarTrabajo" onChange={handleChange} required value={values.lugarTrabajo}
                    variant="outlined" />
                  {/* TODO: Comentar */}
                  {errorLugarTrabajo ? <p style={{ display: 'flex', color: 'red' }}>{errorLugarTrabajo}</p> : null}
                  <br></br>
                  <br></br>

                  <TextField fullWidth label="Descripción de actividad" id="descripcion" name="descripcion" onChange={handleChange} required value={values.descripcion}
                    variant="outlined" />
                  {/* TODO: Comentar */}
                  {errorDescripcion ? <p style={{ display: 'flex', color: 'red' }}>{errorDescripcion}</p> : null}
                  <br></br>
                  <br></br>

                  <TextField fullWidth label="Linea de investigacion" id="lineainvestigacion" name="lineaInvestigacion" onChange={lineaSeleccionada} required select
                    SelectProps={{ native: true }} variant="outlined">
                    {lineaInvestigacion.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  {/* TODO: Comentar */}
                  {errorLinea ? <p style={{ display: 'flex', color: 'red' }}>{errorLinea}</p> : null}
                  <br></br>
                  <br></br>

                  <TextField id="number" label="Codigo VRI" type="number" InputLabelProps={{ shrink: true, }} onChange={codigoVRI} variant="outlined" />
                  {/* TODO: Comentar */}
                  {errorCodigoVRI ? <p style={{ display: 'flex', color: 'red' }}>{errorCodigoVRI}</p> : null}
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Convocatoria" id="convocatoria" name="convocatoria" onChange={handleChange} required value={values.convocatoria}
                    variant="outlined"
                  />
                  {/* TODO: Comentar */}
                  {errorConvocatoria ? <p style={{ display: 'flex', color: 'red' }}>{errorConvocatoria}</p> : null}
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Tipo convocatoria" id="tipoconvocatoria" name="tipo" onChange={tipoSeleccionado} required select
                    SelectProps={{ native: true }} variant="outlined">
                    {tipo.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  {/* TODO: Comentar */}
                  {errorTipo ? <p style={{ display: 'flex', float: 'left', color: 'red' }}>{errorTipo}</p> : null}
                  <br></br>
                  <br></br>
                  <br></br>
                  <Grid container spacing={3} container justify="space-around">
                    <Grid>
                      <TextField id="date1" label="Fecha Inicio proyecto" type="date"
                        className={classes.textField} InputLabelProps={{ shrink: true }}
                        onChange={handleFechaInicio} />
                    </Grid>
                    <Grid>
                      <TextField id="date2" label="Fecha Fin proyecto" type="date"
                        className={classes.textField} InputLabelProps={{ shrink: true }}
                        onChange={handleFechaFin} />
                    </Grid>
                  </Grid>
                  {/* TODO: Comentar */}
                  <br></br>
                  {errorFechas ? <p style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>{errorFechas}</p> : null}
                  <br></br>
                  <InputLabel>Justificante *</InputLabel>
                  <Input type="file" name="file" inputProps={{ accept: '.pdf' }} onChange={(e) => uploadFile(e.target.files)} />
                </Grid>
                <br></br>
              </CardContent>

              <Box display="flex" justifyContent="flex-end" p={2}>
                {/* Se le agrega la propiedad onClick para lanzar la ventana emergente de 
          confirmación cuando se pulsa sobre el botón cancelar, se debe quitar la propiedad RouterLink */}
                <Button onClick={handleClose} color="primary" variant="outlined">Cancelar</Button>&nbsp;

            <Button onClick={handleGuardar} color="primary" variant="contained"> Guardar </Button>&nbsp;

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
              <Button onClick={handleCancelarNo} color="primary" autoFocus>No</Button>
              <RouterLink to="../">
                <Button color="primary">Si</Button>
              </RouterLink>
            </DialogActions>
          </Dialog>

          {/*HTML que lanza la ventana emergente de confirmación cuando se pulsa sobre el botón "GUARDAR" en "Crear Actividad" */}
          <Dialog open={emergenteGuardar} onClose={handleGuardarNo} >
            <DialogTitle id="alert-dialog-title">{"¿Esta seguro que desea guardar la actividad?"}</DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
              {/* TODO: Enviar a backend y guardar */}
              <Button onClick={handleGuardarNo} color="primary" autoFocus>No</Button>
              <Button color="primary" onClick={SaveActivity}>Si</Button>
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
              <Button color="primary" onClick={SaveActivity}>Si</Button>
            </DialogActions>
          </Dialog>

          {/* HTML que muestra el resultado de enviar los datos del formulario al backend */}
          <Dialog
            open={emergenteEnviarBack}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleEnviarBackAceptar}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Resultado"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {resultadoBack ? <Typography component={'span'} variant={'body2'}>{resultadoBack}</Typography> : null}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEnviarBackAceptar} color="primary">
                Aceptar
              </Button>
            </DialogActions>
          </Dialog>

        </div>
      </Container>
    </div>
  );
};

ActivitySixView.propTypes = {
  className: PropTypes.string
};

export default ActivitySixView;