import React, { useState, useEffect } from 'react';
import { CircularProgress, LinearProgress, makeStyles } from '@material-ui/core';
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

const DirectorListActivitiesView = ({search, status}) => {
  const [activityList, setActivityList] = useState([])
  const [initialActivityList, setInitialActivityList] = useState([])
  const [loading, setLoading] = useState(true);
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
        activityList.map(
          activity => 
          
            {
              if(activity.title.toLowerCase().includes(search.search.toLowerCase())||
              activity.description.toLowerCase().includes(search.search.toLowerCase())){
                activitiesListSearch.push(activity)
              }
            }
          )
        setActivityList(activitiesListSearch)
      }else{
        setActivityList(initialActivityList)
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
        setActivityList(initialActivityList)
      }
    }
    statusfilter(status)
  }, [status])
  /**
   * Obtiene la lista de actividades
   */
  useEffect(() => {
    const fetchData = async () => {
      await api.getDirectorActivities(5).then(res => {
        setActivityList(res.data.activities);
        setInitialActivityList(res.data.activities);
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
      ):(
        <>
        <List list={activityList} option="Activity" context="/director/list-activities" />
        {/*<ListPagination />*/}        
        </>
      )}      
    </Page>
  );
};

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
})

export default connect(mapStateToProps) (DirectorListActivitiesView)
