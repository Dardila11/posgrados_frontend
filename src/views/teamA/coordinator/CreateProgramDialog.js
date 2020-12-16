import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';

import { registerStudent } from './service';
import { AlertView } from 'src/components/Alert';
import { SearchUser } from 'src/views/teamd/Search/searchUser';

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  DialogActions,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
const useStyles = makeStyles(theme => ({
  modal: {
    position: 'absolute',
    width: 400,
    background: 'white',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    transform: 'translate(-50%, -50%)'
  }
}));
const CreateProgramDialog = props => {
  const classes = useStyles();

  const [usuario, setusuario] = useState('');
  const [program, setProgram] = useState('');
  const [typeAlert, setTypeAlert] = useState('success');

  const getUser = id => {
    setusuario(id);
  };

  const getProgram = id => {
    setProgram(id);
  };

  return (
    <>
      <h1> {props.title} </h1>

      <Grid item md={12} xs={12}>
        <SearchUser callback={getUser} />
      </Grid>

      <span>En caso de no encontrar el programa deseado, puede crearlo</span>
      <Button disableElevation color="primary">
        Crear un programa
      </Button>
      <DialogActions>
        <Button variant="contained" color="primary">
          Guardar Selección
        </Button>
      </DialogActions>
    </>
  );
};

export default CreateProgramDialog;
