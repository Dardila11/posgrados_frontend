import React, { useState, useEffect } from 'react';
import { Typography, LinearProgress, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page'
import ListPagination from 'src/components/ListPagination'
import BreadCrumbs from './BreadCrumbs'
import SearchBar from 'src/components/SearchBar'
import List from 'src/components/List'
import api from 'src/views/teamc/services/Api'
import { connect } from 'react-redux'


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  },
  progress:{
    marginTop: '30'
  }
}));

const CoordinatorListEvaluationsView = ({search, status, page}) => {
  const [evaluationList, setEvaluationList] = useState([])
  const [initialEvaluationList, setInitialEvaluationList] = useState([])
  const [loading, setLoading] = useState(true);
  const [serviceState, setServiceState] = useState(true)
  const itemsByPage = 8
  const pages = getPages(initialEvaluationList,itemsByPage)
  const classes = useStyles();
  const state = get_status(initialEvaluationList);
  
   /**
   * Busca los estudiante segun su nombre
   * Se supone que este useEffect se corre cada vez que
   * la variabe state.search cambia.
   */
  useEffect(() => {
    // Buscar por nombre
    function nameSearch(search) {
      let evaluationsListSearch = []
      if(search.search!=""){
        initialEvaluationList.map(
          evaluation => 
          
            {
              if(evaluation.title.toLowerCase().includes(search.toLowerCase())||
              evaluation.description.toLowerCase().includes(search.toLowerCase())){
                evaluationsListSearch.push(evaluation)
              }
            }
          )
        setEvaluationList(evaluationsListSearch)
      }else{
        if(page == '')setEvaluationList(pages[0])
        else setEvaluationList(pages[page-1])
      }          
    }
    nameSearch(search)
  }, [search])

  /**
   * Filtra los estudiantes segun el estado
   * que tienen. 1. Activo, 2. Inactivo, etc
   */
  useEffect(() => {
    function statusfilter(status) {
      if (status != '-1') {
        const evaluationListFilteredByStatus = initialEvaluationList.filter(
          evaluation => evaluation.is_save === getStatusId(status)
        )
        setEvaluationList(evaluationListFilteredByStatus)
      } else {
        if(page == '')setEvaluationList(pages[0])
        else setEvaluationList(pages[page-1])
      }
    }
    statusfilter(status)
  }, [status])
  /**
   * Pagination event
   */
  useEffect(()=>{
    function pageSelect(page){
      setEvaluationList(pages[page-1])      
    }
    pageSelect(page)
  },[page]);
  /**
   * Obtiene la lista de evaluaciones
   */
  useEffect(() => {
    const fetchData = async () => {
      let coordinatorId = localStorage.getItem("id")
      await api.getCoordinatorEvaluations(coordinatorId).then(res => {
        setEvaluationList(getPages(res.data.test_activities,itemsByPage)[0])
        setInitialEvaluationList(res.data.test_activities);
        setLoading(false);
      });
      
    };
    fetchData();
  }, []);

  return (
    <Page className={classes.root} title="Listado de evaluaciones">
      <BreadCrumbs />
      <SearchBar searchOption="true" context="evaluations" status={state}/>
      {loading ? (
        
        <LinearProgress className={classes.progress}/>
      ):( evaluationList.length > 0 ? (
        <>
        <List list={evaluationList} option="Evaluation" context="coordinator" />
        <ListPagination pages = {pages}/>        
        </>
      ) : (
        <Typography variant='h3'>No se obtuvieron resultados</Typography>
      )
        
      )}      
    </Page>
  );
};

const getPages = (evaluationList, npages) => {
  let pages = []
  let indexv = 0
  let br = true
  while (br) {
    let page = []
    for (let index = 1; index <= npages; index++) {
      if(indexv>=evaluationList.length) {
        index = npages+1
      }else{
        page.push(evaluationList[indexv])
        indexv++
      }      
    }
    pages.push(page)
    if(indexv>=evaluationList.length) br=false
  }
  return pages
}

function getStatusNameById(statusId) {
  switch (statusId) {
    case false:
      return 'Sin notificar'
    case true:
      return 'Notificada'
  }
}

function getStatusId(statusId) {
  switch (statusId) {
    case 'Sin notificar':
      return false
    case 'Notificada':
      return true
  }
}

function get_status (list){
  let res = [];
  list.map(element =>{
   if(!res.includes(getStatusNameById(element.is_save))) res.push(getStatusNameById(element.is_save))})
   return res;  
};

/**
 * 
 * @param {*} state from reducers
 */
const mapStateToProps = state => ({
  search: state.searches.search,
  status: state.filters.status,
  page: state.paginations.page
})

export default connect(mapStateToProps) (CoordinatorListEvaluationsView)
