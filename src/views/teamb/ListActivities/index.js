import React, { useState, useEffect } from 'react';
import { makeStyles, Container, Box, Typography } from '@material-ui/core';
import Page from 'src/components/Page';
import ListPagination from 'src/components/ListPagination';
import BreadCrumbs from './BreadCrumbs';
import List from 'src/components/List';
import ActivityView from 'src/views/teamb/ListActivities/ActivityView';
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

  const [activities, setActivities] = useState([]);
  useEffect(() => {
    objService.GetActivities(8,"2020-21").then((result) => {
      var dataActivities = result.data;
      setActivities(dataActivities.list_activities);
    }).catch(() => {
      alert("Error, no hay registros para mostrar");
    });
  },[]);

  const classes = useStyles();
  return (
    <Page className={classes.root} title="Listado de Actividades del estudiante">
      <BreadCrumbs />
      <Typography variant="h1" style={{ display: 'flex', justifyContent: 'center' }}>Actividades</Typography>
      <Box>
      <SearchActivities/>
      </Box>
      <Container className= {classes.buttonContainer}>
        <ActivityView/>
      </Container>
      <List list={activities} option="Activity" context="/student/list-activities"/>
     
      
    </Page>
  );
};

export default StudentListActivitiesView;
