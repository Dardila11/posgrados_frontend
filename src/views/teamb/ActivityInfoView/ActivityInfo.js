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


const ActivityInfoView = () => {

  let {id} = useParams();
  const [activity, setActivity] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.getActivity(id);
      setActivity(res);      
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
  return (
    <Container>
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h3" component="h2" gutterBottom>
          Información de la actividad
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Titulo: { activity.title}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Descripcion: {activity.description}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Modalidad: {activity.modality}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          fecha: 10/20/2020
        </Typography>
        
      </CardContent>
      
    </Card>
    </Container>
  );
};

export default ActivityInfoView;
