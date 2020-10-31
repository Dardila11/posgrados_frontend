import React, { useState, useEffect } from 'react';

import api from 'src/views/teamc/services/Api';
import Page from 'src/components/Page';

import { makeStyles } from '@material-ui/core';

import BreadCrumbs from './BreadCrumbs';
import ActivityInfoView from 'src/views/teamc/coordinator/Activities/ActivityInfoView/ActivityInfo';

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

const DirectorActivityView = () => {
  const classes = useStyles();
  const [activityList, setActivityList] = useState([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.getStudentActivitiesLocal();
      setResult('ok');
      setActivityList(res);
      
    };
    fetchData();
  }, []);
  const breadcrumb = [['Coordinador','/coordinator'],['Listado de estudiantes', '/coordinator/list-students'] ,['Listado de estudiantes']];
  return (
    <>
    <Page className={classes.root} title="Actividad">
      {/* BreadCrumbs */}
      <BreadCrumbs  />
      {/* Student Basic Info
          - Nombre, programa, cohorte*/}
      <ActivityInfoView />
      {/* Button Track Student */}
      {/* Activity Card List */}
      </Page>
    </>
  );
};

export default DirectorActivityView;
