import React, { useState, useEffect } from 'react';

import TrackStudent from './TrackStudent';

import api from 'src/views/teamc/services/Api';

import { useParams } from 'react-router-dom';
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
  let { id } = useParams();
  const [studentInfo, setStudentInfo] = useState({});
  const [isBusy, setBusy] = useState(true);
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
        setStudentInfo(res.data.student);
        setBusy(false);
      });
    };
    fetchData();
  }, []);

  /*const setClassStatus = () => {
    let statusclass = null;
    let status = '';
    switch (studentInfo.student.state) {
      case 1:
        statusclass = classes.statusActive;
        status = 'ACTIVO';
        break;
      case 2:
        statusclass = classes.statusInactive;
        status = 'INACTIVO';
        break;
      case 3:
        statusclass = classes.statusGraduate;
        status = 'GRADUADO';
        break;
      case 4:
        statusclass = classes.statusBalanced;
        status = 'BALANCEADO';
        break;
      case 5:
        statusclass = classes.statusRetired;
        status = 'RETIRADO';
        break;
      default:
        break;
    }
  };*/

  return (
    <Container>
      {isBusy ? (
        <h1>Cargando</h1>
      ) : (
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h3" component="h2" gutterBottom>
              Información del estudiante
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Nombre: {studentInfo && studentInfo.student.user.first_name}
              {studentInfo && studentInfo.student.user.last_name}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Programa: {studentInfo && studentInfo.student.program.name}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Cohorte: {studentInfo && studentInfo.period}
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
              Estado:
              <b>
                <span className={classes.statusActive}>
                  {studentInfo && studentInfo.state}
                </span>
              </b>
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
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
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                >
                  Guardar
                </Button>
              </DialogActions>
            </Dialog>
          </CardActions>
        </Card>
      )}
    </Container>
  );
};

export default StudentInfo;
