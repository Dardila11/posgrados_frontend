import React, { useState, useEffect } from 'react';

import TrackStudent from './TrackStudent';

import api from 'src/views/teamc/services/Api';

import {useParams
} from "react-router-dom";
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
    height: '250px',
    marginTop: '15px'
  },
  statusActive: {
    color: '#4caf50'
  },
  statusInactive: {
    color: '#757575'
  },
  statusRetired: {
    color: '#f44336'
  },
  statusGraduate: {
    color: '#0277bd'
  }
});


const StudentInfo = () => {

  let {id} = useParams();
  const [student, setStudent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.getStudent(id);
      setStudent(res);      
    };
    fetchData();
  });
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let statusclass = null;
  switch (student.status) {
    case "ACTIVO":
      statusclass = classes.statusActive;
      break;
    case "INACTIVO":
      statusclass = classes.statusInactive;
      break;
    case "RETIRADO":
        statusclass = classes.statusRetired;
        break;
    case "GRADUADO":
        statusclass = classes.statusGraduate;
        break;
    default:
      break;
  }
  return (
    <Container>
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h3" component="h2" gutterBottom>
          Información del estudiante
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Nombre: {student.first_name} {student.last_name}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Programa: {student.program}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Cohorte: {student.cohorte}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
        Estado: <b> <span className={statusclass}>
          {student.status}          
          </span> </b>
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
