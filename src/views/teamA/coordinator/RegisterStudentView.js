import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import DialogForm from './DialogForm';
import CreateProgramDialog from './CreateProgramDialog';
import { Formik } from 'formik';
import './styles.css';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  makeStyles,
  Divider,
  MenuItem
} from '@material-ui/core';
import Page from 'src/components/Page';
import { registerStudent } from './service';
import { AlertView } from 'src/components/Alert';
import { SearchUser } from 'src/views/teamd/Search/searchUser';


const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3),
    paddingBlockEnd: theme.spacing(3)
  },
  BtmCreate: {
    paddingTop: 4,
    paddingBottom: 2,
    height: 90
  },
  dividerFullWidth: {
    margin: `10px 0 0 ${theme.spacing(1)}px`
  }
}));

const RegisterStudentView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [typeAlert, setTypeAlert] = useState('success');
  const [message, setMessage] = useState('');
  const [program, setProgram] = useState('');

  const [dedicationType, setDedicationType] = useState('');
  const [usuario, setusuario] = useState('');
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getUser = id => {
    setusuario(id);
  };

  const getProgram = id => {
    setProgram(id);
  };

  const handleChangeDedicationType = e => {
    setDedicationType(e.target.value);
  };

  const handleSubmitRegister = e => {
    setOpen(false);
    registerStudent({
      dedication: dedicationType,
      user: usuario,
      program: program,
      is_active: true
    })
      .then(result => {
        setOpen(true);
        setTypeAlert('success');
        setMessage('Estudiante creado correctamente');
      })

      .catch(() => {
        setOpen(true);
        setTypeAlert('error');
        setMessage('Estudiante creado incorrectamente');
      });
  };
  const handleSubmit = event => {
    event.preventDefault();
    handleSubmitRegister();
  };
  return (
    <Page className={classes.root} title="Registrar estudiante">
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Container maxWidth="md">
          <Formik
            initialValues={{
              program: ''
            }}
            validationSchema={Yup.object().shape({
              program: Yup.string().required('Debe ingresar el programa'),
              admissionDate: Yup.date().required(
                'Debe ingresar una fecha de admisión'
              )
              // enrollmentDate: Yup.date().required('Debe ingresar una fecha de matrícula'),

              //dedicationType: Yup.string().required('Debe seleccionar el tipo de dedicación'),
            })}
            onSubmit={() => {
              navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              isSubmitting,
              touched,
              values
            }) => (
              <Card className={classes.RegisterStudentView}>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                      <Typography color="textPrimary" variant="h2">
                        Registrar estudiante
                      </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                      >
                        Los campos con * son obligatorios
                      </Typography>
                    </Box>

                    <Divider />

                    <Typography
                      className={classes.dividerFullWidth}
                      color="textSecondary"
                      display="block"
                      variant="caption"
                    >
                      Información matrícula
                    </Typography>

                    <Grid container spacing={2}>
                      <Grid item md={6} xs={12}>
                        <Button
                          variant="contained"
                          onClick={handleClickOpen}
                          id="bt"
                        >
                          Seleccionar programa
                        </Button>
                      </Grid>
                      <DialogForm
                        title="Seleccione un Programa"
                        open={open}
                        handleClose={handleClose}
                        handleOpen={handleClickOpen}
                        component={<CreateProgramDialog />}
                      />

                      <Grid item md={6} xs={12}>
                        <TextField
                          id="dedicationType"
                          label="Tipo dedicación"
                          variant="outlined"
                          select
                          margin="normal"
                          onChange={e => {
                            handleChange(e);
                            handleChangeDedicationType(e);
                          }}
                          onBlur={handleBlur}
                          value={dedicationType}
                          required
                          fullWidth
                        >
                          <MenuItem value="1">Completo</MenuItem>
                          <MenuItem value="2">Tiempo parcial</MenuItem>
                        </TextField>
                      </Grid>
                    </Grid>

                    <Divider />
                    <Box my={2}>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Registrar
                      </Button>
                    </Box>
                  </form>
                  <AlertView
                    open={open}
                    typeAlert={typeAlert}
                    message={message}
                  />
                </CardContent>
              </Card>
            )}
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterStudentView;
