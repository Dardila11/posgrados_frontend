import React from 'react';

import ActivityCard from './ActivityCard';

import { Container, Grid } from '@material-ui/core';

//const useStyles = makeStyles(theme => ({}));

const ActivityList = ({ activityList }) => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {activityList.map(activity => (
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <ActivityCard key={activity.id} activity={activity} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ActivityList;
