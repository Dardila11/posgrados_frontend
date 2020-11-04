import React, { useState, useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Page from 'src/components/Page';
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
  title:{
    textAlign: 'center',
    margin: '20px'
  }
}));

const CoordinatorListActivitiesView = () => {
  const [activityList, setActivityList] = useState([]);
  const [state, setState] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await api.getCoordinatorActivities(5).then(res => {
        console.log(res.data.activities.length)
        if(res.data.activities.length == 0){
          setState(false);
        }else{
          setActivityList(res.data.activities);
        }
        });
    };
    fetchData();
  }, []);

  const classes = useStyles();
  return (
    <Page className={classes.root} title="Listado de Actividades">
      <BreadCrumbs />
      <SearchBar handleSearch={handleSearch} context="activities" />
      {!state ? (
        <Typography className={classes.title} variant='h3'> No se encontraron Actividades </Typography>
      ):(
        <List list={activityList} option="Activity" context="/coordinator/list-activities"/>
      )}
      
    </Page>
  );
};

export default CoordinatorListActivitiesView;
