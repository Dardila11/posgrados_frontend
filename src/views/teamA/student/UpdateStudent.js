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
import React, { useEffect, useState } from 'react';

import { AlertView } from 'src/components/Alert';
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
import ListIcon from '@material-ui/icons/List';

import { UpdateStudentService } from './service';
import { getUserLogin } from './service';

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
export const UpdateStudent = () => {
  const [open, setOpen] = useState(false);
  const [typeAlert, setTypeAlert] = useState('success');
  const [message, setMessage] = useState('');

  //Estudiante logeado //TODO
  const [studentLoggedin, setStudentLoggedin] = useState({
    id: 1,
    dedication: 1,
    program: 1,
    date_record: '2020-11-02T14:42:24-05:00',
    date_update: '2020-11-02T14:42:26-05:00',
    user: {
      id: 5,
      password:
        'pbkdf2_sha256$180000$ulJMQfIxGyTx$o0Gohlw6YUB2C3/DvNaP4jOHPrsNDEp4GrA9qNXoaks=',
      last_login: null,
      is_superuser: false,
      username: 'mdquilindo',
      first_name: 'miller',
      last_name: 'quilindo',
      email: 'mdquilindo@unicauca.edu.co',
      is_staff: false,
      is_active: true,
      date_joined: '2020-11-02T14:41:24-05:00',
      type_id: 1,
      personal_id: '1061793073',
      personal_code: '104613020476',
      photo:
        'https://mdquilindo.pythonanywhere.com/media/d_accounts_app/users/raf750x1000075tFFFFFF_97ab1c12de.u2.jpg',
      telephone: '0',
      address: '0',
      is_proffessor: false,
      is_student: true
    }
  });

  const clases = useStyles();
  const [program, setProgram] = useState('');
  const [dedicationType, setDedicationType] = useState(1);
  const [username, setUsername] = useState('a');
  const [password, setPassword] = useState('1');
  const [firstName, setFirstName] = useState('123');
  const [lastName, setLastName] = useState('133');
  const [email, setEmail] = useState('a@unicauca.edu.co');
  const [typeId, setTypeId] = useState('1');
  const [personal_id, setPersonal_id] = useState('13123'); // identificacion
  const [personal_code, setPersonal_code] = useState('1313'); // en el back debe ser automatico
  const [telephone, setTelephone] = useState(studentLoggedin.user.telephone);
  const [address, setAddress] = useState(studentLoggedin.user.address);
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

  const handleEditStudent = e => {
    e.preventDefault();

    // const form_data = new FormData();
    // form_data.append('image_file', fileImage, fileImage.name);
    // form_data.append('title', 'image');
    // form_data.append('content', fileImage.content);

    UpdateStudentService({
      id: studentLoggedin.id,
      dedication: studentLoggedin.dedication,
      program: studentLoggedin.program,
      date_record: studentLoggedin.date_record,
      date_update: studentLoggedin.date_update, //TODO UPDATE TODAY
      user: {
        id: studentLoggedin.user.id,
        password: studentLoggedin.user.password,
        last_login: studentLoggedin.user.last_login,
        is_superuser: studentLoggedin.user.is_superuser,
        username: studentLoggedin.user.username,
        first_name: studentLoggedin.user.first_name,
        last_name: studentLoggedin.user.last_name,
        email: studentLoggedin.user.email,
        is_staff: studentLoggedin.user.is_staff,
        is_active: studentLoggedin.user.is_active,
        date_joined: studentLoggedin.user.date_joined,
        type_id: studentLoggedin.user.type_id,
        personal_id: studentLoggedin.user.personal_id,
        personal_code: studentLoggedin.user.personal_code,
        photo:
          'https://mdquilindo.pythonanywhere.com/media/d_accounts_app/users/raf750x1000075tFFFFFF_97ab1c12de.u2.jpg', //Todo foto
        telephone: telephone,
        address: address,
        is_proffessor: studentLoggedin.user.is_proffessor,
        is_student: studentLoggedin.user.is_student
      }
    })
      .then(() => {
        setOpen(true);
        setTypeAlert('success');
        setMessage('Usuario editado correctamente');
      })
      .catch(() => {
        setOpen(true);
        setTypeAlert('error');
        setMessage('Error, Verifica los datos!');
      });
  };

  //Obtener datos del usuario logeado // TODO DATO QUEMADO PARA UN SOLO USUARIO

  // useEffect(() => {
  //   getUserLogin().then(result => {setStudentLoggedin(result.data.student)})
  // }, [])

  return (
    <Container maxWidth="md" className={clases.container}>
      <Formik
        initialValues={{
          firstName: studentLoggedin.user.first_name,
          lastName: studentLoggedin.user.last_name,
          username: studentLoggedin.user.username,
          password: studentLoggedin.user.password,
          email: studentLoggedin.user.email,
          typeId: studentLoggedin.user.type_id,
          personal_id: studentLoggedin.user.personal_id,
          personal_code: studentLoggedin.user.personal_code,
          photo: studentLoggedin.user.photo,
          telephone: studentLoggedin.user.telephone,
          address: studentLoggedin.user.telephone,
          role: '1'
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .max(18, 'Nombre de usuario demasiado largo')
            .min(6, 'Nombre de usuario demasiado corto')
            .required('Nombre de usuario requerido'),
          password: Yup.string()
            .max(255)
            .required('Contraseña requerida')
            .min(6, 'La contraseña debe tene mínimo 6 caracteres'), //TODO validation password
          firstName: Yup.string()
            .min(3, 'Demasiado corto')
            .max(30, 'Demasiado largo')
            .required('Nombre requerido'),
          lastName: Yup.string()
            .min(2, 'Demasiado corto')
            .max(30, 'Demasiado largo')
            .required('Apellidos requerido'),
          email: Yup.string()
            .email('Ingrese un correo válido')
            .required('Email requerido'),
          //typeId = Yup.string.max(255).required('first name is required'), //TODO required combo box
          personal_id: Yup.number('Debe ser numérico')
            .min(100000, 'Demasiado corto')
            .max(9999999999999, 'Demasiado largo')
            .required('Identificación requerida'),
          personal_code: Yup.number('Debe ser numérico')
            .min(100000, 'Demasiado corto')
            .max(9999999999999, 'Demasiado largo')
            .required('Código del estudiante requerido'), //TODO debe ser generado en el backend automaticamente
          photo: Yup.string()
            .max(255)
            .required('Foto requerida'), //TODO file image
          telephone: Yup.number('Debe ser numérico')
            .min(100000, 'Demasiado corto')
            .max(9999999999999, 'Demasiado largo'),
          address: Yup.string()
            .min(3, 'Demasiado corta')
            .max(60, 'Demasiado larga')
            .required('Direccion requerida')
          //TODO combo box
        })}
        onSubmit={() => {}}
      >
        {({ errors, handleBlur, handleChange, touched, values }) => (
          <Card className={clases.RegisterStudent}>
            <CardContent>
              <form onSubmit={handleEditStudent}>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Mi perfil
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Los campos con * son obligatorios
                  </Typography>
                </Box>
                <Divider className={clases.dividerFullWidth} />

                <Typography
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Información basica
                </Typography>

                <Grid container spacing={2}>
                  {/* <Grid item md={6} xs={12}>
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
                  </Grid> */}
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="firstName"
                      label="Nombres"
                      variant="outlined"
                      disabled
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
                      disabled
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
                      disabled
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
                      disabled
                      select
                      margin="normal"
                      onChange={e => {
                        handleChange(e);
                        handleChangeTypeId(e);
                      }}
                      error={Boolean(touched.typeId && errors.typeId)}
                      helperText={touched.typeId && errors.typeId}
                      onBlur={handleBlur}
                      value={values.typeId}
                      required
                      fullWidth
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
                      type="text"
                      disabled
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
                      type="text"
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
                        disabled
                      />
                      <label className="custom-file-label">
                        Elije una imagen de perfil
                      </label>
                      {/* TODO IMG */}
                    </div>
                  </Grid>
                </Grid>

                {/* <TextField
                  id="personal_code"
                  label="Codigo estudiante"
                  variant="outlined"
                  type="number"
                  margin="normal"
                  onChange={e => {
                    handleChange(e);
                    handleChangePersonalCode(e);
                  }}
                  error={Boolean(touched.personal_code && errors.personal_code)}
                  helperText={touched.personal_code && errors.personal_code}
                  onBlur={handleBlur}
                  value={values.personal_code}
                  required
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CodeRoundedIcon />
                      </InputAdornment>
                    )
                  }}
                /> */}
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
                      id="address"
                      label="Titulo academico"
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
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="address"
                      label="Institucion"
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
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="address"
                      label="Pais de la institucion"
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
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="address"
                      label="Ciudad de la institucion"
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

                  <Grid item md={6} xs={12}>
                    <TextField
                      id="address"
                      label="Ciudad de procedencia"
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
                      value={values.address} //Todo ciudad
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
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="address"
                      label="Departamento de procedencia"
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
                      value={values.address} //Todo departamento
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

                  <Grid item md={6} xs={12}>
                    <TextField
                      id="address"
                      label="Programa"
                      variant="outlined"
                      type="text"
                      margin="normal"
                      disabled
                      onChange={e => {
                        handleChange(e);
                        handleChangeAddress(e);
                      }}
                      error={Boolean(touched.address && errors.address)}
                      helperText={touched.address && errors.address}
                      onBlur={handleBlur}
                      value={values.address} //Todo Programa
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
                      disabled
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ListIcon />
                          </InputAdornment>
                        )
                      }}
                    >
                      <MenuItem value="1">Completo</MenuItem>
                      <MenuItem value="2">Tiempo parcial</MenuItem>
                    </TextField>
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
                  Actualizar
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
