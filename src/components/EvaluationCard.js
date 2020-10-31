import React from 'react';
//import PropTypes from 'prop-types';
import { Card, Typography, CardContent, makeStyles, createMuiTheme, colors, CardActionArea } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: colors.blue,  
  },
});

const useStyles = makeStyles({
  root: {
    minWidth: 150,
    minHeight: 150,
    maxHeight: 150,
    backgroundColor: theme.palette.secondary,
    color: colors.black
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
const ActivityCard = ({ evaluation }) => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Typography gutterBottom variant="h5" component="h2">
          {evaluation.title}
        </Typography>
        <Typography variant="body2" component="h3">
          {evaluation.description}
        </Typography>
        <Typography variant="body2" component="h3">
          {evaluation.modality}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default ActivityCard;
