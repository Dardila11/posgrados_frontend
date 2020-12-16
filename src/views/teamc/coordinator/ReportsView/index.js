import React from 'react';
import { makeStyles } from '@material-ui/core';
import Page from 'src/components/Page'
import BreadCrumbs from './BreadCrumbs'
import ReportCard from 'src/components/ReportCard';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  }
}));

const ReportsView = () => {
    const classes = useStyles();

  return (
    <Page className={classes.root} title="Reportes">
      <BreadCrumbs />
      <ReportCard/>
    </Page>
  );
};

export default ReportsView
