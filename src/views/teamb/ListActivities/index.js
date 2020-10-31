import React, { useState, useEffect } from 'react';
import { makeStyles, Container } from '@material-ui/core';
import Page from 'src/components/Page';
import Button from '@material-ui/core/Button';
import ListPagination from 'src/components/ListPagination';
import BreadCrumbs from './BreadCrumbs';
import SearchBar from 'src/components/SearchBar';
import List from 'src/components/List';
import api from 'src/views/teamc/services/Api';

const handleSearch = event => {
  console.log('Cadena de busqueda: ', event.target.value);
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
  const [activityList, setActivityList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.getStudentActivitiesLocal();
      setActivityList(res);
    };
    fetchData();
  }, []);

  const classes = useStyles();
  return (
    <Page className={classes.root} title="Listado de Actividades del estudiante">
      <BreadCrumbs />
      <SearchBar handleSearch={handleSearch} context="activities" />
      <Container className= {classes.buttonContainer}>
        <Button variant="outlined" color="primary" > CREAR ACTIVIDAD </Button>
      </Container>
      <List list={activityList} option="Activity" context="/student/list-activities"/>
      <ListPagination />
      
    </Page>
  );
};

export default StudentListActivitiesView;
