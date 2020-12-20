import {
  Box,
  Button,
  Container,
  Typography,
  MenuItem,
  TextField,
  makeStyles,
  Grid
} from '@material-ui/core';
import * as Yup from 'yup';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { CreateUserService } from 'src/views/teamd/Search/service';
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
import { SearchInstitution } from 'src/views/teamd/Search/searchInstitution';
import { SearchDeparmentI } from 'src/views/teamd/Search/searchDepartmentI';
import { CreateProfessorApi } from 'src/views/teamd/coordinator/professors/service';
import {SearchGI} from "src/views/teamd/Search/searchGI"
import { Autocomplete } from '@material-ui/lab'
import {SetLabProfesor} from "./service"
import {SetMember} from "./service"
import {ConsultProfesorAll} from "src/views/teamd/Search/service"
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
    justifyContent: 'left',
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
    display: 'flex',
    justifyContent: "center",
    width: '400px'
  },
  imgContainer: {}
});

export const CreateProfessorView = () => {
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
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const [is_proffessor, setIs_proffessor] = useState(0);
  const [is_student, setIs_student] = useState(1);
  const [fileImage, setFileImage] = useState({})
  const [is_coordinator, setIs_coordinator] = useState(0)
  const [isInternal, setisInternal] = useState(true);
  const [Institution, setInstitution] = useState(null);
  const [departmentI, setdepartmentI] = useState(null);
  const [DepartmentIID, setDepartmentIID] = useState(false)
  const [GIID, setGIID] = useState(false)
  const [CategoriaLaboral, setCategoriaLaboral] = useState(0)
  const [tiempoLaboral, settiempoLaboral] = useState(0)
  
  const handleChangeIsInternal = () => {
    let selecteds = document.getElementById('selectedIsInternal');
    setisInternal(selecteds.options[selecteds.selectedIndex].text);
    if (selecteds.options[selecteds.selectedIndex].text === 'No') {
      setisInternal(false);
    } else {
      setisInternal(true);
    }
  };
  const getIdGi = (e) =>{
    setGIID(e)
  }
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
  const handleChangeDepartmentI = result => {
    setdepartmentI(result);
  };
  const getIdInstitution = id => {
    setInstitution(id);
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





  const [imagen, setImagen] = useState([])
  const handleChangeFirstName = event => {
    setFirstName(event.target.value);
  };
  const handleCreateUser = async (e) => {
    setOpen(false)
    e.preventDefault();
    await CreateUserService(
      {
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password,
      email: email,
      type_id: typeId,
      personal_id: personal_id,
      personal_code: personal_code,
      // photo: null,
      telephone: telephone,
      address: address,
      is_proffessor: is_proffessor,
      is_student: is_student,
      is_coordinator: is_coordinator
      // headers: {'Content-Type':'multipart/form-data'}
    })
      .then( (request) => {
        if (isInternal === true) {
          CreateProfessorApi({
            is_director_student: false,
            is_director_gi: false,
            is_internal: isInternal,
            user: request.data.id,
            institution: 1,    /// TODO INSTITUCION POR DEFECTO
            department: departmentI
          })
            .then((request) => {

              let id= request.data.id
              SetMember({
                "member_status": true,
                "professor": id,
                "inv_group": GIID
              }).then(result =>{
                SetLabProfesor({
                  "laboral_category": CategoriaLaboral,
                  "time_category": tiempoLaboral,
                  "professor": id,
                  "department": departmentI
                }).then( result => {
                  setOpen(true)
                  setTypeAlert('success')
                  setMessage('Profesor creado correctamente')

                  ConsultProfesorAll().then(response => {
                    localStorage.setItem("profesores",JSON.stringify(response.data.Professors))
                })
                })
              })
            })
            .catch((request) => {
              setOpen(true)
              setTypeAlert('error')
              setMessage('Error, Verifica los datos!')
            });
        } else {
          CreateProfessorApi({
            is_director_student: false,
            is_director_gi: false,
            is_internal: isInternal,
            user: request.data.id,
            institution: Institution,
            department: departmentI
          })
            .then((request) => {

                  ConsultProfesorAll().then(response => {
                      localStorage.setItem("profesores",JSON.stringify(response.data.Professors))
                      JSON.parse(localStorage.getItem("profesores")).map( element => {
                        if(element.user === JSON.parse(localStorage.getItem("userInfo")).id){
                          localStorage.setItem("profesorInfo",JSON.stringify(element))
                        }
                      })
                  })

                  setOpen(true)
                  setTypeAlert('success')
                  setMessage('Profesor creado correctamente')
                })
            .catch((request) => {
              setOpen(true)
              setTypeAlert('error')
              setMessage('Error, Verifica los datos! ',request.data)
            });
        }




        setTypeAlert('success')
        setMessage('Profesor creado correctamente')
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
              Crear profesor
            </Typography>

            <form onSubmit={handleCreateUser} className={clases.form}>

            <Typography
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Información personal
                </Typography>
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
                </Grid>
                <Grid item md={12} xs={12}>
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="img-file"
                    onChange={async (e) => setImagen(e.target.files)}
                    required
                  />
                  <label className="custom-file-label">
                    Elije una imagen de perfil
                  </label>
                  {/* TODO IMG */}
                </div>
                </Grid>
                
                <Grid item md={12} xs={12}>
                <Typography
                  color="textSecondary"
                  display="block"
                  variant="caption"
                >
                  Contacto
                </Typography>
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
                </Grid>

                <Grid container spacing={2}>
                  <Grid item md={12} xs={12}>
                  <Typography
                    color="textSecondary"
                    display="block"
                    variant="caption"
                  >
                    Información Laboral
                  </Typography>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Typography variant="inherit">
                            ¿El profesor es interno?
                    </Typography>
                    <select
                    style={{
                      marginTop: '0px',
                      width: '50px',
                      height: '25px',
                      marginLeft: '15px'
                    }}
                      id="selectedIsInternal"
                      onChange={handleChangeIsInternal}
                    >
                      <option value="Si">Si</option>
                      <option value="No">No</option>
                    </select>
                  </Grid>
                  <span>
                      {isInternal ? (
                        <>
                        <Grid item md={6} xs={12}>
                          <SearchDeparmentI
                            callback={handleChangeDepartmentI}
                          />
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <SearchGI callback={getIdGi} departmentIID={departmentI} ></SearchGI> 
                        </Grid>
                        <Grid item md={12} xs={12}>
                  <Autocomplete
                      id = "CategoriaLab"
                      options = {["catedra","planta","ocasional"]}
                      getOptionLabel = { option => option}
                      renderInput = {
                          params => (
                              <TextField
                              id="inputCategoriaLab"
                              {...params}
                              label = "Categorial laboral"
                              variant = 'outlined'
                              required
                              style={{ marginBottom: 10, width: 300,marginLeft:10 }}
                              >
                              </TextField>
                          )
                      }
                      onInputCapture = { (e,input) => {setCategoriaLaboral(input)}}
                      onChange = { (e,input) => {setCategoriaLaboral(input)}}
                  />
                  </Grid>
                  <Grid item md={12} xs={12}>
                  <Autocomplete
                      id = "TiempoTrabajo"
                      options = {["A tiempo completo","Medio tiempo"]}
                      getOptionLabel = { option => option}
                      renderInput = {
                          params => (
                              <TextField
                              id="inputCategoriaLab"
                              {...params}
                              label = "Tiempo laboral"
                              variant = 'outlined'
                              required
                              style={{width:300,marginBottom:20, marginLeft:10 }}
                              >
                              </TextField>
                          )
                      }
                      onInputCapture = { (e,input) => {settiempoLaboral(input)}}
                      onChange = { (e,input) => {settiempoLaboral(input)}}
                  />
                  </Grid>
                        </>
                      ) : (
                        /* Institution*/
                        <Grid item md={12} xs={12}>
                        <SearchInstitution callback={getIdInstitution} />
                        </Grid>
                      )}
                    </span>

                </Grid>
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
