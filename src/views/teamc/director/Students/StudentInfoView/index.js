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
  },progress:{
    marginTop : '30'
  }
}));

const DirectorStudentView = () => {
  let { id } = useParams();
  const classes = useStyles();
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
  const breadcrumb = [['Coordinador','/coordinator'],['Listado de estudiantes', '/coordinator/list-students'] ,['Listado de estudiantes']];
  return (
    <>
    <Page className={classes.root} title="Estudiante">
      {/* BreadCrumbs */}
      <BreadCrumbs  />
      {/* Student Basic Info
          - Nombre, programa, cohorte*/}
      <StudentInfo />
      {/* Button Track Student */}
      {/* Activity Card List */}
      {result ? (
        <>
          {loading ? (
            <LinearProgress className={classes.progress}/>
          ):(
            <>
            <Typography className={classes.title} variant='h1'>
              Actividades de investigación del estudiante
            </Typography>
            <List list = {activityList} option='Activity' context='/director/list-activities'/>
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

export default DirectorStudentView;
