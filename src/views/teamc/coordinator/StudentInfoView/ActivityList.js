import React from 'react';

import ActivityCard from './ActivityCard';

import { Grid, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

const ActivityList = ({ activityList }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {activityList.map(activity => (
        <ActivityCard />
      ))}
    </div>
  );
};

export default ActivityList;
