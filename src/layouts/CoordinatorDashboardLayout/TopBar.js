import React from 'react';
import { Link as RouterLink, useNavigate, Redirect} from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Hidden,
  IconButton,
  Button
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import {Logout} from 'src/views/auth/auth'
const TopBar = () => {
  const navigate = useNavigate();
  const logout1 = ()=>{
    Logout(localStorage.getItem("token")).then(()=>{ return navigate('/login', { replace: true })}).catch(console.log('natin'))
    localStorage.clear()
  }
  return (
    <AppBar>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Button onClick={logout1}>
              <InputIcon />
            </Button>
            
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
