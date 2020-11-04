import {
  Box,
  Button,
  Container,
  Typography,
  MenuItem,
  TextField,
  makeStyles,
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { CreateUserService } from './service';
import { AlertView } from '../../../../components/Alert'
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
const useStyles = makeStyles({
  root: {
    background: 'white',
    border: 1,
    borderRadius: 3,
    boxShadow: '-1px 8px 36px 4px rgba(158,158,158,1)',
    paddingTop: '30px',
    paddingLeft: '50px',
    paddingRight: '50px',
    paddingBottom: '40px'
  },
  title: {
    marginTop: '10px',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  form_section: {
    margin: '10px',
    maxWidth: '500px'
  },
  container: {
    marginTop: '30px',
    width: '120vh'
  },
  button: {
    display: 'block',
    width: '400px'
  },
  imgContainer: {}
});

export const CreateUserView = () => {
  const [open, setOpen] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')
  const clases = useStyles();


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
  const [fileImage, setFileImage] = useState({})
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
  //upload image
  
  // const handleUpload = e => {
  //   console.log(fileImage);
  //   const image = e.target.files[0];
  //   console.log(" ------ ",image)
  //   setFileImage('dasdasd')
  //   console.log(" --1 ",fileImage)


  //   // const form_data = new FormData();
  //   // fileImagen.append('image', image, image.name);
  //   // fileImagen.append('title', image.title);
  //   // fileImagen.append('content', image.content);
  //   // console.log("file ", fileImagen);
  // };






  const handleChangeRole = event => {
    setRole(event.target.value);
    if (role === '1'){
      setIs_student(1)
      setIs_proffessor(0)

    }else{
      setIs_proffessor(1)
      setIs_student(0)
    }
  };
  const handleChangeFirstName = event => {
    setFirstName(event.target.value);
  };

  const handleCreateUser = e => {
    e.preventDefault();

    console.log(fileImage)
    const form_data = new FormData();
    form_data.append('image_file',fileImage,fileImage.name);
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
      is_proffessor: is_proffessor,
      is_student: is_student
    })
      .then( () => {
        setOpen(true)
        setTypeAlert('success')
        setMessage('Usuario creado correctamente')
      })
      .catch(() => {
        setOpen(true)
        setTypeAlert('error')
        setMessage('Error, Verifica los datos!')
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
            .required('Address is required'),
          role: Yup.string()
            .max(255)
            .required('role is required') //TODO combo box
        })}
        onSubmit={ () => {}}
      >
        {({ errors, handleBlur, handleChange, touched, values }) => (
          <Box className={clases.root}>
            <Typography
              color="textPrimary"
              variant="h2"
              align="center"
              className={clases.title}
            >
              Crear Usuario
            </Typography>

            <form onSubmit={handleCreateUser} className={clases.form}>
              <Box className={clases.form_section}>
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
              </Box>
              <Box className={clases.form_section}>
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
                <TextField
                  id="personal_code"
                  label="Codigo personal"
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
                />
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="img-file"
                    onChange={(e) => {setFileImage(e.target.files[0]);}}
                    required
                  />
                  <label className="custom-file-label">
                    Elije una imagen de perfil
                  </label>
                  {/* TODO IMG */}
                </div>

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
                <TextField
                  id="role"
                  label="Role"
                  variant="outlined"
                  select
                  margin="normal"
                  onChange={handleChangeRole}
                  error={Boolean(touched.role && errors.role)}
                  helperText={touched.role && errors.role}
                  onBlur={handleBlur}
                  value={role}
                  required
                  fullWidth
                >
                  <MenuItem key="isStudent1" value="1">
                    Es estudiante
                  </MenuItem>
                  <MenuItem key="isProffessor2" value="2">
                    Es profesor
                  </MenuItem>
                </TextField>
              </Box>
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
            <AlertView open = {open}  typeAlert = {typeAlert} message = {message}/>
          </Box>
        )}

      </Formik>
    </Container>
  );
};
