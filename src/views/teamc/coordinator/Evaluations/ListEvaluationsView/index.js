import React, { useState, useEffect } from 'react';
import { Container, LinearProgress, makeStyles, Typography } from '@material-ui/core';
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

const CoordinatorListEvaluationsView = () => {
  const [evaluationsList, setEvaluationsList] = useState([]);
  const [serviceState, setServiceState] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await api.getCoordinatorEvaluations(5).then(res => {
        setServiceState(false);
        setEvaluationsList(res.data);
        setLoading(false);
      });
      
    };
    fetchData();
  }, []);

  const classes = useStyles();
  return (
    <Page className={classes.root} title="Listado de Evaluaciones">
      <BreadCrumbs />
      <SearchBar handleSearch={handleSearch} context="evaluations" />
      {loading ? (
        <LinearProgress />
      ):(
        evaluationsList.length > 0 ? (
          <>
          <List list={evaluationsList} option="Evaluation" context="/coordinator/list-evaluations"/>
          <ListPagination />
        </>
        ):(
          <Container>
            <Typography variant='h3'>No se obtuvieron resultados</Typography>
          </Container>
        )        
      )        
      }
    </Page>
  );
};

export default CoordinatorListEvaluationsView;
