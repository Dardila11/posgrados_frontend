import React, { useState } from 'react'
import moment from 'moment'
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
  status: yup.number(),
  num_folio: yup.string().notRequired()
    .when("status", {
      is: (status) => 3,
      then: yup.string().max(255).required("numero de folio es obligaotrio"),
      otherwise: yup.string().notRequired()
    }),
  num_acta: yup.string().notRequired()
  .when("status", {
    is: (status) => 3,
    then: yup.string().max(255).required("numero de acta es obligaotrio"),
    otherwise: yup.string().notRequired()
  }),
  num_diploma: yup.string().notRequired()
  .when("status", {
    is: (status) => 3,
    then: yup.string().max(255).required("numero de diploma es obligaotrio"),
    otherwise: yup.string().notRequired()
  }),
  num_resolution: yup.string().notRequired()
  .when("status", {
    is: (status) => 3,
    then: yup.string().max(255).required("numero de resolución es obligaotrio"),
    otherwise: yup.string().notRequired()
  }),
  graduation_date: yup.date().notRequired()
    .when("status", {
      is: (status) => 3,
      then: yup.date().required('fecha de graduación es obligatorio')
            .max(new Date(), 'La fecha debe ser antes del dia de hoy' ),
      otherwise: yup.date().notRequired()

    }),
  observations: yup
    .string('escriba las observaciones')
    .max(255)
    .required('Observaciones es obligatoria')

    /**
     * num_acta: yup
    .string("Ingrese numero de acta")
    .max(255)
    .required("numero de acta es obligatorio"),
  num_diploma: yup
    .string("Ingrese numero de diploma")
    .max(255)
    .required("numero de diploma es obligatorio"),
  num_resolution: yup
    .string("Ingrese numero de resolución")
    .max(255)
    .required("numero de resolución es obligatorio"),
  graduation_date: yup.date()
    .required('fecha de graduación es obligatorio')
    .max(new Date(), 'La fecha debe ser antes del dia de hoy' ),
  observations: yup
    .string('escriba las observaciones')
    .required('Observaciones es obligatoria')
     */
})

const TrackStudent = props => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')
  
  const postData = async (values) => {
    setOpen(false)
    let jsonValues = {
      status: values.status,
      enrollment_date: null,
      graduation_date: values.status == 3 ? values.graduation_date : null,
      num_folio: values.status == 3 ? values.num_folio : '',
      num_acta: values.status == 3 ? values.num_acta : '',
      num_diploma: values.status == 3 ? values.num_diploma : '',
      num_resolution: values.status == 3 ? values.num_resolution : '',
      observations: values.observations,
      student: values.student
      
    }
    console.log(jsonValues);
     Api.postStudentTracking(jsonValues)
      .then(res => {
        if (res.status == 201) {
          console.log(res.status)
          setOpen(true)
          setTypeAlert('success')
          setMessage('El estado del estudiante ha cambiado')
        }
      })
      .catch(error => {
          setOpen(true)
          setTypeAlert("error")
          setMessage("Ha ocurrido un error " + error)
      })
  }

  return (
    <>
      <h1> {props.title} </h1>
      <Formik
        //validationSchema={validationSchema}
        initialValues={{
          status: 1,
          enrollment_date: null,
          graduation_date: moment().format('YYYY-MM-DD'),
          num_folio: '',
          num_acta: '',
          num_diploma: '',
          num_resolution: '',
          observations: '',
          student: parseInt(props.studentId)
        }}
        onSubmit={(values) => {          
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
            name="status"
            value={values.status}
            onChange={handleChange}
            onBlur={handleBlur}
            error={!!errors.status}
            
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
                variant="outlined"
                name="graduation_date"
                value={values.graduation_date}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.graduation_date}
                helperText={(errors.graduation_date && touched.graduation_date) && errors.graduation_date}
                
              />
              <TextField
                id="outlined-basic"
                label="Folio"
                variant="outlined"
                name="num_folio"
                value={values.num_folio}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.num_folio}
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
                error={!!errors.num_acta}
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
                error={!!errors.num_resolution}
                helperText={(errors.num_resolution && touched.num_resolution) && errors.num_resolution}
              />
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
            error={!!errors.observations}
            helperText={(errors.observations && touched.observations) && errors.observations}
          />
            <Button type="submit" variant="contained" color="primary">
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
