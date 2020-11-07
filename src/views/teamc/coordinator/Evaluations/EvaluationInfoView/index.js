import React, { useState, useEffect } from 'react';

import api from 'src/views/teamc/services/Api';
import Page from 'src/components/Page';

import { makeStyles } from '@material-ui/core';

import List from 'src/components/List';
import BreadCrumbs from './BreadCrumbs';
import StudentInfo from './ActivityInfo';

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

const EvaluationsView = () => {
  const classes = useStyles();
  const [activityList, setActivityList] = useState([]);
  const [result, setResult] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.getStudentActivitiesLocal();
      /*if (res.status === 200) {
        setResult('ok');
        setActivityList(res.data);
      } else if (res.status === 500) {
        setResult('error');
      }*/
      setResult('ok');
      setActivityList(res);
      
    };
    fetchData();
  }, []);
  return (
    <>
    {/**TODO: Evaluation modal on click */}
    <Container>

    </Container>
    </>
  );
};

export default EvaluationsView;
