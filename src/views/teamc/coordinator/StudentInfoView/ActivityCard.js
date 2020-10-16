import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, CardContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    maxWidth: 320,
    margin: '10px'
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
          Titulo de la Actividad
        </Typography>
        <Typography variant="body2" component="h3">
          Descripción
        </Typography>
        <Typography variant="body2" component="h3">
          Modalidad
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
