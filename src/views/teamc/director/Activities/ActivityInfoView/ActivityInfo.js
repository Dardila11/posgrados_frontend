import React, { useState, useEffect } from 'react';

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

const ActivityInfoView = () => {
  const [activityList, setActivityList] = useState([]);
  const [activity1, setActivity] = useState({});
  let { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await api.getDirectorActivities(5).then(res => {
        // TODO check if res.data is empty
        const activity = res.data.activities.find(
          activity => activity.id == id
        );
        setActivity(activity);
      });
    };
    fetchData();
  }, []);
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
            Información de la actividad
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Titulo: {activity1.title}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Descripcion: {activity1.description}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Modalidad: {activity1.academic_year}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Realizar Evaluación
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle variant="h2" onClose={handleClose}>
              Evaluación de la actividad
            </DialogTitle>

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

export default ActivityInfoView;
