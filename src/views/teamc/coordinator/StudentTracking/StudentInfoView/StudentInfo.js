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
  const [data, setStudent] = useState('');
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  useEffect(() => {
    const fetchData = async () => {
      await api.getStudent(id).then(res => {
        setStudent(res.data.student);
      });      
    };
    fetchData();
  });

  
  console.log("Student info" + data);
  const student = data.student.user;
  const program = data.student.program;
  const period = data.period;
  const status = data.state;

  let statusclass = null;
  let state = null;
  switch (status) {
    case 1:
      statusclass = classes.statusActive;
      state = 'ACTIVO';
      break;
    case 2:
      statusclass = classes.statusInactive;
      state = 'INACTIVO';
      break;
    case 3:
        statusclass = classes.statusGraduate;
        state = 'GRADUADO';
        break;
    case 4:
        statusclass = classes.statusBalanced;
        state = 'BALANCEADO';
        break;
    case 5:
        statusclass = classes.statusRetired;
        state = 'RETIRADO';
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
          Programa: {program}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Cohorte: {period}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
        Estado: <b> <span className={statusclass}>
          {status}          
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
