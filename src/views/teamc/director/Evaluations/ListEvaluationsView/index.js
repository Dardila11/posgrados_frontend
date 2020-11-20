import React, { useState, useEffect } from 'react';
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import Page from 'src/components/Page';
import ListPagination from 'src/components/ListPagination';
import BreadCrumbs from './BreadCrumbs';
import SearchBar from 'src/components/SearchBar';
import List from 'src/components/List';
import api from 'src/views/teamc/services/Api';

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
  const [evaluationsList, setEvaluationsList] = useState([])
  const [serviceState, setServiceState] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await api.getDirectorEvaluations().then(res => {
        setServiceState(false)
        setEvaluationsList(res.data)
        setLoading(false)
        console.log(res.data)
      });
      
    };
    fetchData();
  }, []);

  const classes = useStyles();
  return (
    <Page className={classes.root} title="Listado de Evaluaciones">
      <BreadCrumbs />
      <SearchBar context="evaluations" />
      {loading ? (
        <LinearProgress />
      ):(
        serviceState ? (
          <>
          <List list={evaluationsList} option="Evaluation" context="/director/list-evaluations"/>
          <ListPagination />
        </>
        ):(
          <Typography variant='h3'>No se obtuvieron resultados</Typography>
        )        
      )        
      }
    </Page>
  );
};

export default DirectorListEvaluationsView;
