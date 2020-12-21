import React, { useState,useEffect} from 'react';
import { Link as RouterLink, useNavigate, Redirect} from 'react-router-dom';
import { useAuth } from "src/views/auth/Context/use-auth.js";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { AlertView } from '../../components/Alert'
import {getUserInfoService} from './service'
import {ConsultUserService} from 'src/views/teamd/Search/service'
import {ConsultProfesorAll} from "src/views/teamd/Search/service"
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { loginService } from './service';
import { perfilService } from './service';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    border: 1,
    borderRadius: 3,
    boxShadow: '-1px 8px 36px 4px rgba(158,158,158,1)',
    padding: '50px'
  },
  inputs: {
    margin: '10px'
  }
}));


 const LoginView = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState('');
  const [typeAlert, setTypeAlert] = useState('');
  const [message, setMessage] = useState('');
  const [username,setUserName] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const handleChangePassword = (e) =>{
    setPassword(e.target.value);
  };
  const HandleChangeName = (e) =>{
    setUserName(e.target.value);
  };
  const handleLogin = () => {
    setOpen(false)
    loginService({
      username: username,
      password: password              
    })
      .then(async (data) => {
        let datesComplet = data.data
        localStorage.setItem('id',JSON.stringify(data.data.user.id))
        localStorage.setItem('token',data.data.token)
        localStorage.setItem('username',JSON.stringify(datesComplet.personal_id))
        auth.setUser(data.data.user)
        getUserInfoService(data.data.user.id).then(async request => localStorage.setItem("userInfo",JSON.stringify(request.data.Users[0])))
        perfilService(
          data.data.user
        )
        .then(async (data) =>{

            console.log("rol ",data)
            let role = data.data
            localStorage.setItem("rol",role)           
            if (role.find(element => element === "coordinador")) {
              navigate('/coordinator', { replace: true });
            }else if (role.find(element => element === "director_gi")){
              navigate('/director', { replace: true });
            }
            else if (role.find(element => element === "profesor")){
              navigate('/director', { replace: true });
            }
            else if (role.find(element => element === "estudiante")){
              navigate('/student', { replace: true });
            }
            ConsultUserService().then( response => {
              localStorage.setItem("usuarios",JSON.stringify(response.data.Users))
          })
          
          ConsultProfesorAll().then(response => {
            localStorage.setItem("profesores",JSON.stringify(response.data.Professors))
            JSON.parse(localStorage.getItem("profesores")).map( element => {
              if(element.user === JSON.parse(localStorage.getItem("userInfo")).id){
                localStorage.setItem("profesorInfo",JSON.stringify(element))
              }
            })
        })
            

          }

          
        )
  
      })
      .catch(() => {
        setOpen(true)
        setTypeAlert('error')
        setMessage('Usuario o contraseña incorrectos!')

      });
  };

  // Controla el año academico en el que se listaran las actividades del estudiante (grupo_b)
  sessionStorage.removeItem('sAY');
  
  return (
    
    <Page
      title="Autenticación"
      className={classes.root}
    >
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              username: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string().max(255).required('Debes ingresar un usuario!'),
              password: Yup.string().max(255).required('Debes indicar tu contraseña!')
            })}
            onSubmit={() => {
//              navigate('/app/dashboard', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit} className={classes.root}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Iniciar Sesión
                  </Typography>
                  
                </Box>
                <Grid
                  container
                  spacing={3}
                >
                  
                  <Grid
                    item
                    xs={12}
                    md={6}
                  >
                    
                  </Grid>
                </Grid>
                
                <TextField
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label="Nombre de usuario"
                  margin="normal"
                  name="username"
                  onBlur={handleBlur}
                  onChange={(e)=>{
                    handleChange(e);
                    HandleChangeName(e);
                  }}
                  type="username"                  
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Contraseña"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e)=>{
                    handleChange(e);
                    handleChangePassword(e);
                  }}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box my={2}>
                  <Button
                    color="primary"
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={handleLogin}
                  >
                    Entrar 
                  </Button>
                </Box>
                <AlertView open = {open}  typeAlert = {typeAlert} message = {message}/>
              </form>
              
            )}
            
          </Formik>
        </Container>
      </Box>
    </Page>
  );
};


export default LoginView;