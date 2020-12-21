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
  lockedCard:{
    paddingTop : 5,
    paddingBottom : 5,
    backgroundColor : '#e8eaf6',
    color: '#546e7a'
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
  let [activityInfo, setActivityInfo] = useState({})
  let [studentInfo, setStudentInfo] = useState({})
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  let statusclass = null;
  let valueclass = null;
  
  useEffect(() => {
    const fetchData = async () => {
      if(context=="director"){
        let directorId = localStorage.getItem("id")
        await api.getDirectorActivities(directorId).then(res => {
          let activity = res.data.activities.find(activity => activity.id == evaluation.activity)
          setActivityInfo(activity)
          setStudentInfo(activity.student.user)
          setLoading(false)
        })
      }else{
        let coordinatorId = localStorage.getItem("id")
        await api.getCoordinatorActivities(coordinatorId).then(res => {
          let activity = res.data.activities.find(activity => activity.id == evaluation.activity)
          setActivityInfo(activity)
          setStudentInfo(activity.student.user)
          setLoading(false)
        })
      }
     
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
      statusclass = classes.calificacionReject;
      break;
    case false:
      statusclass = classes.calificacionAcepted;
      break;
    default:
      break;
  }
  return ( 
      <>
      {loading? (
        <></>
      ):(
        <>
        {evaluation.is_save? (
        <Box boxShadow={3}>
          <Card className={clsx(classes.root)} {...rest}>
            <CardActionArea className = {classes.CardAction} onClick={handleClickOpen} enable="false">
              {getContent(activityInfo, studentInfo, evaluation, classes, valueclass, statusclass, context)}
            </CardActionArea>
          </Card>
          {getContentEvaluation(evaluation, activityInfo, open, handleClose, handleClickOpen, context)}  
        </Box>     
        ):
        (
          <Box boxShadow={3}>
          <Card className={classes.lockedCard} {...rest}>
              {getContent(activityInfo, studentInfo, evaluation, classes, valueclass, statusclass, context)}
          </Card>  
        </Box>
        )}
        </>  
      )}
      </>
  );
};

function getContentEvaluation(evaluation, activityInfo, open, handleClose, handleClickOpen, context){
  return(
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
  )
}

function getContent(activityInfo, studentInfo, evaluation, classes, valueclass, statusclass, context){
  return (
    <Box alignItems="center" display="flex" flexDirection="column">
              {isUndefined(activityInfo.title) ||
            activityInfo.title == null ||
            activityInfo.title == '' ? (
              isUndefined(activityInfo.description) ||
                activityInfo.description == null ||
                activityInfo.description == '' ? (
                  <></>
                ) : (
                  <Typography variant="h4" component="p" gutterBottom>
                    {activityInfo.description}
                  </Typography>
                )
            ) : (
              <Typography variant="h4" component="p" gutterBottom>
                {activityInfo.title}
              </Typography>
            )}
            {isUndefined(studentInfo.first_name) ||
            studentInfo.first_name == null ||
            studentInfo.first_name == '' ? (
              <></>
            ) : (
              <Typography variant="body1" component="p" gutterBottom>
                {studentInfo.first_name} {studentInfo.last_name}
              </Typography>
            )}
            {context == "director"? (
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
            ):(
              <Typography color="textSecondary" variant="body1">
              Creditos: 
              <b> 
                {evaluation.credits}       
              </b>
              </Typography>
            )}
            
              <Typography color="textSecondary" variant="body1">
              Estado:
              <b> <span className={statusclass}>
                {evaluation.is_save? (
                  <> Sin Notificar</>
                ):(
                  <> Notificada</>
                )}       
              </span> </b>
              </Typography>
              <Typography className={classes.Typography} fontWeight="fontWeightMedium" variant="body1">
                {evaluation.observations}
              </Typography> 
            </Box>
  )
}

export default EvaluationCard;
