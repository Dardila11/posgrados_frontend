import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Box,
  Hidden,
  IconButton,
  makeStyles
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';

const TopBar = () => {
  return (
    <AppBar>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <InputIcon />
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
