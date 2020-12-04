import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import {
  Card,
  Typography,
  Box,
  makeStyles,
  CardActionArea
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import { isUndefined } from 'lodash';

const useStyles = makeStyles({
  root: {
  },
  CardAction: {
    paddingTop: 5,
    paddingBottom: 5
  },
  favorableStatus:{
    backgroundColor : '#b9f6ca'
  },
  unfavorableStatus:{
    backgroundColor: '#f4ff81'
  }
});

/**
 *
 * @param {activity}
 * @description las información de la actividad previamente obtenida desde backend
 */
const ActivityCard = ({ className, activity, context, ...rest }) => {
  const link = context + '/activity/' + activity.id;
  let option = true;
  const classes = useStyles();
  let cardClass = ''
  
  switch (activity.state) {
    case 1:
      cardClass = classes.favorableStatus
      break;
    case 2:
      cardClass= classes.unfavorableStatus
      break;
    default:
      break;
  }
  if(isUndefined(activity.title) || activity.title==null || activity.title=="") option=false;
  return (
    <RouterLink to={link}>
      <Box boxShadow={3}>
        <Card className={clsx(cardClass, className)} {...rest}>
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
