import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

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
        <RouterLink color="inherit" to="/coordinator">
          Coordinador
        </RouterLink>
        <Typography color="textPrimary">Reportes</Typography>
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
