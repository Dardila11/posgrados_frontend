import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, Redirect} from 'react-router-dom';

import { login } from '../auth/auth';

import * as Yup from 'yup';
import { Formik } from 'formik';
import { AlertView } from '../../components/Alert'
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
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
import { loginService } from './service';
import { perfilService } from './service';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
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
      .then((data) => {
        //enviar a la url del perfil correspondiente
        let datesComplet = data.data
        console.log(datesComplet)
        localStorage.setItem('id',JSON.stringify(data.data.user.id))
        //traer datos,manejar el token
        localStorage.setItem('token',JSON.stringify(data.data.token))
        localStorage.setItem('username',JSON.stringify(datesComplet.personal_id))
        perfilService(
          data.data.user
        )
        .then((data) =>{
          localStorage.setItem('rol',JSON.stringify(data.data))
          let rol=data.data
          console.log('rol: '+ rol)
          switch(rol){
            case 'profesor':
                navigate('/director', { replace: true });
              break;
            case 'director':
              break;
            default:
              navigate('/student', { replace: true });

          }
          /*if(rol == "profesor"){
            navigate('/director', { replace: true });

          }else{
            navigate('/student', { replace: true });
          }*/
        })
        

        
      })
      .catch(() => {
        setOpen(true)
        setTypeAlert('error')
        setMessage('Error, verifica los datos!')

      });
  };
  
  return (
    
    <Page
      className={classes.root}
      title="Login"
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
              username: Yup.string().max(255).required('Username is required'),
              password: Yup.string().max(255).required('Password is required')
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
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Sign in
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
                  label="username"
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
                  label="Password"
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
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    onClick={handleLogin}
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Don&apos;t have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Sign up
                  </Link>
                </Typography>
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