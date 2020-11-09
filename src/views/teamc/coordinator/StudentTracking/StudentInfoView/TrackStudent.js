import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  DialogContent,
  TextField,
  Select,
  MenuItem,
  makeStyles,
  DialogActions,
  Button
} from '@material-ui/core';
import { SentimentSatisfied } from '@material-ui/icons';
import Api from 'src/views/teamc/services/Api';
import { AlertView } from 'src/components/Alert';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}));

const TrackStudent = props => {
  const classes = useStyles();
  const [studentStatus, setStudentStatus] = useState('');
  const [open, setOpen] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')
  const [trackStudent, setTrackStudent] = useState({
    state: 1,
    enrollment_date: null,
    graduation_date: null,
    num_folio: '',
    num_acta: '',
    num_diploma: '',
    num_resolution: '',
    observations: '',
    student: parseInt(props.studentId)
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setTrackStudent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const postData = async () => {
    setOpen(false)
    console.log(trackStudent);
    let res = await Api.postStudentTracking(trackStudent);
    console.log(res)
    // aqui debe ir la condicional del codigo de respuesta
      setOpen(true)
      setTypeAlert("success")
      setMessage("El estado del estudiante ha cambiado")
    
  };

  return (
    <>
      <h1> {props.title} </h1>

      <form className={classes.root}>
        {/* fecha */} {/* estado del estudiante */}
        <Select
          id="student-status"
          variant="outlined"
          type="select"
          defaultValue={1}
          name="state"
          value={trackStudent.state}
          required
          onChange={handleChange}
        >
          <MenuItem value={1}>Activo</MenuItem>
          <MenuItem value={2}>Inactivo</MenuItem>
          <MenuItem value={3}>Graduado</MenuItem>
          <MenuItem value={4}>Balanceado</MenuItem>
          <MenuItem value={5}>Retirado</MenuItem>
        </Select>
        {/* Si es Graduado, muestra los siguientes campos */}
        {/* Fecha de Grado* */} {/* Folio* */} {/* Numero de acta* */}
        {/* Resolución* */} {/* Premios* */}
        {trackStudent.state === 3 ? (
          <>
            <TextField
              id="date"
              label="Fecha de Grado"
              type="date"
              defaultValue="2020-10-19"
              variant="outlined"
              name="graduation_date"
              onChange={handleChange}
              value={trackStudent.graduation_date}
              InputLabelProps={{
                shrink: true
              }}
              required
            />
            <TextField
              id="outlined-basic"
              label="Folio"
              variant="outlined"
              name="num_folio"
              onChange={handleChange}
              value={trackStudent.num_folio}
              required
            />
            <TextField
              id="outlined-basic"
              label="Numero Acta"
              variant="outlined"
              name="num_acta"
              onChange={handleChange}
              value={trackStudent.num_acta}
              required
            />
            <TextField
              id="outlined-basic"
              label="Resolución"
              variant="outlined"
              name="num_resolution"
              onChange={handleChange}
              value={trackStudent.num_resolution}
              required
            />
            <TextField id="outlined-basic" label="Premios" variant="outlined" />

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
          value={trackStudent.observations}
          onChange={handleChange}
          required
        />
      </form>

      <DialogActions>
        <Button variant="contained" color="primary" onClick={postData}>
          Guardar
        </Button>
      </DialogActions>
      <AlertView open = {open}  typeAlert = {typeAlert} message = {message}/>
    </>
  );
};

export default TrackStudent;
