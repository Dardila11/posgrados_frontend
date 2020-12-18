import React, { useState, useEffect } from 'react';

import api from 'src/views/teamc/services/Api';
import Page from 'src/components/Page';

import { LinearProgress, makeStyles,Typography } from '@material-ui/core';

import List from 'src/components/List';
import BreadCrumbs from './BreadCrumbs';
import StudentInfo from './StudentInfo';

import { useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1)      
  },
  title: {
    textAlign: 'center',
    margin: '20px'
  }
}));

const CoordinatorStudentView = () => {
  const classes = useStyles();
  let { id } = useParams();
  const [activityList, setActivityList] = useState([]);
  const [result, setResult] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await api.getStudentActivities(id).then(res => {
        if(res.data.activities.length == 0){
          setResult(false);
        }else{
          setActivityList(res.data.activities);
          setLoading(false);
        }
      });
      
    };
    fetchData();
  }, []);
  return (
    <>
    <Page className={classes.root} title="Estudiante">
      <BreadCrumbs  />
      <StudentInfo />
      {result ? (
        <>
          {loading ? (
            <LinearProgress className={classes.progress}/>
          ):(
            <>
            <Typography className={classes.title} variant='h1'>
              Actividades de investigación del estudiante
            </Typography>
            <List list = {activityList} option='Activity' context='/coordinator/list-activities'/>
            </>
          )}
          
        </>
      ) : (
        <Typography className={classes.title} variant='h3'>
            El estudiante no tiene actividades de investigación
          </Typography>
      )}
      </Page>
    </>
  );
};

export default CoordinatorStudentView;
