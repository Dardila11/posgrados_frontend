import React, { useState } from 'react'

import {
  TextField,
  Select,
  MenuItem,
  Button,
  makeStyles,
  Divider,
  Typography
} from '@material-ui/core'

import Api from 'src/views/teamc/services/Api'
import { AlertView } from 'src/components/Alert'
import { Formik } from 'formik'
import * as yup from 'yup'
import { isUndefined } from 'lodash'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}))

const validationSchema = yup.object().shape({
  observations: yup
    .string('escriba las observaciones')
    .required('Observaciones es obligatoria')
})

const EditEvaluationCoordinator = props => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')
  const evaluation = props.evaluation
  const activity = props.activity

  const postData = async (values) => {
    setOpen(false)
    Api.postDirectorEvaluations(5, values)
      .then(res => {
        if(res.status == 201) {
          console.log(res.status);
          setOpen(true)
          setTypeAlert("success")
          setMessage("Evaluación creada con exito")
        }
      })
      .catch(error => {
        console.log(error);
      })
    
  }

  return (
    <>
      <h1> {props.title} </h1>
      <Formik
        initialValues={{
          /*
          value: 1 -- Favorable
          value: 2 -- No Favorable
          */
          credits: evaluation.credits,
          observations: evaluation.observations,
          activity: parseInt(activity.id),
          professor: parseInt(activity.director)
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values)
          postData(values)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <form className={classes.root} onSubmit={handleSubmit} noValidate>
             {isUndefined(activity.title) ||
            activity.title == null ||
            activity.title == '' ? (
              isUndefined(activity.name) ||
                activity.name == null ||
                activity.name == '' ? (
                  <></>
                ) : (
                  <Typography variant="h4" component="p" gutterBottom>
                    Actividad: {activity.name}
                  </Typography>
                )
            ) : (
              <Typography variant="h4" component="p" gutterBottom>
                Actividad: {activity.title}
              </Typography>
            )}
            <TextField
              id="outlined-multiline-static2"
              label="Creditos"
              variant="outlined"
              multiline
              rows={1}
              name="credits"
              value={values.credits}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.credits &&
                touched.credits &&
                errors.credits
              }
              helperText={
                errors.credits &&
                touched.credits &&
                errors.credits
              }
            />
            <TextField
              id="outlined-multiline-static"
              label="Observaciones"
              variant="outlined"
              multiline
              rows={5}
              name="observations"
              value={values.observations}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.observations &&
                touched.observations &&
                errors.observations
              }
              helperText={
                errors.observations &&
                touched.observations &&
                errors.observations
              }
            />
            <Divider variant="middle" />
            <Button type="submit" variant="contained" color="primary">
              Guardar
            </Button>
            <Button type="submit" variant="contained" color="primary">
            Guardar y Notificar
          </Button>
          </form>
        )}
      </Formik>
      <AlertView open={open} typeAlert={typeAlert} message={message} />
    </>
  )
}

export default EditEvaluationCoordinator