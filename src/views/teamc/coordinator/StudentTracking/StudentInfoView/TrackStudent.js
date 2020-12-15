import React, { useState } from 'react'

import {
  TextField,
  Select,
  MenuItem,
  makeStyles,
  Button, 
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
  // TODO graduation_date field validation
  num_folio: yup.string('Ingrese numero de folio').when('status', {
    is: 3,
    then: yup.string().required('numero de folio es obligatorio')
  }),

  num_acta: yup.string("Ingrese numero de acta").when('status', {
    is: 3,
    then: yup.string().required("numero de acta es obligatorio")
  }),

  num_diploma: yup.string("Ingrese numero de diploma").when('status', {
    is: 3,
    then: yup.string().required("numero de diploma es obligatorio")
  }),

  num_resolution: yup.string("Ingrese numero de resolución").when('status', {
    is: 3,
    then: yup.string().required("numero de resolución es obligatorio")
  }),

  observations: yup
    .string('escriba las observaciones')
    .required('Observaciones es obligatoria')
})

const TrackStudent = props => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')
  
  const postData = async (values) => {
    setOpen(false)
    console.log(values)
    Api.postStudentTracking(values)
      .then(res => {
        if (res.status == 201) {
          console.log(res.status)
          setOpen(true)
          setTypeAlert('success')
          setMessage('El estado del estudiante ha cambiado')
        } else {
          console.log(res.status)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <>
      <h1> {props.title} </h1>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          status: 1,
          enrollment_date: null,
          graduation_date: null,
          num_folio: '',
          num_acta: '',
          num_diploma: '',
          num_resolution: '',
          observations: '',
          student: parseInt(props.studentId)
        }}
        onSubmit={(values) => {
          console.log(values)
          postData(values)
        }}
      >
        {({ values,errors, touched, handleChange, handleSubmit, handleBlur}) => (
        <form className={classes.root} onSubmit={handleSubmit} noValidate>
          <Select
            id="student-status"
            variant="outlined"
            label="Estado"
            type="select"
            defaultValue={1}
            name="status"
            value={values.status}
            onChange={handleChange}
            onBlur={handleBlur}
            
          >
            <MenuItem value={1}>Activo</MenuItem>
            <MenuItem value={2}>Inactivo</MenuItem>
            <MenuItem value={3}>Graduado</MenuItem>
            <MenuItem value={4}>Balanceado</MenuItem>
            <MenuItem value={5}>Retirado</MenuItem>
          </Select>
          {values.status === 3 ? (
            <>
              <TextField
                id="date"
                label="Fecha de Grado"
                type="date"
                defaultValue="2020-10-19"
                variant="outlined"
                name="graduation_date"
                value={values.graduation_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(errors.graduation_date && touched.graduation_date) && errors.graduation_date}
                helperText={(errors.graduation_date && touched.graduation_date) && errors.graduation_date}
                InputLabelProps={{
                  shrink: true
                }}
              />
              <TextField
                id="outlined-basic"
                label="Folio"
                variant="outlined"
                name="num_folio"
                value={values.num_folio}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(errors.num_folio && touched.num_folio) && errors.num_folio}
                helperText={(errors.num_folio && touched.num_folio) && errors.num_folio}
              />
              <TextField
                id="outlined-basic"
                label="Numero Acta"
                variant="outlined"
                name="num_acta"
                value={values.num_acta}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(errors.num_acta && touched.num_acta) && errors.num_acta}
                helperText={(errors.num_acta && touched.num_acta) && errors.num_acta}
              />
              <TextField
                id="outlined-basic"
                label="Resolución"
                variant="outlined"
                name="num_resolution"
                value={values.num_resolution}
                onChange={handleChange}
                onBlur={handleBlur}
                error={(errors.num_resolution && touched.num_resolution) && errors.num_resolution}
                helperText={(errors.num_resolution && touched.num_resolution) && errors.num_resolution}
              />

              {/*  */}
            </>
          ) : (
            <></>
          )}
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
            error={(errors.observations && touched.observations) && errors.observations}
            helperText={(errors.observations && touched.observations) && errors.observations}
          />
      
            <Button type="submit" variant="contained" pending="true" color="primary">
              Guardar
            </Button>
          
        </form>
        )}
      </Formik>
      <AlertView open={open} typeAlert={typeAlert} message={message} />
    </>
  )
}

export default TrackStudent
