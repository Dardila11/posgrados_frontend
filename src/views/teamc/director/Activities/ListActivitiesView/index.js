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

const DirectorListActivitiesView = ({search, status, page}) => {
  const [activityList, setActivityList] = useState([])
  const [initialActivityList, setInitialActivityList] = useState([])
  const [loading, setLoading] = useState(true);
  const [serviceState, setServiceState] = useState(true)
  const itemsByPage = 8
  const pages = getPages(initialActivityList,itemsByPage)
  const classes = useStyles();
  const state = get_status(initialActivityList);
  
   /**
   * Busca los estudiante segun su nombre
   * Se supone que este useEffect se corre cada vez que
   * la variabe state.search cambia.
   */
  useEffect(() => {
    // Buscar por nombre
    function nameSearch(search) {
      let activitiesListSearch = []
      if(search.search!=""){
        initialActivityList.map(
          activity => 
          
            {
              if(activity.title.toLowerCase().includes(search.toLowerCase())||
              activity.description.toLowerCase().includes(search.toLowerCase())){
                activitiesListSearch.push(activity)
              }
            }
          )
        setActivityList(activitiesListSearch)
      }else{
        if(page == '')setActivityList(pages[0])
        else setActivityList(pages[page-1])
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
        const activityListFilteredByStatus = initialActivityList.filter(
          activity => activity.state === getStatusId(status)
        )
        setActivityList(activityListFilteredByStatus)
      } else {
        if(page == '')setActivityList(pages[0])
        else setActivityList(pages[page-1])
      }
    }
    statusfilter(status)
  }, [status])
  /**
   * Pagination event
   */
  useEffect(()=>{
    function pageSelect(page){
      setActivityList(pages[page-1])      
    }
    pageSelect(page)
  },[page]);
  /**
   * Obtiene la lista de actividades
   */
  useEffect(() => {
    const fetchData = async () => {
      await api.getDirectorActivities(5).then(res => {
        setActivityList(getPages(res.data.activities,itemsByPage)[0])
        setInitialActivityList(res.data.activities);
        setServiceState(false)
        setLoading(false);
      });
      
    };
    fetchData();
  }, []);

  return (
    <Page className={classes.root} title="Listado de Actividades">
      <BreadCrumbs />
      <SearchBar context="activities" status={state}/>
      {loading ? (
        
        <LinearProgress className={classes.progress}/>
      ):( serviceState ? (
        <>
        <List list={activityList} option="Activity" context="/director/list-activities" />
        <ListPagination pages = {pages}/>        
        </>
      ) : (
        <Typography variant='h3'>No se obtuvieron resultados</Typography>
      )
        
      )}      
    </Page>
  );
};

const getPages = (activityList, npages) => {
  let pages = []
  let indexv = 0
  let br = true
  while (br) {
    let page = []
    for (let index = 1; index <= npages; index++) {
      if(indexv>=activityList.length) {
        index = npages+1
      }else{
        page.push(activityList[indexv])
        indexv++
      }      
    }
    pages.push(page)
    if(indexv>=activityList.length) br=false
  }
  return pages
}

function getStatusNameById(statusId) {
  switch (statusId) {
    case 1:
      return 'Nueva'
    case 2:
      return 'En revisión'
  }
}

function getStatusId(statusId) {
  switch (statusId) {
    case 'Nueva':
      return 1
    case 'En revisión':
      return 2
  }
}

function get_period (list){
  let res = [];
  list.map(element =>{
    if(res.includes(element.academic_year))res.push(element.academic_year) });
  return res;  
};

function get_status (list){
  let res = [];
  list.map(element =>{
   if(!res.includes(getStatusNameById(element.state))) res.push(getStatusNameById(element.state))})
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

export default connect(mapStateToProps) (DirectorListActivitiesView)
