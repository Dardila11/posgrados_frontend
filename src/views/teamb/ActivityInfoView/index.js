import React, { useState, useEffect } from 'react';
import api from 'src/views/teamc/services/Api';
import Page from 'src/components/Page';
import { makeStyles,Typography } from '@material-ui/core';
import BreadCrumbs from './BreadCrumbs';
import ActivityInfoView from './ActivityInfo';

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

const ActivityStudentView = () => {
  const classes = useStyles();

  const breadcrumb = [['Student','/student'],['Listado de estudiantes', '/student/list-students'] ,['Listado de estudiantes']];
  return (
    <>
    <Page className={classes.root} title="Estudiante">
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

export default ActivityStudentView;
