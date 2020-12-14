import React, { useState, useEffect } from 'react';
import {ConsultGi} from './service'
import {useParams
} from "react-router-dom";
import {
  Card,
  CardActions,
  CardContent,
  Button, 
  Box,
  Typography,
  makeStyles,
  Dialog,
  DialogActions,
  DialogTitle,
  Container
} from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
const useStyles = makeStyles({
    root: {
      minWidth: 275,
      height: '350px',
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

export const InfoGi = () => {   
    const classes = useStyles();
    const [Gi, setGi] = useState([])

    useEffect(() => {
        ConsultGi(1).then(request => setGi(request.data.Group[0])) // Todo
    }, [])

    return (
      <Container>
      <Box className={classes.root}>
          <Typography variant="h3" component="h2" gutterBottom>
            Información grupo de investigación
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Id: {Gi.id}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Nombre: {Gi.name}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Email: {Gi.email}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Fecha fundacion: {Gi.foundation_date}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Categoria: {Gi.category}
          </Typography>
          
        <Box display="flex" justifyContent="flex-end" p={2}>
          <IconButton aria-label="delete" >
          <DeleteIcon />
          </IconButton>
          <IconButton color="secondary" aria-label="add an edit">
          <EditIcon />
          </IconButton>
        </Box>
      </Box>
      </Container>
    );
}
