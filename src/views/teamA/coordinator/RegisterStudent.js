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



import React, { useState } from 'react';

import { registerEnrrollment, registerStudent, registerDirector } from 'src/views/teamA/coordinator/service';
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

import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AlternateEmailRoundedIcon from '@material-ui/icons/AlternateEmailRounded';
import { FormLabel } from '@material-ui/core';

import { SearchTeacherOrAdd } from 'src/views/teamA/search/searchTeacherOrAdd';
import { SearchTeacher } from 'src/views/teamA/search/searchTeacher';

import { SearchProgram } from 'src/views/teamA/search/searchProgram';


import {SearchProfessor} from "src/views/teamA/search/searchProfessor" 

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
const countries = [
  { country: 'Afghanistan' },
  { country: 'Albania' },
  { country: 'Algeria' },
  { country: 'Andorra' },
  { country: 'Angola' },
  { country: 'Antigua and Barbuda' },
  { country: 'Argentina' },
  { country: 'Armenia' },
  { country: 'Australia' },
  { country: 'Austria' },
  { country: 'Azerbaijan' },
  { country: 'Bahamas' },
  { country: 'Bahrain' },
  { country: 'Bangladesh' },
  { country: 'Barbados' },
  { country: 'Belarusia' },
  { country: 'Belgica' },
  { country: 'Belice' },
  { country: 'Birmania' },
  { country: 'Bolivia' },
  { country: 'Bosnia' },
  { country: 'Botsuana' },
  { country: 'Brasil' },
  { country: 'Bulgaria' },
  { country: 'Burundi' },
  { country: 'Camboya' },
  { country: 'Camerún' },
  { country: 'Canadá ' },
  { country: 'Catar' },
  { country: 'Chad' },
  { country: 'Chile' },
  { country: 'China' },
  { country: 'Chipre' },
  { country: 'Colombia' },
  { country: 'Comoras' },
  { country: 'Costa Rica' },
  { country: 'Croacia' },
  { country: 'Cuba' },
  { country: 'Dinamarca' },
  { country: 'Dominica' },
  { country: 'Ecuador' },
  { country: 'Egipto' },
  { country: 'El Salvador' },
  { country: 'Emiratos Árabes Unidos' },
  { country: 'Eslovaquia' },
  { country: 'Eslovenia' },
  { country: 'España' },
  { country: 'Estados Unidos' },
  { country: 'Estonia' },
  { country: 'Etiopía' },
  { country: 'Filipinas' },
  { country: 'Finlandia' },
  { country: 'Francia' },
  { country: 'Gambia' },
  { country: 'Georgia' },
  { country: 'Ghana' },
  { country: 'Haití' },
  { country: 'Honduras' },
  { country: 'India' },
  { country: 'Indonesia' },
  { country: 'Irak' },
  { country: 'Irán' },
  { country: 'Irlanda' },
  { country: 'Islandia' },
  { country: 'Italia' },
  { country: 'Japón' },
  { country: 'Kenia' },
  { country: 'Laos' },
  { country: 'Libia' },
  { country: 'Lituania' },
  { country: 'Madagascar' },
  { country: 'Malasia' },
  { country: 'Malta' },
  { country: 'México' },
  { country: 'Mónaco' },
  { country: 'Mongolia' },
  { country: 'Nepal ' },
  { country: 'Nicaragua' },
  { country: 'Nigeria' },
  { country: 'Noruega' },
  { country: 'Nueva Zelanda' },
  { country: 'Países Bajos' },
  { country: 'Panamá' },
  { country: 'Paraguay' },
  { country: 'Perú' },
  { country: 'Polonia' },
  { country: 'Portugal' },
  { country: 'Reino Unido' },
  { country: 'República Checa' },
  { country: 'República del Congo' },
  { country: 'República Dominicana' },
  { country: 'Ruanda' },
  { country: 'Rumanía' },
  { country: 'Rusia' },
  { country: 'Samoa' },
  { country: 'Senegal' },
  { country: 'Sierra Leona' },
  { country: 'Sri Lanka' },
  { country: 'Sudán' },
  { country: 'Suecia' },
  { country: 'Suiza' },
  { country: 'Surinam' },
  { country: 'Tailandia' },
  { country: 'Tanzania' },
  { country: 'Trinidad y Tobago' },
  { country: 'Turquía' },
  { country: 'Ucrania' },
  { country: 'Uruguay' },
  { country: 'Venezuela' },
  { country: 'Vietnam' },
  { country: 'Yemen' },
  { country: 'Zambia' },
  { country: 'Zimbabue' }
];
const departments = [
  { deparment: 'Amazonas' },
  { deparment: 'Antioquia' },
  { deparment: 'Arauca' },
  { deparment: 'Atlántico' },
  { deparment: 'Bolívar' },
  { deparment: 'Boyacá' },
  { deparment: 'Caldas' },
  { deparment: 'Caquetá' },
  { deparment: 'Casanare' },
  { deparment: 'Cauca' },
  { deparment: 'Cesar' },
  { deparment: 'Chocó' },
  { deparment: 'Córdoba' },
  { deparment: 'Cundinamarca' },
  { deparment: 'Guainía' },
  { deparment: 'Guaviare' },
  { deparment: 'Huila' },
  { deparment: 'La Guajira' },
  { deparment: 'Magdalena' },
  { deparment: 'Meta' },
  { deparment: 'Nariño' },
  { deparment: 'Norte de Santander' },
  { deparment: 'Putumayo' },
  { deparment: 'Quindío' },
  { deparment: 'Risaralda' },
  { deparment: 'San Andrés y Providencia' },
  { deparment: 'Santander' },
  { deparment: 'Sucre' },
  { deparment: 'Tolima' },
  { deparment: 'Valle del Cauca' },
  { deparment: 'Vaupés' },
  { deparment: 'Vichada' }
];
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
  //Control matricula
  const [admissionDate, setadmissionDate] = useState('');
  const [enrrollment_date, setenrrollment_date] = useState('');
  const [state, setstate] = useState('');
  const [period, setperiod] = useState('');
  const [is_active, setis_active] = useState('');
   const [ListaEstudiantes, setListaEstudiantes] = useState([])
   ///////
   const [originDepartment, setDepartment] = useState('');
  const [city, setCity] = useState('Ciudad');
  const [institutionCountry, setCountry] = useState('');
  const [cityI, setCityI] = useState('Ciudad');
  const [institution, setInstitution] = useState('1');
  const [username, setUsername] = useState('');
  const [academicTitle, setAcademicTitle] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [typeId, setTypeId] = useState('');
  const [personal_id, setPersonal_id] = useState(''); // identificacion
  const [personal_code, setPersonal_code] = useState(''); // en el back debe ser automatico
  const [telephone, setTelephone] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('1'); //en el back hay dos variable is_professor is_student
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [is_proffessor, setIs_proffessor] = useState(0);
  const [is_student, setIs_student] = useState(1);
  const [fileImage, setFileImage] = useState({});

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
  const handleChangeAdmissionDate = e => {
    setadmissionDate(e.target.value);
  };
  const handleChangePeriod = e => {
    setperiod(e.target.value);
  };
  const handleChangeCity = e => {
    setCity(e.target.value);
  };
  const handleChangeInstitutionCity = e => {
    setCityI(e.target.value);
  };
  const handleChangeCountry = e => {
    setCountry(e.target.value);
  };

  const handleChangeDepartment = e => {
    setDepartment(e.target.value);
  };
  const handleChangeInstitution = e => {
    setInstitution(e.target.value);
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
  const handleCreateUser = e => {
    e.preventDefault();

   
    console.log(lastName);

    registerStudent({
      user: {
        first_name: firstName,
        last_name: lastName,
        username: username,
        password: password,
        email: email,
        type_id: typeId,
        personal_id: personal_id,
        personal_code: 106180243,
        //photo: null,
        telephone: telephone,
        address: address,

        is_proffessor: false,
        is_student: true,
        is_coordinator: false
      },
      departament_origin : 'Cauca',
      city_origin : 'Popayan',
      country_intituion: 'Colombia',
      city_intituion: 'Popayan',
      instituion_degree: 'Fup',
      dedication: dedicationType,
      program: program,
      academic_title: 'Ingeniero en Computacion'
    })
      .then((result) => {
        
        registerEnrrollment({
          admission_date: admissionDate,
          enrrollment_date: '2020-12-18',
          state : 1,
          period : period,
          is_active: true,
          student: result.data.id

        })
        registerDirector({
          role: 1,
          is_active: true,
          student: result.data.id,
          professor: director
        })
        registerDirector({
          role: 2,
          is_active: true,
          student: result.data.id,
          professor: codirector1
        })
        registerDirector({
          role: 2,
          is_active: true,
          student: result.data.id,
          professor: codirector2
        })
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
          academicTitle: '',
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
                  <Grid item md={6} xs={12}>
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
                      id="personal_code"
                      label="Código del estudiante"
                      variant="outlined"
                      type="text"
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
                            <FormatListNumberedRoundedIcon />
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
                      id="city"
                      label="Ciudad de origen"
                      variant="outlined"
                      type="text"
                      margin="normal"
                      onChange={e => {
                        handleChange(e);
                        handleChangeCity(e);
                      }}
                      error={Boolean(touched.city && errors.city)}
                      helperText={touched.city && errors.city}
                      onBlur={handleBlur}
                      value={values.city}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="originDepartment"
                      label="Departamento de origen"
                      variant="outlined"
                      select
                      margin="normal"
                      value={originDepartment}
                      required
                      onChange={e => {
                        handleChangeDepartment(e);
                        handleChange(e);
                      }}
                      fullWidth
                    >
                      {departments.map(option => (
                        <MenuItem
                          key={option.deparment}
                          value={option.deparment}
                        >
                          {option.deparment}
                        </MenuItem>
                      ))}
                    </TextField>
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
                    <SearchProgram callback={getProgram} />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="period"
                      label="Periodo(aaaa.periodo)"
                      variant="outlined"
                      type="text"
                      margin="normal"
                      onChange={e => {
                        handleChange(e);
                        handleChangePeriod(e);
                      }}
                      error={Boolean(touched.period && errors.period)}
                      helperText={touched.period && errors.period}
                      onBlur={handleBlur}
                      value={values.period}
                      required
                      fullWidth
                     
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                  <TextField
                      error={Boolean(touched.admissionDate && errors.admissionDate)}
                      fullWidth
                      helperText={touched.admissionDate && errors.admissionDate}
                      id="agreementDate"
                      label="Fecha de admisión"
                      margin="normal"
                      name="admissionDate"
                      type="date"
                      required
                      defaultValue="2017-05-24"
                      className={clases.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                      onBlur={handleBlur}
                      onChangeCapture={e => {
                        handleChangeAdmissionDate(e);
                        handleChange(e);
                      }}
                      value={values.admissionDate}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="academicTitle"
                      label="Título Académico "
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
                      value={values.academicTitle}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="institution"
                      label="Institución:"
                      variant="outlined"
                      type="text"
                      margin="normal"
                      onChange={e => {
                        handleChange(e);
                        handleChangeInstitution(e);
                      }}
                      error={Boolean(touched.institution && errors.institution)}
                      helperText={touched.institution && errors.institution}
                      onBlur={handleBlur}
                      value={values.institution}
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="institutionCountry"
                      label="País de la institución"
                      variant="outlined"
                      select
                      onChange={e => {
                        handleChangeCountry(e);
                        handleChange(e);
                      }}
                      margin="normal"
                      value={institutionCountry}
                      required
                      fullWidth
                    >
                      {countries.map(option => (
                        <MenuItem key={option.country} value={option.country}>
                          {option.country}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <TextField
                      id="cityI"
                      label="Ciudad de la institución:"
                      variant="outlined"
                      type="text"
                      margin="normal"
                      onChange={e => {
                        handleChange(e);
                        handleChangeInstitutionCity(e);
                      }}
                      error={Boolean(touched.cityI && errors.cityI)}
                      helperText={touched.cityI && errors.cityI}
                      onBlur={handleBlur}
                      value={values.cityI}
                      required
                      fullWidth
                    />
                  </Grid>
                  

                 
                </Grid>

                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <SearchProfessor callback= {getDirector}/>
                    
                  </Grid>
                  
                </Grid>

                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <SearchProfessor callback= {getCodirector1}/>
                    
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <SearchProfessor callback= {getCodirector2}/>
                    
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
