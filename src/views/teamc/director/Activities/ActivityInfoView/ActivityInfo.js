import React, { useState, useEffect } from 'react'

import api from 'src/views/teamc/services/Api'

import { Link, useParams } from 'react-router-dom'
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  makeStyles,
  Container,
  LinearProgress
} from '@material-ui/core'
import { isUndefined } from 'lodash'
import DialogForm from 'src/components/DialogForm'
import CreateEvaluation from 'src/views/teamc/director/Activities/ActivityInfoView/CreateEvaluation'

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
  },
  progress: {
    marginTop: '30'
  }
})

const ActivityInfoView = () => {
  let { id } = useParams()
  const [activityInfo, setActivityInfo] = useState({})
  const [loading, setBusy] = useState(true)
  const [activityPk, setActivityPk] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      await api.getActivity(id).then(res => {
        setActivityInfo(res.data)
        setActivityPk(res.data.id)
        setBusy(false)
      })
    }
    fetchData()
  }, [])
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Container>
      {loading ? (
        <LinearProgress className={classes.progress} />
      ) : (
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h3" component="h2" gutterBottom>
              Información de la actividad
            </Typography>
            {isUndefined(activityInfo.title) ||
            activityInfo.title == null ||
            activityInfo.title == '' ? (
              console.log('')
            ) : (
              <Typography variant="body1" component="p" gutterBottom>
                <b>Titulo:</b> {activityInfo.title}
              </Typography>
            )}
            {isUndefined(activityInfo.description) ||
            activityInfo.description == null ||
            activityInfo.description == '' ? (
              console.log('')
            ) : (
              <Typography variant="body1" component="p" gutterBottom>
                <b>Descripcion:</b> {activityInfo.description}
              </Typography>
            )}
            {isUndefined(activityInfo.academic_year) ||
            activityInfo.academic_year == null ? (
              console.log('')
            ) : (
              <Typography variant="body1" component="p" gutterBottom>
                <b>Año academico:</b> {activityInfo.academic_year}
              </Typography>
            )}
            {isUndefined(activityInfo.type) || activityInfo.type == null ? (
              console.log('')
            ) : (
              <Typography variant="body1" component="p" gutterBottom>
                <b>Tipo:</b> {activityInfo.type}
              </Typography>
            )}
            {/*isUndefined(activityInfo.receipt) || activityInfo.receipt==null ?(console.log('')):(
              <Typography variant="body1" component="p" gutterBottom>
                <b>Soporte: </b> 
                  <Link href={activityInfo.receipt}>
                      Descargar Soporte
                  </Link>
              </Typography>
            )*/}
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Realizar Evaluación
            </Button>

            <DialogForm
              title="Creación de evaluación"
              open={open}
              handleClose={handleClose}
              handleOpen={handleClickOpen}
              component={<CreateEvaluation activityId={activityPk} />}
            />
          </CardActions>
        </Card>
      )}
    </Container>
  )
}

export default ActivityInfoView
