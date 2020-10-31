import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';

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
      <Breadcrumbs aria-label="breadcrumb">
        <RouterLink color="inherit" to="/director">
          Director
        </RouterLink>
        <Typography color="textPrimary">Lista Actividades</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
