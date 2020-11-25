import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Card, CardContent, Button, Box, Typography, makeStyles, Container, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import service from 'src/views/teamb/services/service';
import ConfirmOption from 'src/views/teamb/activitiesView/components/ConfirmOption';

const objService = new service();

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

  const [emergenteEliminar, setEmergenteEliminar] = React.useState(false);
  const [activity, setActivity] = useState('');
  useEffect(() => {
    objService.GetActivity(id).then((result) => {
      var data = result.data;
      switch (data.type) {
        //case "Curso, dirección/revisión de proyecto":
        case 1:
          objService.GetActivityByType(id, "projectCourse").then((result) => {
            var dataActivity = result.data;
            setActivity(dataActivity);
          }).catch(() => {
            alert("Error, no hay registros para mostrar");
          });
          break;
        //case "Ponencia en congresos, simposios y/o jornadas":
        case 2:
          objService.GetActivityByType(id, "lecture").then((result) => {
            var dataActivity = result.data;
            setActivity(dataActivity);
          }).catch(() => {
            alert("Error, no hay registros para mostrar");
          });
          break;
        //case "Publicación":
        case 3:
          objService.GetActivityByType(id, "publication").then((result) => {
            var dataActivity = result.data;
            setActivity(dataActivity);
          }).catch(() => {
            alert("Error, no hay registros para mostrar");
          });
          break;
        //case "Exposición de resultados parciales de investigación":
        case 4:
          objService.GetActivityByType(id, "presentationResults").then((result) => {
            var dataActivity = result.data;
            setActivity(dataActivity);
          }).catch(() => {
            alert("Error, no hay registros para mostrar");
          });
          break;
        //case "Estancia de investigación en otra institucion":
        case 5:
          objService.GetActivityByType(id, "researchStays").then((result) => {
            var dataActivity = result.data;
            setActivity(dataActivity);
          }).catch(() => {
            alert("Error, no hay registros para  mostrar");
          });
          break;
        //case "Participación en proyecto de investigación":
        case 6:
          objService.GetActivityByType(id, "participationProjects").then((result) => {
            var dataActivity = result.data;
            setActivity(dataActivity);
          }).catch(() => {
            alert("Error, no hay registros para mostrar");
          });
          break;
      }
    }).catch(() => {
      alert("Error, no hay registros para mostrar");
    });
  }, []);

  const handleEliminar = () => {
    setEmergenteEliminar(true);
  };

  const handleEliminarNo = () => {
    setEmergenteEliminar(false);
  };

  const handleEliminarSi = () => {
    objService.DeleteActivity(activity.id).then((result) => {
      var dataActivity = result;
      window.location.href = '../';
    }).catch(() => {
      alert("Error, no hay registros para  mostrar");
    });

  };

  function activityOne() {
    return (
      <Card>
        <CardContent>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Codigo de actividad:</b> {activity.id}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Titulo:</b> {activity.title}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Descripción:</b> {activity.description}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Programa:</b> {activity.program}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Fecha Inicio:</b> {activity.start_date}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Fecha Fin:</b> {activity.end_date}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Horas asignadas:</b> {activity.assigned_hours}
          </Typography>
          <Button variant="contained" color="primary" href={activity.receipt}>
            <b>Justificante</b>
          </Button>
        </CardContent>
      </Card>
    );
  }

  function activityTwo() {
    return (
      <Card>
        <CardContent>
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
          <Typography variant="body1" component="p" gutterBottom>
            <b>Entidad organizadora:</b> {activity.institution}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Lugar de celebración:</b> {activity.place}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Fecha de realización:</b> {activity.start_date}
          </Typography>
          <Button variant="contained" color="primary" href={activity.receipt}>
            <b>Justificante</b>
          </Button>
        </CardContent>
      </Card>
    );
  }

  function activityThree() {
    return (
      <Card >
        <CardContent>
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
          <Button variant="contained" color="primary" href={activity.receipt}>
            <b>Justificante</b>
          </Button>
        </CardContent>
      </Card>
    );
  }

  function activityFour() {
    return (
      <Card>
        <CardContent>
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
          <Button variant="contained" color="primary" href={activity.receipt}>
            <b>Certificado</b>
          </Button>
        </CardContent>
      </Card>
    );
  }

  function activityFive() {
    return (
      <Card>
        <CardContent>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Código de actividad:</b> {activity.id}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Proposito de la estancia:</b> {activity.purpose}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Descripción:</b> {activity.description}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Ciudad:</b> {activity.city}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Institución:</b> {activity.institution}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Fecha Inicio:</b> {activity.start_date}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Fecha Fin:</b> {activity.end_date}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Nombre del responsable:</b> {activity.responsible}
          </Typography>
          <Button variant="contained" color="primary" href={activity.receipt}>
            <b>Justificante</b>
          </Button>
        </CardContent>

      </Card>);
  }

  function activitySix() {
    return (
      <Card>
        <CardContent>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Código de actividad:</b> {activity.id}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Nombre del proyecto:</b> {activity.name}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Investigador:</b> {activity.investigator}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Lugar de trabajo:</b> {activity.place}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Descripción de actividad:</b> {activity.description}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            <b>Linea de investigación:</b> {activity.investigation_line}
          </Typography>
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
          <Button variant="contained" color="primary" href={activity.receipt}>
            <b>Justificante</b>
          </Button>
        </CardContent>
      </Card>
    );
  }

  function Greeting() {
    switch (activity.type) {
      case 1:
        return activityOne();
        break;
      case 2:
        return activityTwo();
        break;
      case 3:
        return activityThree();
        break;
      case 4:
        return activityFour();
        break;
      case 5:
        return activityFive();
        break;
      case 6:
        return activitySix();
        break;
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

        {Greeting()}

        <Box display="flex" justifyContent="flex-end" p={2}>
          <IconButton onClick={handleEliminar} aria-label="delete" >
            <DeleteIcon />
          </IconButton>
          <IconButton color="secondary" aria-label="add an edit">
            <EditIcon />
          </IconButton>
        </Box>
      </Card>

      <ConfirmOption open={emergenteEliminar} onClose={handleEliminarNo} onClickPositive={handleEliminarSi}
        msg={'¿Esta seguro de que desea eliminar la actividad?'}
      />
    </Container>
  );
};
export default ActivityInfoView;
