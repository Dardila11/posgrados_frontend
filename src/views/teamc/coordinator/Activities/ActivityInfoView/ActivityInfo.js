import React, { useState, useEffect } from 'react';

import api from 'src/views/teamc/services/Api';

import { useParams } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  makeStyles,
  Dialog,
  DialogActions,
  DialogTitle,
  Container,
  LinearProgress,
  Link
} from '@material-ui/core';
import { isUndefined } from 'lodash';
import DialogForm from 'src/components/DialogForm';
import CreateEvaluation from 'src/views/teamc/coordinator/Activities/ActivityInfoView/CreateEvaluation'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: '15px'
  },
  statusActive: {
    color: '#4caf50'
  },
  statusInactive: {
    color: '#757575'
  },
  statusRetired: {
    color: '#f44336'
  },
  statusGraduate: {
    color: '#0277bd'
  }
});

const ActivityInfoView = () => {
  let { id } = useParams();
  const [activityInfo, setActivityInfo] = useState({});
  const [activityPk, setActivityPk] = useState("");
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await api.getActivity(id).then(res => {
        setActivityInfo(res.data);
        setActivityPk(res.data.id)
        setBusy(false);
      });      
    };
    fetchData();
  },[]);
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  /*
  academic_year: "2020"
  date_record: "2020-11-02T16:16:08-05:00"
  date_update: "2020-11-02T16:16:10-05:00"
  description: "Descripcion de la actividad"
  end_date: null
  id: 1
  is_active: true
  name: "revision tecnica formal"
  receipt: "http://mdquilindo.pythonanywhere.com/media/b_activities_app/archivos/14719904672.pdf"
  start_date: "2020-11-02"
  state: 1
  student: 1
  title: "revision tecnica formal"
  type: "Simposio"
  */
  console.log(activityInfo);
  return (
    <Container>
      {isBusy ? (
        <LinearProgress />
      ) : (
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h3" component="h2" gutterBottom>
              Información de la actividad
            </Typography>
            {isUndefined(activityInfo.title) || activityInfo.title==null || activityInfo.title==""?(console.log('')):(
              <Typography variant="body1" component="p" gutterBottom>
                <b>Titulo:</b> {activityInfo.title}
              </Typography>
            )}
            {isUndefined(activityInfo.description) || activityInfo.description==null || activityInfo.description==""?(console.log('')):(
              <Typography variant="body1" component="p" gutterBottom>
                <b>Descripcion:</b> {activityInfo.description}
              </Typography>
            )}
            {isUndefined(activityInfo.academic_year) || activityInfo.academic_year==null?(console.log('')):(
              <Typography variant="body1" component="p" gutterBottom>
                <b>Año academico:</b> {activityInfo.academic_year}
              </Typography>
            )}
            {isUndefined(activityInfo.type) || activityInfo.type==null ?(console.log('')):(
              <Typography variant="body1" component="p" gutterBottom>
                <b>Tipo:</b> {activityInfo.type}
              </Typography>
            )}
            {isUndefined(activityInfo.receipt) || activityInfo.receipt==null ?(console.log('')):(
              <Typography variant="body1" component="p" gutterBottom>
                <b>Soporte: </b> 
                  <Link href={activityInfo.receipt}>
                      Descargar Soporte
                  </Link>
              </Typography>
            )}
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Realizar Evaluación
            </Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle variant="h2" onClose={handleClose}>
                Evaluación de la actividad
              </DialogTitle>

              <DialogForm
              title="Creación de evaluación"
              open={open}
              handleClose={handleClose}
              handleOpen={handleClickOpen}
              component={< CreateEvaluation activityId={activityPk} />}
              />
            </Dialog>
          </CardActions>
        </Card>
      )}
    </Container>
  );
};

export default ActivityInfoView;
