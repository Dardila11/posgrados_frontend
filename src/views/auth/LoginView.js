import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, Redirect} from 'react-router-dom';
import { useAuth } from "src/views/auth/Context/use-auth.js";
import * as Yup from 'yup';
import { Formik } from 'formik';
import { AlertView } from '../../components/Alert'
import {getUserInfoService} from './service'
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
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

    // auth.login({
    //   username: username,
    //   password: password              
    // }).then().then((data) => {
    //     enviar a la url del perfil correspondiente
    //     let datesComplet = data.data
    //     
    //     localStorage.setItem('id',JSON.stringify(data.data.user.id))
    //     traer datos,manejar el token
    //     localStorage.setItem('token',data.data.token)
    //     localStorage.setItem('username',JSON.stringify(datesComplet.personal_id))
    //     getUserInfoService(data.data.user.id).then(request => localStorage.setItem("userInfo",JSON.stringify(request.data.Users[0])))


    //     perfilService(
    //       data.data.user
    //     )
    //     .then((data) =>{
    //       if (JSON.parse(localStorage.getItem('userInfo')).is_coordinator) {
    //         navigate('/coordinator', { replace: true });
    //       }
    //       else if (JSON.parse(localStorage.getItem('userInfo')).is_professor){
    //         navigate('/director', { replace: true });
    //       }
    //       else if (JSON.parse(localStorage.getItem('userInfo')).is_student){
    //         navigate('/student', { replace: true });
    //       }
          
    //     })
  
    //   })
    //   .catch(() => {
    //     setOpen(true)
    //     setTypeAlert('error')
    //     setMessage('Error, verifica los datos!')

    //   });
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
        getUserInfoService(data.data.user.id).then(request => localStorage.setItem("userInfo",JSON.stringify(request.data.Users[0])))


        perfilService(
          data.data.user
        )
        .then(async (data) =>{

            console.log("rol ",data)
            localStorage.setItem("rol",data.data)
            if (data.data === "coordinador") {
              navigate('/coordinator', { replace: true });
            }
            else if (data.data === "profesor"){
              navigate('/director', { replace: true });
            }
            else if (data.data === "estudiante"){
              navigate('/student', { replace: true });
            }

          }

          
        )
  
      })
      .catch(() => {
        setOpen(true)
        setTypeAlert('error')
        setMessage('Usuario o contraseña incorrectos!')

      });
  };
  
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