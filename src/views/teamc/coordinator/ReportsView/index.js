import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page'
import BreadCrumbs from './BreadCrumbs'
import reports from 'src/views/teamc/services/local_data/reports'
import List from 'src/components/List';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  },
  list:{
    paddingTop: '20px'
  }
}));

const ReportsView = () => {
    const classes = useStyles();
    console.log(reports)
  return (
    <Page className={classes.root} title="Reportes">
      <BreadCrumbs />
      <hr/>
      <List className={classes.list} list={reports} option="Reports" context="coordinator"/>
    </Page>
  );
};

export default ReportsView
