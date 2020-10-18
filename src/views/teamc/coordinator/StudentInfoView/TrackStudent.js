import React, { useState } from 'react';

import {
  DialogContent,
  TextField,
  Select,
  MenuItem,
  makeStyles
} from '@material-ui/core';

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

  const changeStudentStatus = e => {
    setStudentStatus(e);
  };

  return (
    <>
      <h1> {props.title} </h1>
      <DialogContent dividers>
        <form className={classes.root}>
          {/* fecha */} {/* estado del estudiante */}
          <TextField
            id="date"
            label="Fecha"
            type="date"
            defaultValue="2020-10-19"
            variant="outlined"
            InputLabelProps={{
              shrink: true
            }}
            required
          />
          <Select
            id="student-status"
            variant="outlined"
            type="select"
            defaultValue={1}
            required
            onChange={event => changeStudentStatus(event.target.value)}
          >
            <MenuItem value={0}>Activo</MenuItem>
            <MenuItem value={1}>Inactivo</MenuItem>
            <MenuItem value={2}>Graduado</MenuItem>
            <MenuItem value={3}>Retirado</MenuItem>
          </Select>
          {/* Si es Graduado, muestra los siguientes campos */}
          {/* Fecha de Grado* */} {/* Folio* */} {/* Numero de acta* */}
          {/* Resolución* */} {/* Premios* */}
          {studentStatus == 2 ? (
            <>
              <TextField
                id="date"
                label="Fecha de Grado"
                type="date"
                defaultValue="2020-10-19"
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
                required
              />
              <TextField
                id="outlined-basic"
                label="Folio"
                variant="outlined"
                required
              />
              <TextField
                id="outlined-basic"
                label="Numero Acta"
                variant="outlined"
                required
              />
              <TextField
                id="outlined-basic"
                label="Resolución"
                variant="outlined"
                required
              />
              <TextField
                id="outlined-basic"
                label="Premios"
                variant="outlined"
              />

              {/*  */}
            </>
          ) : (
            <></>
          )}
          <TextField
            id="outlined-basic"
            label="Observaciones"
            variant="outlined"
            multiline
            required
          />
        </form>
      </DialogContent>
    </>
  );
};

export default TrackStudent;
