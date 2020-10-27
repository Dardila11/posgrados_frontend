import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {  
    
  },
  CardAction: {
    paddingTop : 5,
    paddingBottom : 5,
  },
  avatar: {
    height: 100,
    width: 100
  },
  Typography:{
    textAlign: 'center'
  },
  statusActive: {
    color: 'green'
  },
  statusInactive: {
    color: 'gray'
  },
  statusRetired: {
    color: 'red'
  },
  statusGraduate: {
    color: 'blue'
  }
}));

const StudentCard = ({ className,element, ...rest }) => {
  const classes = useStyles();
  const student = element;
  const link = 'student/'+student.id;

  let statusclass = null;
  switch (student.status) {
    case "ACTIVO":
      statusclass = classes.statusActive;
      break;
    case "INACTIVO":
      statusclass = classes.statusInactive;
      break;
    case "RETIRADO":
        statusclass = classes.statusRetired;
        break;
    case "GRADUADO":
        statusclass = classes.statusGraduate;
        break;
    default:
      break;
  }
  return (    
    <RouterLink to={link}>    
      <Box boxShadow={3}>
        <Card className={clsx(classes.root, className)} {...rest}>
          <CardActionArea className = {classes.CardAction}>
            <Box alignItems="center" display="flex" flexDirection="column">
              <Avatar className={classes.avatar} src={student.image}/>
              <Typography color="textPrimary" gutterBottom variant="h3">
                {student.first_name} {student.last_name}
              </Typography>
              <Typography className={classes.Typography} fontWeight="fontWeightMedium" variant="body1">
                {student.program}
              </Typography>                
              <Typography fontWeight="fontWeightBold" variant="body1">
              <b> <span className={statusclass}>
                {student.status}          
              </span> </b>
              </Typography>
              <Typography color="textSecondary" variant="body1">
                {student.cohorte}
              </Typography>
            </Box>
          </CardActionArea>
        </Card>
      </Box>
    </RouterLink>
  );
};

StudentCard.propTypes = {
  className: PropTypes.string
};

export default StudentCard;
