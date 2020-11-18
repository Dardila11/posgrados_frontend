import React from 'react';

import Page from 'src/components/Page';

import { makeStyles } from '@material-ui/core';

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

const CoordinatorActivityView = () => {
  const classes = useStyles();
  const breadcrumb = [
    ['Coordinador', '/coordinator'],
    ['Listado de estudiantes', '/coordinator/list-students'],
    ['Listado de estudiantes']
  ];
  return (
    <>
      <Page className={classes.root} title="Actividad">
        <BreadCrumbs />
        <ActivityInfoView />
      </Page>
    </>
  );
};

export default CoordinatorActivityView;
