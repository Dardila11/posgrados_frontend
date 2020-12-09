import React, { useState,useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import TopBar from './TopBar';
import NavBar from './NavBar';
import { useAuth } from "src/views/auth/Context/use-auth.js";
import { Link as RouterLink, useNavigate, Redirect} from 'react-router-dom';
import {ConsultUserService} from 'src/views/teamd/Search/service'
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DirectorDashboardLayout = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [profesor, setProfesor] = useState(false)
  const auth = useAuth();


  useEffect(() => {
      ConsultUserService()
      .then(request => {
        request.data.Users.map( (usuario)=>{
          if ((localStorage.getItem("userInfo"))===null){
            console.log("director")
          }else{
            if (usuario.is_proffessor === true && usuario.id === JSON.parse(localStorage.getItem("userInfo")).id){ 
              setProfesor(true)
            }
          }

        })
      })
  }, []);


  return (
    <div className={classes.root}>

    {auth.user ? (
      <>

        {profesor ? (

          <>
                  <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
                  <NavBar
                  onMobileClose={() => setMobileNavOpen(false)}
                  openMobile={isMobileNavOpen}
                  />                  
                <div className={classes.wrapper}>
                  <div className={classes.contentContainer}>
                    <div className={classes.content}>
                      <Outlet />
                    </div>
                  </div>
                </div>  
          </>              
        ) : (
          navigate('/login', { replace: true })
        )}
      </> 
    ) : (
      navigate('/login', { replace: true })
    )}

    </div>
  );
};

export default DirectorDashboardLayout;
