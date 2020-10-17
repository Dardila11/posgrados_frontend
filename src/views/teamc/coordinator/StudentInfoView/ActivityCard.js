import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, CardContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 320,
    margin: '10px',
    width: 350,
    height: 150
  },
  media: {
    height: 140
  }
});

/**
 *
 * @param {activity}
 * @description las información de la actividad previamente obtenida desde backend
 */
const ActivityCard = ({ activityInfo }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {activityInfo.title}
        </Typography>
        <Typography variant="body2" component="h3">
          {activityInfo.description}
        </Typography>
        <Typography variant="body2" component="h3">
          {activityInfo.modality}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
