import React, { useState, useEffect } from 'react';

import service from 'src/views/teamb/services/service';

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
const objService = new service();
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
    objService.GetActivity(id).then((result) => {
      var dataActivity = result.data;
      setActivity(dataActivity);
    }).catch(() => {
      alert("Error, no hay registros para mostrar");
    });
  },[]);
 
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
          Id: { activity.id}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Descripcion: { activity.description}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Tipo: {activity.type}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Fecha Inicio: {activity.start_date}
        </Typography>
        
      </CardContent>
      
    </Card>
    </Container>
  );
};

export default ActivityInfoView;