import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';
import {
  Avatar,
  Box,
  Grid,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {  
  },
  CardAction: {
    paddingTop : 10,
    paddingBottom : 10,
  },
  avatar: {
    height: 100,
    width: 100
  }
}));

const StudentCard = ({ className,student, ...rest }) => {
  const classes = useStyles();

  return (    
    <RouterLink to="student">    
      <Box boxShadow={3}>
        <Card className={clsx(classes.root, className)} {...rest}>
          <CardActionArea className = {classes.CardAction}>
            <Box alignItems="center" display="flex" flexDirection="column">
              <Avatar className={classes.avatar} src={student.avatar}/>
              <Typography color="textPrimary" gutterBottom variant="h3">
                {student.name}
              </Typography>
              <Typography color="textSecondary" variant="body1">
                {student.Program}
              </Typography>                
              <Typography color="textSecondary" variant="body1">
                {student.Status}
              </Typography>
              <Typography color="textSecondary" variant="body1">
                {student.Cohorte}
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
