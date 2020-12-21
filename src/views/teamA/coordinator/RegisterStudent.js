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


import {SearchDirector} from "src/views/teamA/search/searchDirector" ;
import {SearchCodirector} from "src/views/teamA/search/searchCodirector" ;
import {SearchCodirector2} from "src/views/teamA/search/searchCodirector2" ;

import {SearchCountry} from "src/views/teamA/search/searchCountry" 
import {SearchDepartment} from "src/views/teamA/search/searchDepartment" 
import {SearchCity} from "src/views/teamA/search/searchCity" ;
import {SearchInstitution} from "src/views/teamA/search/searchInstitution" 




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
  //Control matricula
  const [admissionDate, setadmissionDate] = useState('');
  const [enrrollment_date, setenrrollment_date] = useState('');
  const [state, setstate] = useState('');
  const [period, setperiod] = useState('');
  const [is_active, setis_active] = useState('');
  

   ///////
   const [idDepartment, setiddepartment] = useState('');
  const [idCity, setidCity] = useState('');
  const [idCountry, setidCountry] = useState('');
  const [idCityI, setidCityI] = useState('');
  const [idDepartmentI, setiddepartmentI] = useState('');
  const [idCountryI, setidCountryI] = useState('');
  const [institution, setInstitution] = useState('1');
  const [username, setUsername] = useState('');
  const [academicTitle, setAcademicTitle] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('a@unicauca.edu.co');
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
  const getIdInstitution = id => {
    setInstitution(id);
  };
  const getCity = id => {
    setidCity(id);
  };
  const getCityI = id => {
    setidCityI(id);
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
  const getIdCountry = id => {
    setidCountry(id);
  };
  const getIdCountryI = id => {
    setidCountryI(id);
  };
  const getidDepartment = id => {
    setiddepartment(id);
  };
  const getidDepartmentI = id => {
    setiddepartmentI(id);
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
        personal_code: personal_code,
        //photo: null,
        telephone: telephone,
        address: address,

        is_proffessor: false,
        is_student: true,
        is_coordinator: false
      },
      departament_origin : idDepartment,
      city_origin : idCity,
      country_intituion: idCountryI,
      city_intituion: idCityI ,
      instituion_degree: institution,
      dedication: dedicationType,
      program: program,
      academic_title: academicTitle
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
          rol: 1,
          is_active: true,
          student: result.data.id,
          professor: director
        })
        if(codirector1 ){
          registerDirector({
            rol: 2,
            is_active: true,
            student: result.data.id,
            professor: codirector1
            
          })
        }
        if(codirector2 ){
          registerDirector({
            rol: 2,
            is_active: true,
            student: result.data.id,
            professor: codirector2
            
          })
        }
     
        setOpen(true);
        setTypeAlert('success');
        setMessage('Usuario creado correctamente');
      })
      .catch(() => {
        setOpen(true);
        setTypeAlert('error');
        setMessage('Error, Verifica los datos!');
      });
      setOpen(false)
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
            .required('Nombre de usuario requerido'),
          password: Yup.string()
            .max(255)
            .required('Contraseña requerida'), //TODO validation password
          firstName: Yup.string()
            .max(255)
            .required('Nombre requerido'),
          lastName: Yup.string()
            .max(255)
            .required('Apellidos requerido'),
          email: Yup.string()
            .email()
            .required('Correo electronico requerido'),
          //typeId = Yup.string.max(255).required('first name is required'), //TODO required combo box
          personal_id: Yup.string()
            .max(255)
            .required('Identificación requerida'),
          personal_code: Yup.string()
            .max(255)
            .required('Código del estudiante requerido'), //TODO debe ser generado en el backend automaticamente
          photo: Yup.string()
            .max(255)
            .required('Foto requerida'), //TODO file image
          telephone: Yup.string().matches(
            phoneRegExp,
            'Telefono no valido'
          ),
          address: Yup.string()
            .max(255)
            .required('Direccion requerida'),
          role: Yup.string()
            .max(255)
            .required('Rol requerido') //TODO combo box
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
                  
                 
                  
                  <Grid item md={12} xs={12}>
                    <SearchCountry callback= {getIdCountry}/>
                  </Grid>
                  <Grid item md={6} xs={12}>
                  <SearchDepartment
                    idCountry={idCountry}
                    callback={getidDepartment}
                  />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <SearchCity idDepartment={idDepartment} callback={getCity} />
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
                      id="admissionDate"
                      label="Fecha de admisión"
                      margin="normal"
                      name="admissionDate"
                      type="date"
                      required
                      
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
                    <SearchInstitution callback={getIdInstitution}/>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <SearchCountry callback= {getIdCountryI}/>
                  </Grid>
                  <Grid item md={6} xs={12}>
                  <SearchDepartment
                    idCountry={idCountryI}
                    callback={getidDepartmentI}
                  />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <SearchCity idDepartment={idDepartmentI} callback={getCityI} />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <SearchDirector callback= {getDirector} label="Director"/>
                    
                  </Grid>             
                  <Grid item md={6} xs={12}>
                    <SearchCodirector callback= {getCodirector1} label= 'Codirector'/>
                    
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <SearchCodirector2 callback= {getCodirector2} label ='Codirector'/>
                    
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
