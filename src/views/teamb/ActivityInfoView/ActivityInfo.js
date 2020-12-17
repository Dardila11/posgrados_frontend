import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { DialogTitle, DialogContent, Dialog, Card, CardContent, Button, Box, Typography, makeStyles, Container, IconButton, Grid } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import ConfirmOption from 'src/views/teamb/activitiesView/components/ConfirmOption';
import Prize from 'src/views/teamb/ActivityInfoView/Prize';
import DirEvaluation from 'src/views/teamb/ActivityInfoView/DirEvaluation';
import CoordEvaluation from 'src/views/teamb/ActivityInfoView/CoordEvaluation';
import Program from 'src/views/teamb/ActivityInfoView/components/Program';
import Institution from 'src/views/teamb/ActivityInfoView/components/Institution';
import City from 'src/views/teamb/ActivityInfoView/components/City';
import Investigator from 'src/views/teamb/ActivityInfoView/components/Investigator';
import InvestigationLine from 'src/views/teamb/ActivityInfoView/components/InvestigationLine';

import ActivityOneEdit from '../ActivityInfoView/EditActivity/ActivityOneEdit';
import ActivityTwoEdit from '../ActivityInfoView/EditActivity/ActivityTwoEdit';
import ActivityThreeEdit from '../ActivityInfoView/EditActivity/ActivityThreeEdit';
import ActivityFourEdit from '../ActivityInfoView/EditActivity/ActivityFourEdit';
import ActivityFiveEdit from '../ActivityInfoView/EditActivity/ActivityFiveEdit';
import ActivitySixEdit from '../ActivityInfoView/EditActivity/ActivitySixEdit';

import service from 'src/views/teamb/services/service';
import util from 'src/views/teamb/services/util';

const objService = new service();
const objUtil = new util();

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: '250px',
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
  const classes = useStyles();
  let { id } = useParams();

  const [open, setOpen] = React.useState(false);
  const [emergenteEliminar, setEmergenteEliminar] = React.useState(false);
  const [activity, setActivity] = useState('');
  useEffect(() => {
    objService.GetActivity(id).then((result) => {
      var data = result.data;
      switch (data.type) {
        case "Curso, dirección/revisión de proyecto":
          objService.GetActivityByType(id, "projectCourse").then((result) => {
            var dataActivity = result.data;
            setActivity(dataActivity);
          }).catch(() => {
            alert("Error, no hay registros para mostrar");
          });
          break;
        case "Ponencia en congresos, simposios y/o jornadas":
          objService.GetActivityByType(id, "lecture").then((result) => {
            var dataActivity = result.data;
            setActivity(dataActivity);
          }).catch(() => {
            alert("Error, no hay registros para mostrar");
          });
          break;
        case "Publicación":
          objService.GetActivityByType(id, "publication").then((result) => {
            var dataActivity = result.data;
            setActivity(dataActivity);
          }).catch(() => {
            alert("Error, no hay registros para mostrar");
          });
          break;
        case "Exposición de resultados parciales de investigación":
          objService.GetActivityByType(id, "presentationResults").then((result) => {
            var dataActivity = result.data;
            setActivity(dataActivity);
          }).catch(() => {
            alert("Error, no hay registros para mostrar");
          });
          break;
        case "Estancia de investigación en otra institucion":
          objService.GetActivityByType(id, "researchStays").then((result) => {
            var dataActivity = result.data;
            setActivity(dataActivity);
          }).catch(() => {
            alert("Error, no hay registros para  mostrar");
          });
          break;
        case "Participación en proyecto de investigación":
          objService.GetActivityByType(id, "participationProjects").then((result) => {
            var dataActivity = result.data;
            setActivity(dataActivity);
          }).catch(() => {
            alert("Error, no hay registros para mostrar");
          });
          break;
        default:
          alert("Error, no hay registros para mostrar");
      }
    }).catch(() => {
      alert("Error, no hay registros para mostrar");
    });
  }, []);

  const handleEditar = () => {
    setOpen(true);
  }
  const handleEditarClose = () => {
    setOpen(false);
  }
  
  const handleEliminar = () => {
    setEmergenteEliminar(true);
  };
  const handleEliminarNo = () => {
    setEmergenteEliminar(false);
  };
  const handleEliminarSi = () => {
    const fd = new FormData();
    var now = objUtil.GetCurretTimeDate();
    fd.append("start_date", activity.start_date);
    fd.append("type", activity.type);
    fd.append("academic_year", activity.academic_year);
    fd.append("date_record", activity.date_record);
    fd.append("date_update", now);
    fd.append("is_active", false);
    
    objService.DeleteActivity(fd, activity.id).then((result) => {
      window.location.href = '../';
    }).catch(() => {
      alert("Error, no hay registros para  mostrar");
    });

  };

  function activityOne() {
    return (
      <Grid>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Codigo de actividad:</b> {activity.id}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Titulo:</b> {activity.title}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Descripción:</b> {activity.description}
        </Typography>
        <Program id={activity.program}></Program>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Fecha Inicio:</b> {activity.start_date}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Fecha Fin:</b> {activity.end_date}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Horas asignadas:</b> {activity.assigned_hours}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Estado: </b> {objUtil.GetState(activity.state)}
        </Typography>
        <Button variant="contained" color="primary" href={activity.receipt}>
          <b>Justificante</b>
        </Button>
      </Grid>
    );
  }

  function activityTwo() {
    return (
      <Grid>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Código de actividad:</b> {activity.id}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Titulo:</b> {activity.title}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Descripción:</b> {activity.description}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Nombre del evento:</b> {activity.name}
        </Typography>
        <Institution msg="Entidad organizadora: " id={activity.institution}></Institution>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Lugar de celebración:</b> {activity.place}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Fecha de realización:</b> {activity.start_date}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Estado: </b> {objUtil.GetState(activity.state)}
        </Typography>
        <Button variant="contained" color="primary" href={activity.receipt}>
          <b>Justificante</b>
        </Button>
      </Grid>
    );
  }

  function activityThree() {
    return (
      <Grid>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Id:</b> {activity.id}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Título:</b> {activity.title}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Tipo de publicacion:</b> {activity.type_publication}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Nombre:</b> {activity.name}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Autores:</b> {activity.authors}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Nombre editorial:</b> {activity.editorial}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Datos generales:</b> {activity.general_data}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Envio publicación:</b> {activity.start_date}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Fecha publicación:</b> {activity.end_date}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Estado: </b> {objUtil.GetState(activity.state)}
        </Typography>
        <Button variant="contained" color="primary" href={activity.receipt}>
          <b>Justificante</b>
        </Button>
      </Grid>
    );
  }

  function activityFour() {
    return (
      <Grid>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Código de actividad:</b> {activity.id}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Descripción:</b> {activity.description}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Fecha de exposición:</b> {activity.start_date}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Lugar de exposición:</b> {activity.place}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Nombre del evento:</b> {activity.name}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Modalidad de presentación:</b> {activity.modality}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Duración en horas:</b> {activity.duration_hours}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Estado: </b> {objUtil.GetState(activity.state)}
        </Typography>
        <Button variant="contained" color="primary" href={activity.receipt}>
          <b>Certificado</b>
        </Button>
      </Grid>
    );
  }

  function activityFive() {
    return (
      <Grid>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Código de actividad:</b> {activity.id}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Proposito de la estancia:</b> {activity.purpose}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Descripción:</b> {activity.description}
        </Typography>
        <City id={activity.city}></City>
        <Institution msg="Institución: " id={activity.institution}></Institution>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Fecha Inicio:</b> {activity.start_date}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Fecha Fin:</b> {activity.end_date}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Nombre del responsable:</b> {activity.responsible}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Estado: </b> {objUtil.GetState(activity.state)}
        </Typography>
        <Button variant="contained" color="primary" href={activity.receipt}>
          <b>Justificante</b>
        </Button>
      </Grid>
    );
  }

  function activitySix() {
    return (
      <Grid>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Código de actividad:</b> {activity.id}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Nombre del proyecto:</b> {activity.name}
        </Typography>
        <Investigator id={activity.investigator}></Investigator>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Lugar de trabajo:</b> {activity.place}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Descripción de actividad:</b> {activity.description}
        </Typography>
        <InvestigationLine id={activity.investigation_line}></InvestigationLine>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Codigo VRI:</b> {activity.code_VRI}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Tipo de convocatoria:</b> {activity.type_convocation}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Fecha Inicio:</b> {activity.start_date}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Fecha Fin:</b> {activity.end_date}
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          <b>Estado: </b> {objUtil.GetState(activity.state)}
        </Typography>
        <Button variant="contained" color="primary" href={activity.receipt}>
          <b>Justificante</b>
        </Button>
      </Grid>
    );
  }

  function Greeting() {
    switch (activity.type) {
      case 1:
        return activityOne();
      case 2:
        return activityTwo();
      case 3:
        return activityThree();
      case 4:
        return activityFour();
      case 5:
        return activityFive();
      case 6:
        return activitySix();
      default:        
    }
  }

  function editActivities() {
    switch (activity.type) {
      case 1:
        return <ActivityOneEdit state={activity} callbackDialogOpen={setOpen} />
      case 2:
        return <ActivityTwoEdit state={activity} callbackDialogOpen={setOpen} />
      case 3:
        return <ActivityThreeEdit state={activity} callbackDialogOpen={setOpen} />
      case 4:
        return <ActivityFourEdit state={activity} callbackDialogOpen={setOpen} />
      case 5:
        return <ActivityFiveEdit state={activity} callbackDialogOpen={setOpen} />
      case 6:
        return <ActivitySixEdit state={activity} callbackDialogOpen={setOpen} />
      default:
    }
  }

  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h3" component="h2" gutterBottom>
            Información de la actividad
          </Typography>
        </CardContent>

        <Card>
          <CardContent>
            {Greeting()}
            {activity.type === 2 || activity.type === 3 ? <Prize id={activity.id}></Prize> : null}
            {activity !== '' ? <DirEvaluation id={activity.id}></DirEvaluation> : null}
            {activity !== '' ? <CoordEvaluation id={activity.id}></CoordEvaluation> : null}
          </CardContent>
        </Card>

        <Box display="flex" justifyContent="flex-end" p={2}>
          {activity.state < 2 ?
            <IconButton onClick={handleEliminar} aria-label="delete" >
              <DeleteIcon />
            </IconButton>
            : null
          }
          <IconButton color="secondary" aria-label="add an edit" onClick={handleEditar}>
            <EditIcon />
          </IconButton>
        </Box>
      </Card>

      <Dialog aria-labelledby="customized-dialog-title" open={open} onClose={handleEditarClose}>
        <DialogTitle>Editar Actividad</DialogTitle>
        <DialogContent dividers>
          {editActivities()}
        </DialogContent>
      </Dialog>

      <ConfirmOption open={emergenteEliminar} onClose={handleEliminarNo} onClickPositive={handleEliminarSi}
        msg={'¿Esta seguro de que desea eliminar la actividad?'}
      />
    </Container>
  );
};
export default ActivityInfoView;
