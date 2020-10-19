import React, { useState } from 'react';

import TrackStudent from './TrackStudent';

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  makeStyles,
  Dialog,
  DialogActions,
  DialogTitle,
  Container
} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: '70%',
    height: '300px',
    marginTop: '15px',
  },
  status: {
    color: 'green'
  }
});

const StudentInfo = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Card className={classes.root}>
        <CardContent>
          <Typography variant="h3" component="h2" gutterBottom>
            Información del estudiante
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Nombre: Juan David Gutiérrez Fuentes
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Programa: Maestría en Computación
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Cohorte: 2019
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Estado: <span className={classes.status}>ACTIVO</span>
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Realizar seguimiento
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle variant="h2" onClose={handleClose}>
              Seguimiento de estudiante
            </DialogTitle>
            <TrackStudent />
            <DialogActions>
              <Button variant="contained" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="contained" color="primary" onClick={handleClose}>
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </Card>
    </Container>
  );
};

export default StudentInfo;
