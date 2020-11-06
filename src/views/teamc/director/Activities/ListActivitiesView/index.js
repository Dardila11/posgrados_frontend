import React, { useState, useEffect } from 'react';
import { CircularProgress, LinearProgress, makeStyles } from '@material-ui/core';
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
  },
  progress:{
    marginTop: '30'
  }
}));

const DirectorListActivitiesView = () => {
  const [activityList, setActivityList] = useState([]);
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const periods = get_period(activityList);
  const status = get_status(activityList);
    
  useEffect(() => {
    const fetchData = async () => {
      await api.getDirectorActivities(5).then(res => {
        setActivityList(res.data.activities);
        setLoading(false);
      });
      
    };
    fetchData();
  }, []);

  return (
    <Page className={classes.root} title="Listado de Actividades">
      <BreadCrumbs />
      <SearchBar context="activities" periods = {periods} status = {status}/>
      {loading ? (
        
        <LinearProgress className={classes.progress}/>
      ):(
        <>
        <List list={activityList} option="Activity" context="/director/list-activities" />
        <ListPagination />        
        </>
      )}      
    </Page>
  );
};

function get_period (list){
  let res = [];
  list.map(element =>(
    !res.includes(element.academic_year) ? (
      res.push(element.academic_year) 
      ):(
        console.log('')
      )
    )
  );
  console.log(res);
  return res;  
};

function get_status (list){
  let res = [];
  list.map(element =>(
    !res.includes(element.type) ? (
      res.push(element.type) 
      ):(
        console.log('')
      )
    )
  );
  console.log(res);
  return res;  
};

export default DirectorListActivitiesView;
