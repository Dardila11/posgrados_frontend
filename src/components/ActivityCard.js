import React from 'react';
//import PropTypes from 'prop-types';
import { Card, Typography, Box, makeStyles, createMuiTheme, colors, CardActionArea } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';

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
  },
  CardAction: {
    paddingTop : 5,
    paddingBottom : 5,
  }
});

/**
 *
 * @param {activity}
 * @description las información de la actividad previamente obtenida desde backend
 */
const ActivityCard = ({ className,activity,context, ...rest }) => {
  const classes = useStyles();
  const link = context+'/activity/'+activity.id;
  console.log(context);
  return (
    <RouterLink to={link}>    
      <Box boxShadow={3}>
        <Card className={clsx(classes.root, className)} {...rest}>
          <CardActionArea className = {classes.CardAction}>
            <Box alignItems="center" display="flex" flexDirection="column">
              <Typography color="textPrimary" gutterBottom variant="h4">
                {activity.type}
              </Typography>
              <Typography className={classes.Typography} fontWeight="fontWeightMedium" variant="body1">
                {activity.description}
              </Typography>              
              <Typography color="textSecondary" variant="body1">
                {activity.id}
              </Typography>
            </Box>
          </CardActionArea>
        </Card>
      </Box>
    </RouterLink>
  );
};
/*
"id": 4,
"title": "Entrevista",
"name": "Publicacion",
"description": "Descripcion 1",
"receipt": "/media/b_activities_app/archivos/1-EFCastillo-Guia_-_Capitulo_1-2.pdf",
"state": 1,
"start_date": "2020-11-03",
"end_date": "2020-11-03",
"academic_year": "2020-21",
"type": "Publicacion",
"date_record": "2020-11-03T09:49:54-05:00",
"date_update": "2020-11-03T09:49:55-05:00",
"is_active": true,
"student": 4
*/
export default ActivityCard;
