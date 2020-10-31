import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
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
  }
}));

const CoordinatorListActivitiesView = () => {
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
    <Page className={classes.root} title="Listado de Actividades">
      <BreadCrumbs />
      <SearchBar handleSearch={handleSearch} context="activities" />
      <List list={activityList} option="Activity" />
      <ListPagination />
    </Page>
  );
};

export default CoordinatorListActivitiesView;
