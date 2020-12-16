import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import { Users as UsersIcon, Eye as EyeIcon } from 'react-feather';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import DescriptionIcon from '@material-ui/icons/Description';
import NavItem from './NavItem';
import { useAuth } from "src/views/auth/Context/use-auth.js";


const items = [
  {
    href: '/coordinator/list-students',
    icon: UsersIcon,
    title: 'Visualizar Estudiantes'
  },
  {
    href: '/coordinator/list-activities',
    icon: EyeIcon,
    title: 'Actividades'
  },
  {
    href: '/coordinator/list-evaluations',
    icon: EyeIcon,
    title: 'Evaluaciones'
  },
  // Options Team D
  {
    href: '/coordinator/administer-Gi',
    icon: SupervisorAccountIcon,
    title: 'Administar Grupo Investigacion'
  },
  {
    href: '/coordinator/administer-Places',
    icon: SupervisorAccountIcon,
    title: 'Administar Lugares'
  },
  {
    href: '/coordinator/administer-Professors',
    icon: SupervisorAccountIcon,
    title: 'Administar Profesores'
  },

  {
    href: '/coordinator/administerUsers',
    icon: GroupRoundedIcon,
    title: 'Administrar Usuarios'
  },
  {
    href: '/coordinator/create-others',
    icon: AddIcon,
    title: 'Administar ++'
  },

  // End Options Team D
  /**
   * Reports
   */
  {
    href: '/coordinator/reports',
    icon: DescriptionIcon,
    title: 'Reportes'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const [user, setUser] = useState({
    avatar: 'dads',
    jobTitle: 'Coordinador',
    name: 'dasd'
  })
  const auth = useAuth();  
  const classes = useStyles();
  const location = useLocation();
  
  useEffect(() => {
    if(auth.user===null){
      console.log("es nulo")
      }else{
      let photo = "http://localhost:8000" + JSON.parse(localStorage.getItem("userInfo")).photo
      setUser(
        {
        avatar: photo,
        jobTitle: 'Coordinador',
        name: JSON.parse(localStorage.getItem("userInfo")).first_name + " " + JSON.parse(localStorage.getItem("userInfo")).last_name
        })
    }
  }, [])
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/coordinator/account"
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.jobTitle}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map(item => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

export default NavBar;
