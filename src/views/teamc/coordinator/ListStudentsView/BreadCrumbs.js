import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
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
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/coordinator" onClick={handleClick}>
          Coordinador
        </Link>
        <Link
          color="inherit"
          href="/coordinator/list-students"
          onClick={handleClick}
        >
          Lista Estudiantes
        </Link>
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
