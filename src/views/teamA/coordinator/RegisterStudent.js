import {
  Box,
  Button,
  Container,
  Typography,
  MenuItem,
  TextField,
  makeStyles,
  Grid,
  Divider,
  Card,
  CardContent
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';

import DialogForm from './DialogForm';
import CreateProgramDialog from './CreateProgramDialog';
import RegisterDirectorDialog from './RegisterDirectorDialog';
import AddCodirectorDialog from './AddCodirectorDialog';
import React, { useState } from 'react';
import { CreateUserService } from 'src/views/teamd/coordinator/users/service';
import { AlertView } from 'src/components/Alert';
import './styles.css';
//ICONS
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';
import MailRoundedIcon from '@material-ui/icons/MailRounded';
import DialpadRoundedIcon from '@material-ui/icons/DialpadRounded';
import FormatListNumberedRoundedIcon from '@material-ui/icons/FormatListNumberedRounded';
import ContactsRoundedIcon from '@material-ui/icons/ContactsRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import CodeRoundedIcon from '@material-ui/icons/CodeRounded';
import AlternateEmailRoundedIcon from '@material-ui/icons/AlternateEmailRounded';

import { SearchProgram } from 'src/views/teama/search/searchProgram';
import RegisterSchoolarshipDialog from './RegisterSchoolarshipDialog';
import RegisterAgreementDialog from './RegisterAgreementDialog';
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
    paddingBottom: 20,
    height: 90
  },
  dividerFullWidth: {
    margin: `20px 0 0 ${theme.spacing(0)}px`
  }
}));
const RegisterStudent = () => {
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [typeAlert, setTypeAlert] = useState('success');
  const [message, setMessage] = useState('');
  const clases = useStyles();

  const [program, setProgram] = useState('');

  const [dedicationType, setDedicationType] = useState('');

  const [username, setUsername] = useState('a');
  const [password, setPassword] = useState('1');
  const [firstName, setFirstName] = useState('123');
  const [lastName, setLastName] = useState('133');
  const [email, setEmail] = useState('a@unicauca.edu.co');
  const [typeId, setTypeId] = useState('1');
  const [personal_id, setPersonal_id] = useState('13123'); // identificacion
  const [personal_code, setPersonal_code] = useState('1313'); // en el back debe ser automatico
  const [telephone, setTelephone] = useState('312313');
  const [address, setAddress] = useState('12313');
  const [role, setRole] = useState('1'); //en el back hay dos variable is_professor is_student
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [is_proffessor, setIs_proffessor] = useState(0);
  const [is_student, setIs_student] = useState(1);
  const [fileImage, setFileImage] = useState({});
  const getProgram = id => {
    setProgram(id);
  };

  const handleChangeDedicationType = e => {
    setDedicationType(e.target.value);
  };
  const handleChangeUsername = e => {
    setUsername(e.target.value);
  };
  const handleChangePassword = e => {
    setPassword(e.target.value);
  };
  const handleChangeLastName = e => {
    setLastName(e.target.value);
  };
  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };
  const handleChangeTypeId = e => {
    setTypeId(e.target.value);
  };
  const handleChangePersonalId = e => {
    setPersonal_id(e.target.value);
  };
  const handleChangePersonalCode = e => {
    setPersonal_code(e.target.value);
  };
  const handleChangeTelephone = e => {
    setTelephone(e.target.value);
  };
  const handleChangeAddress = e => {
    setAddress(e.target.value);
  };

  const handleChangeRole = event => {
    setRole(event.target.value);
    if (role === '1') {
      setIs_student(1);
      setIs_proffessor(0);
    } else {
      setIs_proffessor(1);
      setIs_student(0);
    }
  };
  const handleChangeFirstName = event => {
    setFirstName(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const handleClickOpen4 = () => {
    setOpen4(true);
  };

  const handleClose4 = () => {
    setOpen4(false);
  };

  const handleCreateUser = e => {
    e.preventDefault();

    console.log(fileImage);
    const form_data = new FormData();
    form_data.append('image_file', fileImage, fileImage.name);
    form_data.append('title', 'image');
    form_data.append('content', fileImage.content);
    console.log(firstName);
    console.log(lastName);
    console.log(username);
    console.log(password);
    console.log(email);
    console.log(typeId);
    console.log(personal_id);
    console.log(personal_code);
    console.log(form_data);
    console.log(telephone);
    console.log(address);
    console.log(is_proffessor);

    CreateUserService({
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password,
      email: email,
      type_id: typeId,
      personal_id: personal_id,
      personal_code: personal_code,
      photo: null,
      telephone: telephone,
      address: address,
      is_proffessor: false,
      is_student: true
    })
      .then(() => {
        setOpen(true);
        setTypeAlert('success');
        setMessage('Usuario creado correctamente');
      })
      .catch(() => {
        setOpen(true);
        setTypeAlert('error');
        setMessage('Error, Verifica los datos!');
      });
  };

  return (
    <Container maxWidth="md" className={clases.container}>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          username: '',
          password: '',
          email: '',
          typeId: '',
          personal_id: '',
          personal_code: '',
          photo: '',
          telephone: '',
          address: '',
          role: '1'
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .max(255)
            .required('username is required'),
          password: Yup.string()
            .max(255)
            .required('password is required'), //TODO validation password
          firstName: Yup.string()
            .max(255)
            .required('first name is required'),
          lastName: Yup.string()
            .max(255)
            .required('first name is required'),
          email: Yup.string()
            .email()
            .required('first name is required'),
          //typeId = Yup.string.max(255).required('first name is required'), //TODO required combo box
          personal_id: Yup.string()
            .max(255)
            .required('identification is required'),
          personal_code: Yup.string()
            .max(255)
            .required('personal code is required'), //TODO debe ser generado en el backend automaticamente
          photo: Yup.string()
            .max(255)
            .required('first name is required'), //TODO file image
          telephone: Yup.string().matches(
            phoneRegExp,
            'Phone number is not valid'
          ),
          address: Yup.string()
            .max(255)
            .required('Address is required')
          //TODO combo box
        })}
        onSubmit={() => {}}
      >
        {({ errors, handleBlur, handleChange, touched, values }) => (
          <Card className={clases.RegisterStudent}>
            <CardContent>
              <form onSubmit={handleCreateUser}>
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

                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="username"
                      label="Nombre de usuario"
                      variant="outlined"
                      type="text"
                      margin="normal"
                      onChange={e => {
                        handleChange(e);
                        handleChangeUsername(e);
                      }}
                      error={Boolean(touched.username && errors.username)}
                      helperText={touched.username && errors.username}
                      onBlur={handleBlur}
                      value={values.username}
                      required
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AlternateEmailRoundedIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>

                  <Grid item md={6} xs={12}>
                    <TextField
                      id="password"
                      label="Contraseña"
                      variant="outlined"
                      type="password"
                      margin="normal"
                      onChange={e => {
                        handleChange(e);
                        handleChangePassword(e);
                      }}
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      onBlur={handleBlur}
                      value={values.password}
                      required
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VpnKeyRoundedIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="firstName"
                      label="Nombres"
                      variant="outlined"
                      type="text"
                      margin="normal"
                      onChange={e => {
                        handleChange(e);
                        handleChangeFirstName(e);
                      }}
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                      onBlur={handleBlur}
                      value={values.firstName}
                      required
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="lastName"
                      label="Apellidos"
                      variant="outlined"
                      type="text"
                      margin="normal"
                      onChange={e => {
                        handleChange(e);
                        handleChangeLastName(e);
                      }}
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      value={values.lastName}
                      required
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      id="email"
                      label="Email"
                      variant="outlined"
                      type="email"
                      margin="normal"
                      onChange={e => {
                        handleChange(e);
                        handleChangeEmail(e);
                      }}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      onBlur={handleBlur}
                      value={values.email}
                      required
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <MailRoundedIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="TypeId"
                      label="Tipo de identificacion"
                      variant="outlined"
                      select
                      margin="normal"
                      onChange={e => {
                        handleChange(e);
                        handleChangeTypeId(e);
                      }}
                      error={Boolean(touched.typeId && errors.typeId)}
                      helperText={touched.typeId && errors.typeId}
                      onBlur={handleBlur}
                      value={typeId}
                      required
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ContactsRoundedIcon />
                          </InputAdornment>
                        )
                      }}
                    >
                      <MenuItem key="typeIdOption1" value="1">
                        Cedula
                      </MenuItem>
                      <MenuItem key="typeIdOption2" value="2">
                        Cedula extranjera
                      </MenuItem>
                      <MenuItem key="typeIdOption3" value="3">
                        Tarjeta de identidad
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="personal_id"
                      label="Numero de identificacion"
                      variant="outlined"
                      type="number"
                      margin="normal"
                      onChange={e => {
                        handleChange(e);
                        handleChangePersonalId(e);
                      }}
                      error={Boolean(touched.personal_id && errors.personal_id)}
                      helperText={touched.personal_id && errors.personal_id}
                      onBlur={handleBlur}
                      value={values.personal_id}
                      required
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FormatListNumberedRoundedIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      label="Telefono"
                      variant="outlined"
                      type="number"
                      margin="normal"
                      name="telephone"
                      onChange={e => {
                        handleChange(e);
                        handleChangeTelephone(e);
                      }}
                      error={Boolean(touched.telephone && errors.telephone)}
                      helperText={touched.telephone && errors.telephone}
                      onBlur={handleBlur}
                      value={values.telephone}
                      required
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <DialpadRoundedIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="address"
                      label="Direccion de residencia"
                      variant="outlined"
                      type="text"
                      margin="normal"
                      onChange={e => {
                        handleChange(e);
                        handleChangeAddress(e);
                      }}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                      onBlur={handleBlur}
                      value={values.address}
                      required
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <HomeRoundedIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        id="img-file"
                        onChange={e => {
                          setFileImage(e.target.files[0]);
                        }}
                        required
                      />
                      <label className="custom-file-label">
                        Elije una imagen de perfil
                      </label>
                      {/* TODO IMG */}
                    </div>
                  </Grid>
                </Grid>

                <Divider className={clases.dividerFullWidth} />

                <Typography
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Informacion matricula
                </Typography>

                <Grid container spacing={2}>
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
                  <Grid item md={6} xs={12}>
                    <Grid item md={6} xs={12}>
                      <Button
                        variant="contained"
                        onClick={handleClickOpen}
                        id="bt"
                        size="small"
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
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Button
                      variant="contained"
                      onClick={handleClickOpen1}
                      id="bt"
                      size="small"
                    >
                      Registrar beca
                    </Button>

                    <DialogForm
                      title="Registrar beca"
                      open={open1}
                      handleClose={handleClose1}
                      handleOpen={handleClickOpen1}
                      component={<RegisterSchoolarshipDialog />}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Button
                      variant="contained"
                      onClick={handleClickOpen2}
                      id="bt"
                      size="small"
                    >
                      Registrar convenio
                    </Button>

                    <DialogForm
                      title="Registrar convenio"
                      open={open2}
                      handleClose={handleClose2}
                      handleOpen={handleClickOpen2}
                      component={<RegisterAgreementDialog />}
                    />
                  </Grid>
                  <Grid md={6} xs={12}>
                    <Grid item md={6} xs={12}>
                      <Button
                        variant="contained"
                        onClick={handleClickOpen3}
                        id="bt"
                        size="small"
                      >
                        Seleccionar director
                      </Button>
                    </Grid>
                    <DialogForm
                      title="Seleccione el director"
                      open={open3}
                      handleClose={handleClose3}
                      handleOpen={handleClickOpen3}
                      component={<RegisterDirectorDialog />}
                    />
                  </Grid>
                  <Grid>
                    <Grid item md={6} xs={12}>
                      <Button
                        variant="contained"
                        onClick={handleClickOpen4}
                        id="bt"
                        size="small"
                      >
                        Agregar un Codirector
                      </Button>
                    </Grid>
                    <DialogForm
                      title="Agregar un codirector"
                      open={open4}
                      handleClose={handleClose4}
                      handleOpen={handleClickOpen4}
                      component={<AddCodirectorDialog />}
                    />
                  </Grid>
                </Grid>

                <Divider className={clases.dividerFullWidth} />

                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  fullWidth
                  className={clases.button}
                >
                  Crear
                </Button>
              </form>
              <AlertView open={open} typeAlert={typeAlert} message={message} />
            </CardContent>
          </Card>
        )}
      </Formik>
    </Container>
  );
};
export default RegisterStudent;
