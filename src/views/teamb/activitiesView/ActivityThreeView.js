import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, TextField, makeStyles, Container, Divider, InputLabel } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import BreadCrumbs from 'src/views/teamb/activitiesView/BreadCrumbs';
import service from '../services/service';
import util from '../services/util';

const objService = new service();
const objUtil = new util();

const tipo = [
  { value: 'advert', label: 'Seleccione una opción' },
  { value: 'T1', label: 'Artículo de revista' },
  { value: 'T2', label: 'Acta de congreso' },
  { value: 'T3', label: 'Libro' },
  { value: 'T4', label: 'Otras publicaciones' }
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

const ActivityThreeView = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    tituloArticulo: '',
    tipoSeleccionado: '',
    tituloLibro: '',
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
  //Asignamos a "tipo" de publicación en el valor de "event.target.value"
  const tipoSeleccionado = (event) => {
    setValues({
      ...values,
      tipoSeleccionado: event.target.value
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
  const [errorTituloArticulo, setErrorTituloArticulo] = useState(null);
  const [errorTipo, setErrorTipo] = useState(null);
  const [errorTituloLibro, setErrorTituloLibro] = useState(null);
  const [errorAutores, setErrorAutores] = useState(null);
  const [errorEditorial, setErrorEditorial] = useState(null);
  const [errorDatosGenerales, setErrorDatosGenerales] = useState(null);
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
    if (values.tituloArticulo.length) {
      setErrorTituloArticulo(null)
    }
    else {
      setErrorTituloArticulo("El campo es obligatorio")
    }
    if (values.tipoSeleccionado.length && values.tipoSeleccionado != "Seleccione una opción") {
      setErrorTipo(null)
    }
    else {
      setErrorTipo("Seleccione una opción válida")
    }
    if (values.tituloLibro.length) {
      setErrorTituloLibro(null)
    }
    else {
      setErrorTituloLibro("El campo es obligatorio")
    }
    if (values.autores.length) {
      setErrorAutores(null)
    }
    else {
      setErrorAutores("El campo es obligatorio")
    }
    if (values.editorial.length) {
      setErrorEditorial(null)
    }
    else {
      setErrorEditorial("El campo es obligatorio")
    }
    if (values.datosGenerales.length) {
      setErrorDatosGenerales(null)
    }
    else {
      setErrorDatosGenerales("El campo es obligatorio")
    }
    if (values.fechaInicio.length && values.fechaFin.length) {
      if (values.fechaInicio <= values.fechaFin) {
        setErrorFechas("")
      }
      else {
        setErrorFechas("La fecha de publicación debe ser después de la fecha de envió")
      }
    }
    else {
      setErrorFechas("Seleccióne una fecha de envió publicación y fecha de publicación válidas")
    }
    //setEmergenteGuardarYEnviar(true);
  };
  const handleGuardarYEnviarNo = () => {
      setEmergenteGuardarYEnviar(false);
  };

  const SaveActivity = () => {
    
    setEmergenteGuardar(false);
    
    var vartitulo = document.getElementById("titulo").value;
    var vartipo = document.getElementById("tipo").value;
    var varnombrepublicacion = document.getElementById("nombrepublicacion").value;
    var varautores = document.getElementById("autores").value;
    var varnombreeditorial = document.getElementById("nombreeditorial").value;
    var vardatosgenerales = document.getElementById("datosgenerales").value;
    var vardate1 = document.getElementById("date1").value;
    var vardate2 = document.getElementById("date2").value;
    var now = objUtil.GetCurretTimeDate();

    objService.PostActivityThree(
      { 
        "title": vartitulo,
        "name" : varnombrepublicacion,
        "state" : 1,
        "academic_year" : "2020-21", /* consultar año academico actual */
        "type" : "publication",
        "type_publication" : vartipo,
        "authors" : varautores,
        "general_data" : vardatosgenerales,
        "editorial" : varnombreeditorial,
        "student" : 1, /* Consultar usuario actual */
        "start_date" : vardate1,
        "end_date" : vardate2,
        "date_record": now,
        "date_update": now 
      }
    ).then((result) => { 
      alert("Publicacion registrada");      
      
    }).catch((error) => {
      console.log(error.message);
    });
    
  }
  return (
    <div>
      <BreadCrumbs />
      <Container>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <form autoComplete="off" noValidate className={clsx(classes.root, className)} {...rest}>
            <Card className={classes.root}>
              <h1 style={{ display: 'flex', justifyContent: 'center' }} name="crearactividad" >Datos de detalle Publicaciones</h1>
              <br></br>
              <Divider />
              <CardContent >
                <br></br>
                <Grid item md={12} xs={12}>
                  <TextField fullWidth label="Titulo del articulo, capitulo, libro, monografia..." name="tituloArticulo" id="titulo"
                    onChange={handleChange} required value={values.tituloArticulo} variant="outlined" />
                  {/* TODO: Comentar */}
                  {errorTituloArticulo ? <p style={{ display: 'flex', color: 'red' }}>{errorTituloArticulo}</p> : null}
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Tipo de publicación" name="tipo" id="tipo" onChange={tipoSeleccionado} required
                    select SelectProps={{ native: true }} variant="outlined">
                    {tipo.map((option) => (
                      <option key={option.value} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  {/* TODO: Comentar */}
                  {errorTipo ? <p style={{ display: 'flex', color: 'red' }}>{errorTipo}</p> : null}
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Nombre de la publicación o titulo del libro" id="nombrepublicacion" name="tituloLibro" onChange={handleChange}
                    required value={values.tituloLibro} variant="outlined" />
                  {/* TODO: Comentar */}
                  {errorTituloLibro ? <p style={{ display: 'flex', color: 'red' }}>{errorTituloLibro}</p> : null}
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Autores" name="autores" id="autores" onChange={handleChange} required value={values.autores}
                    variant="outlined" />
                  {/* TODO: Comentar */}
                  {errorAutores ? <p style={{ display: 'flex', color: 'red' }}>{errorAutores}</p> : null}
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Nombre de la editorial" name="editorial" id="nombreeditorial" onChange={handleChange} required
                    value={values.editorial} variant="outlined" />
                  {/* TODO: Comentar */}
                  {errorEditorial ? <p style={{ display: 'flex', color: 'red' }}>{errorEditorial}</p> : null}
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Datos generales del tipo de publicación" name="datosGenerales" id="datosgenerales" onChange={handleChange}
                    required value={values.datosGenerales} variant="outlined" />
                  {/* TODO: Comentar */}
                  {errorDatosGenerales ? <p style={{ display: 'flex', color: 'red' }}>{errorDatosGenerales}</p> : null}
                  <br></br>
                  <br></br>
                  <br></br>
                  <Grid container spacing={3} container justify="space-around">
                    <TextField id="date1" label="Envío publicación" type="date"
                      className={classes.textField} InputLabelProps={{ shrink: true }}
                      onChange={handleFechaInicio} />
                    <br></br>
                    <br></br>
                    <TextField id="date2" label="Fecha de publicación" type="date"
                      className={classes.textField} InputLabelProps={{ shrink: true }}
                      onChange={handleFechaFin} />
                  </Grid>
                  <br></br>
                  {errorFechas ? <p style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>{errorFechas}</p> : null}
                  <br></br>
                  <br></br>
                  <br></br>
                  <Button color="primary" variant="outlined"> Agregar premio </Button>
                  <br></br>
                  <br></br>
                  <Button color="primary" variant="outlined"> Justificante </Button>
                </Grid>
                <br></br>
              </CardContent>
              <Box display="flex" justifyContent="flex-end" p={2}>
                <Button onClick={handleClose} color="primary" variant="outlined">Cancelar</Button>

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
              <RouterLink to="../">
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
              <Button color="primary" onClick={SaveActivity} >Si</Button>
              <Button onClick={handleGuardarNo}  color="primary" autoFocus>No</Button>
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
ActivityThreeView.propTypes = {
  className: PropTypes.string
};
export default ActivityThreeView;
