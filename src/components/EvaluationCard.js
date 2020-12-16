import React , { useState, useEffect } from 'react';
//import PropTypes from 'prop-types';
import { Card, Typography, Box, makeStyles, createMuiTheme, colors, CardActionArea } from '@material-ui/core';
import api from 'src/views/teamc/services/Api'
import clsx from 'clsx';
import { isUndefined } from 'lodash'
import DialogForm from 'src/components/DialogForm'
import EditEvaluationDirector from 'src/views/teamc/director/Evaluations/EvaluationInfoView/EditEvaluation';
import EditEvaluationCoordinator from 'src/views/teamc/coordinator/Evaluations/EvaluationInfoView/EditEvaluation';

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
  },
});

/**
 *
 * @param {evaluation}
 * @description las información de la evaluacion previamente obtenida desde backend
 */
const EvaluationCard = ({ evaluation,context, ...rest }) => {
  const classes = useStyles();
  const [activityInfo, setActivityInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  let statusclass = null;
  let valueclass = null;
  console.log(context)
  
  useEffect(() => {
    const fetchData = async () => {
      await api.getActivity(evaluation.id).then(res => {
        setActivityInfo(res.data)
        setLoading(false)
      })
    }
    fetchData()
  }, [])

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  switch (evaluation.value) {
    case 1:
      valueclass = classes.calificacionAcepted;
      break;
    case 2:
      valueclass = classes.calificacionReject;
      break;
    default:
      break;
  }
  switch (evaluation.is_save) {
    case true:
      statusclass = classes.calificacionAcepted;
      break;
    case false:
      statusclass = classes.calificacionReject;
      break;
    default:
      break;
  }
  return ( 
      <>
      {loading? (
        <></>
      ):(
        <Box boxShadow={3}>
        <Card className={clsx(classes.root)} {...rest}>
          <CardActionArea className = {classes.CardAction} onClick={handleClickOpen}>
            <Box alignItems="center" display="flex" flexDirection="column">
              {isUndefined(activityInfo.title) ||
            activityInfo.title == null ||
            activityInfo.title == '' ? (
              isUndefined(activityInfo.name) ||
                activityInfo.name == null ||
                activityInfo.name == '' ? (
                  <></>
                ) : (
                  <Typography variant="h4" component="p" gutterBottom>
                    {activityInfo.name}
                  </Typography>
                )
            ) : (
              <Typography variant="h4" component="p" gutterBottom>
                {activityInfo.title}
              </Typography>
            )}
            <Typography color="textSecondary" variant="body1">
              Calificación:
              <b> <span className={valueclass}>
                {evaluation.value == 1? (
                  <> Favorable</>
                ):(
                  <> No favorable</>
                )}       
              </span> </b>
              </Typography>             
              <Typography color="textSecondary" variant="body1">
              Estado:
              <b> <span className={statusclass}>
                {evaluation.is_save? (
                  <> Notificada</>
                ):(
                  <> Sin Notificar</>
                )}       
              </span> </b>
              </Typography>
              <Typography className={classes.Typography} fontWeight="fontWeightMedium" variant="body1">
                {evaluation.observations}
              </Typography> 
            </Box>
          </CardActionArea>
        </Card>
        <DialogForm
              title="Modificar evaluación"
              open={open}
              handleClose={handleClose}
              handleOpen={handleClickOpen}
              component={context == "director"? (
                <EditEvaluationDirector evaluation={evaluation} activity={activityInfo}/>
              ):(
                <EditEvaluationCoordinator evaluation={evaluation} activity={activityInfo}/>
              )}
            />
      </Box>
      
      )}
      </>
  );
};

export default EvaluationCard;
