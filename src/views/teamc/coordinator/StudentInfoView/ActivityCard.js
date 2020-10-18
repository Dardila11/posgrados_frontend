import React from 'react';
//import PropTypes from 'prop-types';
import { Card, Typography, CardContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 150,
    minHeight: 150,
    maxHeight: 150
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
const ActivityCard = ({ activity }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {activity.title}
        </Typography>
        <Typography variant="body2" component="h3">
          {activity.description}
        </Typography>
        <Typography variant="body2" component="h3">
          {activity.modality}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
