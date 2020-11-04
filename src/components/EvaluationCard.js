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
  },
  calificacionAcepted: {
    color: '#4caf50'
  },
  calificacionReject: {
    color: '#f44336'
  }
});

/**
 *
 * @param {evaluation}
 * @description las información de la evaluacion previamente obtenida desde backend
 */
const EvaluationCard = ({ className,evaluation,context, ...rest }) => {
  const classes = useStyles();
  const link = context+'/evaluation/'+evaluation.id;
  let statusclass = null;
  switch (evaluation.calificacion) {
    case "ACEPTADA":
      statusclass = classes.calificacionAcepted;
      break;
    case "RECHAZADA":
      statusclass = classes.calificacionReject;
      break;
    default:
      break;
  }
  return ( 
      <Box boxShadow={3}>
        <Card className={clsx(classes.root, className)} {...rest}>
          <CardActionArea className = {classes.CardAction}>
            <Box alignItems="center" display="flex" flexDirection="column">
              <Typography color="textPrimary" gutterBottom variant="h4">
                {evaluation.title}
              </Typography>
              <Typography className={classes.Typography} fontWeight="fontWeightMedium" variant="body1">
                {evaluation.description}
              </Typography>              
              <Typography color="textSecondary" variant="body1">
              <b> <span className={statusclass}>
                {evaluation.calificacion}          
              </span> </b>
              </Typography>
            </Box>
          </CardActionArea>
        </Card>
      </Box>
  );
};

export default EvaluationCard;
