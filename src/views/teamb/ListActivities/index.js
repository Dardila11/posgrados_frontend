import React, { useState, useEffect } from 'react';
import { makeStyles, Container, Box, Typography } from '@material-ui/core';
import Page from 'src/components/Page';
import ListPagination from 'src/components/ListPagination';
import BreadCrumbs from './BreadCrumbs';
import List from 'src/components/List';
import SearchActivities from 'src/views/teamb/ListActivities/SearchActivities';
import service from 'src/views/teamb/services/service';
const objService = new service();
const handleSearch = event => {
  //console.log('Cadena de busqueda: ', event.target.value);
  this.setState({
    inputValue: event.target.value
  });
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  },
  buttonContainer: {  
    paddingBottom: theme.spacing(1)
  }
  
}));

const StudentListActivitiesView = () => {

  useEffect(() => {

  },[]);

  const classes = useStyles();
  return (
    <Page className={classes.root} title="Listado de Actividades del estudiante">
      <BreadCrumbs />
      <Typography variant="h1" style={{ display: 'flex', justifyContent: 'center' }}>Actividades</Typography>
      <Box>
      <SearchActivities/>
      </Box>
    </Page>
  );
};

export default StudentListActivitiesView;
