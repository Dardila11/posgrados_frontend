import React from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
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
      <Breadcrumbs maxItems={3} aria-label="breadcrumb">
      <RouterLink color="inherit" to="/student">
          Estudiante
        </RouterLink>
        <RouterLink color="inherit" to="/student/administer-profile">
          Administrar Perfil
        </RouterLink>
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
