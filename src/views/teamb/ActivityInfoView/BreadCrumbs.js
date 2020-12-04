import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const handleClick = e => {
  e.preventDefault();
  console.info('You clicked a breadcrumb.');
};

const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}));

const BreadCrumbs = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Breadcrumbs maxItems={3} aria-label="breadcrumb">
        <RouterLink color="inherit" to="/student"> Estudiante </RouterLink>
        <RouterLink color="inherit" to="/student/list-activities"> Actividades </RouterLink>
        <Typography color="textPrimary"> Información de la actividad </Typography> 
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
