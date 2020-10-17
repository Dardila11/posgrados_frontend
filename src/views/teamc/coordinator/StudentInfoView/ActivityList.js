import React from 'react';

import ActivityCard from './ActivityCard';

import { makeStyles, GridList } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  }
}));

const ActivityList = ({ activityList }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList cellHeight cols={3}>
        {activityList.map((activity, index) => (
          <ActivityCard key={index} activityInfo={activity} />
        ))}
      </GridList>
    </div>
  );
};

export default ActivityList;
