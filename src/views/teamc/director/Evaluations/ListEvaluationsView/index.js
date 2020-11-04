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

const DirectorListEvaluationsView = () => {
  const [evaluationsList, setEvaluationsList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.getEvaluationsDirectorLocal();
      setEvaluationsList(res);
    };
    fetchData();
  }, []);

  const classes = useStyles();
  return (
    <Page className={classes.root} title="Listado de Evaluaciones">
      <BreadCrumbs />
      <SearchBar handleSearch={handleSearch} context="evaluations" />
      <List list={evaluationsList} option="Evaluation" context="/director/list-evaluations"/>
      <ListPagination />
    </Page>
  );
};

export default DirectorListEvaluationsView;
