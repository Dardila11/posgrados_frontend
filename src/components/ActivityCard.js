import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import {
  Card,
  Typography,
  Box,
  makeStyles,
  createMuiTheme,
  colors,
  CardActionArea
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { isUndefined } from 'lodash';

/*const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: colors.blue,  
  },
});*/

const useStyles = makeStyles({
  root: {},
  CardAction: {
    paddingTop: 5,
    paddingBottom: 5
  }
});

/**
 *
 * @param {activity}
 * @description las información de la actividad previamente obtenida desde backend
 */
const ActivityCard = ({ className, activity, context, ...rest }) => {
  const classes = useStyles();
  const link = context + '/activity/' + activity.id;
  let option = true;
  if(isUndefined(activity.title) || activity.title==null || activity.title=="") option=false;
  return (
    <RouterLink to={link}>
      <Box boxShadow={3}>
        <Card className={clsx(classes.root, className)} {...rest}>
          <CardActionArea className={classes.CardAction}>
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              textAlign="center"
            >
              {isUndefined(activity.title) || activity.title==null || activity.title==""?(console.log('')):(
              <Typography variant="body1" component="h1" variant="h4" gutterBottom>
                {activity.title}
              </Typography>
            )}
            {option?(
                <Typography
                className={classes.Typography}
                fontWeight="fontWeightMedium"
                variant="body1"
              >
                {activity.description}
              </Typography>
            ):(
              <Typography variant="body1" component="h1" variant="h4" gutterBottom>
                {activity.description}
              </Typography>
            )}
              
              <Typography color="textSecondary" variant="body1">
                {activity.type}
              </Typography>
              {/* <Typography color="textSecondary" variant="body1">
                {activity.academic_year}
              </Typography> */}
              <Typography color="textSecondary" variant="body1">
                {activity.start_date}
              </Typography>
            </Box>
          </CardActionArea>
        </Card>
      </Box>
    </RouterLink>
  );
};
export default ActivityCard;
