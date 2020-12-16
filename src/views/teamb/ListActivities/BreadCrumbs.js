import React from 'react';
import { Typography, Breadcrumbs } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

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
      <Breadcrumbs maxItems={2} aria-label="breadcrumb">
        <RouterLink color="inherit" to="/student"> Estudiante </RouterLink>
        <Typography color="textPrimary"> Actividades </Typography>
      </Breadcrumbs>
    </div>
  );
};
export default BreadCrumbs;
