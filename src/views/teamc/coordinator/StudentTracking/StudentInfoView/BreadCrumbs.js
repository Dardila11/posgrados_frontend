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
      <RouterLink color="inherit" to="/coordinator">
          Coordinador
        </RouterLink>
        <RouterLink color="inherit" to="/coordinator/list-students">
          Lista Estudiantes
        </RouterLink>
        <Typography color="textPrimary">Información del Estudiante</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
