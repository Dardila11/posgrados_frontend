import React, { useState } from 'react'

import {
  TextField,
  Select,
  MenuItem,
  Button,
  makeStyles,
  Divider
} from '@material-ui/core'

import Api from 'src/views/teamc/services/Api'
import { AlertView } from 'src/components/Alert'
import { Formik } from 'formik'
import * as yup from 'yup'

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

const CreateEvaluation = props => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')

  const postData = async (values, isSaveed) => {
    setOpen(false)
    let directorId = parseInt(localStorage.getItem("id"))

    let jsonValues = {
      value: values.value,
      observations: values.observations,
      activity: values.activity,
      professor: values.professor,
      is_save: isSaveed

    }
    Api.postDirectorEvaluations(directorId, jsonValues)
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
        setOpen(true)
        setTypeAlert("error")
        setMessage("Ha ocurrido un error" + error)
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
          value: 1,
          observations: '',
          activity: parseInt(props.activityId),
          professor: parseInt(props.directorId),
          is_save: false,
          submitButton: ''

        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          if (values.submitButton == "save") {
            postData(values, true)
          } else {
            postData(values, false)
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
        }) => (
          <form className={classes.root} onSubmit={handleSubmit} noValidate>
            <Select
              id="activity-value"
              variant="outlined"
              type="select"
              defaultValue={1}
              name="value"
              value={values.value}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              
              <MenuItem value={1}>Favorable</MenuItem>
              <MenuItem value={2}>No Favorable</MenuItem>
            </Select>
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
            <Button type="submit" onClick={() => setFieldValue('submitButton', "save") } variant="contained" color="primary">
              Guardar
            </Button>
            <Button type="submit" onClick={() => setFieldValue('submitButton', "send") } variant="contained" color="primary">
            Guardar y Notificar
          </Button>
          </form>
        )}
      </Formik>
      <AlertView open={open} typeAlert={typeAlert} message={message} />
    </>
  )
}
export default CreateEvaluation
