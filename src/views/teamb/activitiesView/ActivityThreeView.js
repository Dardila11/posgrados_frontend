import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Grid, TextField, makeStyles, Container, Divider } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import BreadCrumbs from 'src/views/teamb/activitiesView/BreadCrumbs';

const tipo = [
  { value: 'advert', label: 'Seleccione una opcion' },
  { value: 'T1', label: 'Artículo de revista (journal article)' },
  { value: 'T2', label: 'Acta de congreso (conference proceedings)' },
  { value: 'T3', label: 'Libro' },
  { value: 'T3', label: 'Otras publicaciones' }
];

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 275,
    width: '70%',
    height: '800px',
    marginTop: '15px'
  },
  status: {
    color: 'green'
  }
}));

const ActivityThreeView = ({ className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
  });
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const [emergente, setEmergente] = React.useState(false);
  const handleClose = () => {
    setEmergente(true);
  };
  const handleNo = () => {
    setEmergente(false);
  };

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
                  <TextField fullWidth label="Titulo del articulo, capitulo, libro, monografia..." name="descripcion"
                    onChange={handleChange} required value={values.Descripcion} variant="outlined"
                  />
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Tipo de publicación" name="programa" onChange={handleChange} required
                    select SelectProps={{ native: true }} variant="outlined">
                    {tipo.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Nombre de la publicación o titulo del libro" name="descripcion" onChange={handleChange}
                    required value={values.Descripcion} variant="outlined"
                  />
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Autores" name="descripcion" onChange={handleChange} required value={values.Descripcion}
                    variant="outlined"
                  />
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Nombre de la editorial" name="descripcion" onChange={handleChange} required
                    value={values.Descripcion} variant="outlined"
                  />
                  <br></br>
                  <br></br>
                  <TextField fullWidth label="Datos generales del tipo de publicación" name="descripcion" onChange={handleChange}
                    required value={values.Descripcion} variant="outlined"
                  />
                  <br></br>
                  <br></br>
                  <br></br>
                  <Grid container spacing={3} container justify="space-around">
                    <TextField id="date" label="Envío publicación" type="date" defaultValue="2017-05-24"
                      className={classes.textField} InputLabelProps={{ shrink: true }}
                    />
                    <br></br>
                    <br></br>
                    <TextField id="date" label="Fecha de publicación" type="date" defaultValue="2017-05-24"
                      className={classes.textField} InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
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
                <Button color="primary" variant="contained"> Guardar </Button>
                <Button color="primary" variant="contained"> Guardar y Enviar </Button>
              </Box>
            </Card>
          </form>
          <Dialog open={emergente} onClose={handleNo}>
            <DialogTitle id="alert-dialog-title">{"¿Está seguro que desea cancelar?"}</DialogTitle>
            <DialogContent>
            </DialogContent>
            <DialogActions>
              <RouterLink to="../">
                <Button color="primary"> Si </Button>
              </RouterLink>
              <Button onClick={handleNo} color="primary" autoFocus> No </Button>
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
