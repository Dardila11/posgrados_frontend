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
  /*favorableStatus:{
    backgroundColor : '#b9f6ca'
  },
  unfavorableStatus:{
    backgroundColor: '#f4ff81'
  }*/
  favorableStatus:{
    color : '#4caf50'
  },
  unfavorableStatus:{
    color: '#ffc400'
  }
});

/**
 *
 * @param {Gi}
 * @description las información de la actividad previamente obtenida desde backend
 */
const GICard = ({ className, Gi, context, ...rest }) => {
  const classes = useStyles();

  return (
      <Box boxShadow={3}>
        <Card className={clsx(className)} {...rest}>
          <CardActionArea className={classes.CardAction}>
            <Box
              alignItems="center"
              display="flex"
              flexDirection="column"
              textAlign="center"
            >
              {isUndefined(Gi.name) || Gi.name==null || Gi.name==""?(console.log('')):(
              <Typography variant="body1" component="h1" variant="h4" gutterBottom>
                Nombre: {Gi.name}
              </Typography>
            )}
            <Typography variant="body1" component="h1" variant="h4" gutterBottom>
              Email: {Gi.email}
            </Typography>
              <Typography color="textSecondary" variant="body1">
                Fecha fundación {Gi.foundation_date}
              </Typography>
           
              <Typography color="textSecondary" variant="body1">
                {Gi.type}
              </Typography>
              <Typography color="textSecondary" variant="body1">
                Categoria: {Gi.category}
              </Typography>
              <Typography color="textSecondary" variant="body1">
              Estado:
              <b> <span className={spanClass}>
                {Gi.status === true? (
                  <> Activo</>
                ):(
                  <> Inactivo</>
                )}       
              </span> </b>
              </Typography>
            </Box>
          </CardActionArea>
        </Card>
      </Box>
  );
};
export default GICard;
