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
  lockedCard:{
    backgroundColor : '#e8eaf6',
    color: '#546e7a'
  },
  favorableStatus:{
    color : '#4caf50'
  },
  unfavorableStatus:{
    color: '#ffc400'
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
  let spanClass = ''
  const student = activity.student
  switch (activity.state) {
    case 1:
      spanClass = classes.favorableStatus
      break;
    case 2:
      spanClass= classes.unfavorableStatus
      break;
    default:
      break;
  }
  if(isUndefined(activity.title) || activity.title==null || activity.title=="") option=false;
  return (
    <>
    {context == '/coordinator/student/list-activities' ? (
       <Box boxShadow={3}>
        <Card className={classes.lockedCard} {...rest}>
            {getContent(activity,student,classes,spanClass, option,context)}
        </Card>
      </Box>
    ):(<>
      <RouterLink to={link}>
        <Box boxShadow={3}>
          <Card className={clsx(className)} {...rest}>
            <CardActionArea className={classes.CardAction}>
              {getContent(activity,student,classes,spanClass, option,context)}
            </CardActionArea>
          </Card>
        </Box>
      </RouterLink>
    </>)}
    
    </>
  );
};

function getContent (activity,student,classes,spanClass, option,context){
  return (
   
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
            {context=="/director/list-activities" || context =="/coordinator/list-activities" ? 
            (
              <Typography color="textSecondary" variant="body1">
                {student.user.first_name} {student.user.last_name}
              </Typography>
            )
            :
            (
              <></>
            )
            }              
              <Typography color="textSecondary" variant="body1">
                {activity.type}
              </Typography>
              {/* <Typography color="textSecondary" variant="body1">
                {activity.academic_year}
              </Typography> */}
              <Typography color="textSecondary" variant="body1">
                {activity.start_date}
              </Typography>
              {context == '/coordinator/student/list-activities' ? (
                <></>
              ):(
                <Typography color="textSecondary" variant="body1">
                Estado:
                <b> <span className={spanClass}>
                  {activity.state == 1? (
                    <> Nueva</>
                  ):(
                    <> En revisión</>
                  )}       
                </span> </b>
              </Typography>
              )}
              
            </Box>
          
  )
}
export default ActivityCard;
