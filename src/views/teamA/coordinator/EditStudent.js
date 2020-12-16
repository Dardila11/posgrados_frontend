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
import Autocomplete, {
  createFilterOptions
} from '@material-ui/lab/Autocomplete';
import CreateProgramDialog from './CreateProgramDialog';

import RegisterDirectorDialog from './RegisterDirectorDialog';
import AddCodirectorDialog from './AddCodirectorDialog';
import React, { useState,useEffect } from 'react';
import { CreateUserService } from 'src/views/teamd/coordinator/users/service';
import { registerStudent } from 'src/views/teamA/coordinator/service';
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
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AlternateEmailRoundedIcon from '@material-ui/icons/AlternateEmailRounded';
import { FormLabel } from '@material-ui/core';
import {ConsultStudent} from "../search/service"
import { SearchTeacherOrAdd } from 'src/views/teamA/search/searchTeacherOrAdd';
import { SearchTeacher } from 'src/views/teamA/search/searchTeacher';
import { SearchProgramOrAdd } from 'src/views/teamA/search/searchProgramOrAdd';
import { SearchProgram } from 'src/views/teamA/search/searchProgram';
import {UpdateStudentService} from "src/views/teamA/student/service"
import {getStudents} from "src/views/teamA/student/service"
import {UpdateUserService} from "src/views/teamA/student/service"
import RegisterSchoolarshipDialog from './RegisterSchoolarshipDialog';
import RegisterAgreementDialog from './RegisterAgreementDialog';
import {EditarUser} from 'src/views/teamd/Search/service'
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
  const [director, setDirector] = useState('');
  const [codirector1, setCodirector1] = useState('');
  const [codirector2, setCodirector2] = useState('');

  const [dedicationType, setDedicationType] = useState('');

  const [username, setUsername] = useState('');
  const [academicTitle, setAcademicTitle] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [typeId, setTypeId] = useState('1');
  const [personal_id, setPersonal_id] = useState(''); // identificacion
  const [personal_code, setPersonal_code] = useState(''); // en el back debe ser automatico
  const [telephone, setTelephone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState(''); //en el back hay dos variable is_professor is_student
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [is_proffessor, setIs_proffessor] = useState(0);
  const [is_student, setIs_student] = useState(1);
  const [fileImage, setFileImage] = useState({});

    const [listaEstudiantes, setlistaEstudiantes] = useState([])
    const [estudianteSeleccionado, setestudianteSeleccionado] = useState()
    const editarEstudiante = () =>{
        UpdateStudentService({
          "academic_title": academicTitle,
            id:estudianteSeleccionado.id
        }).then(

          EditarUser({
            "id": estudianteSeleccionado.user.id,
            "first_name": firstName,
            "last_name": lastName,
            "username": username,
            "email": email,
            "type_id": typeId,
            "personal_id": personal_id,
            "personal_code": personal_code,
            "username": estudianteSeleccionado.user.username,
            // "photo": JSON.parse(localStorage.getItem("userInfo")).photo,
            "telephone":telephone,
      
            "address": address,
      
          }).then(alert("editado"))
        )
    
    }
  useEffect(() => {
    ConsultStudent().then(result => setlistaEstudiantes(result.data))
  }, [])

  const getIdEstudiante = (e) => {
    setestudianteSeleccionado(e)
  }
  useEffect(() => {
    if(estudianteSeleccionado){
      setFirstName(estudianteSeleccionado.user.first_name)
      setLastName(estudianteSeleccionado.user.last_name)
      setEmail(estudianteSeleccionado.user.email)
      setTypeId(estudianteSeleccionado.user.type_id)
      setPersonal_id(estudianteSeleccionado.user.personal_id)
      setPersonal_code(estudianteSeleccionado.user.personal_code)
      setTelephone(estudianteSeleccionado.user.telephone)
      setDedicationType(estudianteSeleccionado.dedication)
      setAcademicTitle(estudianteSeleccionado.academic_title)
      setAddress(estudianteSeleccionado.user.address)
      console.log(estudianteSeleccionado)
    }
  }, [estudianteSeleccionado])
  const getProgram = id => {
    setProgram(id);
  };

  const getDirector = id => {
    setDirector(id);
  };

  const getCodirector1 = id => {
    setCodirector1(id);
  };

  const getCodirector2 = id => {
    setCodirector2(id);
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
  const handleChangeAcademicTitle = e => {
    setAcademicTitle(e.target.value);
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

    // console.log(fileImage);
    // const form_data = new FormData();
    // form_data.append('image_file', fileImage, fileImage.name);
    // form_data.append('title', 'image');
    // form_data.append('content', fileImage.content);
    // console.log(firstName);
    console.log(lastName);
    console.log(username);
    console.log(password);
    console.log(email);
    console.log(typeId);
    console.log(personal_id);
    console.log(personal_code);
    //console.log(form_data);
    console.log(telephone);
    console.log(address);
    console.log(is_proffessor);

    registerStudent({
      user: {
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: password,
        email: email,
        type_id: typeId,
        personal_id: personal_id,
        personal_code: personal_code,
        //photo: null,
        telephone: telephone,
        address: address,

        is_proffessor: false,
        is_student: true
      },
      dedication: dedicationType,
      program: program,
      academic_title: academicTitle
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
          firstName: firstName,
          lastName: lastName,
          username: username,
          password: '',
          email: email,
          typeId: typeId,
          personal_id: personal_id,
          personal_code: personal_code,
          photo: '',
          telephone: telephone,
          address: address,
          academicTitle: academicTitle,
          role: '1'
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .max(255)
            .required('Nombre de usuario requerido')
            .min(4, 'El nombre de usuario no puede ser tan corto'),
          password: Yup.string()
            .max(255)
            .required('Contraseña requerida')
            .min(6, 'La contraseña debe tene mínimo 6 caracteres'), //TODO validation password
          firstName: Yup.string()
            .max(255)
            .required('Nombres requeridos'),
          lastName: Yup.string()
            .max(255)
            .required('Apellidos requeridos'),
          email: Yup.string()
            .email('Ingrese un correo válido')
            .required('Email requerido'),
          //typeId = Yup.string.max(255).required('first name is required'), //TODO required combo box
          personal_id: Yup.string().required(
            'Indentificacion válida requerida'
          ),
          personal_code: Yup.string()
            .max(255)
            .required('Codigo del estudiante requerido'), //TODO debe ser generado en el backend automaticamente
          photo: Yup.string().max(255),
          telephone: Yup.string().min(
            6,
            'El teléfono debe tener mínimo 6 caracteres'
          ),
          address: Yup.string()
            .max(255)
            .min(4, 'La dirección debe ser mínimo de 4 caracteres')
            .required('Direccion es requerida')
          //TODO combo box
        })}
        onSubmit={() => {}}
      >
        {({ errors, handleBlur, handleChange, touched, values }) => (
          <Card className={clases.RegisterStudent}>
            <CardContent>
              <form>
                <Box mb={3}>
                  <Typography color="textPrimary" variant="h2">
                    Editar estudiante
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Los campos con * son obligatorios
                  </Typography>
                </Box>


                <Autocomplete
                  id="estudiantes"
                  options={listaEstudiantes}
                  getOptionLabel={option => option.user.username}
                  style={{ marginBottom: 10, marginTop: 10, widht: 300 }}
                  renderInput={params => (
                    <TextField
                      id="usernameStudiante"
                      {...params}
                      label="Elegir estudiante"
                      variant="outlined"
                      required
                    />
                  )}
                  onInputChange={(e, input) => getIdEstudiante(input)}
                  onChange={(e, input) => getIdEstudiante(input)}
                />
                <Grid container spacing={2}>
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
                      value={firstName}
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
                      value={lastName}
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
                      value={email}
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
                      label="Tipo de identificación"
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
                        Cédula de ciudadanía
                      </MenuItem>
                      <MenuItem key="typeIdOption2" value="2">
                        Cédula de extranjería
                      </MenuItem>
                      <MenuItem key="typeIdOption3" value="3">
                        Tarjeta de identidad
                      </MenuItem>
                      <MenuItem key="typeIdOption4" value="4">
                        Pasaporte
                      </MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="personal_id"
                      label="Numero de identificacion"
                      variant="outlined"
                      type="text"
                      margin="normal"
                      onChange={e => {
                        handleChange(e);
                        handleChangePersonalId(e);
                      }}
                      error={Boolean(touched.personal_id && errors.personal_id)}
                      helperText={touched.personal_id && errors.personal_id}
                      onBlur={handleBlur}
                      value={personal_id}
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
                      value={telephone}
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
                      label="Dirección de residencia"
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
                      value={address}
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
                    <FormLabel>Elige una imagen de perfil: </FormLabel>
                    <Button
                      variant="contained"
                      component="label"
                      id="mg-left"
                      startIcon={<CloudUploadIcon />}
                    >
                      Explorar...
                      <input type="file" style={{ display: 'none' }} />
                    </Button>
                  </Grid>
                </Grid>

                <Divider className={clases.dividerFullWidth} />

                <Typography
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Informacion matrícula
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
                    <SearchProgramOrAdd callback={getProgram} />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  {/* <Grid item md={6} xs={12}>
                    <SearchTeacher callback={getDirector} />
                  </Grid>
                  <Grid item md={6} xs={12}> */}
                    <TextField
                      id="academicTitle"
                      label="Título Académico: "
                      variant="outlined"
                      type="text"
                      margin="normal"
                      onChange={e => {
                        handleChange(e);
                        handleChangeAcademicTitle(e);
                      }}
                      error={Boolean(
                        touched.academicTitle && errors.academicTitle
                      )}
                      helperText={touched.academicTitle && errors.academicTitle}
                      onBlur={handleBlur}
                      value={academicTitle}
                      required
                      fullWidth
                    />
                  </Grid>
                {/* </Grid> */}

                <Divider className={clases.dividerFullWidth} />

                <Button
                  color="primary"
                  type="submit"
                  variant="contained"
                  fullWidth
                  className={clases.button}
                  onClick={editarEstudiante}
                >
                  Editar
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