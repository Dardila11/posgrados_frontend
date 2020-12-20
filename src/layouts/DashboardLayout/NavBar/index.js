import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useAuth } from "src/views/auth/Context/use-auth.js";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  Users as UsersIcon,
  Eye as EyeIcon
} from 'react-feather';
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import DescriptionIcon from '@material-ui/icons/Description';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AddIcon from '@material-ui/icons/Add';
import NavItem from './NavItem';

const StudentItems = [
  {
    href: '/student/list-activities',
    icon: UsersIcon,
    title: 'Actividades'
  },
  {
    href: '/student/administer-profile',
    icon: UsersIcon,
    title: 'Perfil'
  }
];
const CoordinatorItems = [
  {
   href: '/coordinator/administer-student',
   icon: UsersIcon,
   title: 'Administrar Estudiantes'
 },
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
 },
 {
   href: '/coordinator/reportsStudent',
   icon: DescriptionIcon,
   title: 'Reportes x Año Ingreso'
 }
];
const DirectorItems = [
  {
    href: '/director/list-students',
    icon: UsersIcon,
    title: 'Mis Estudiantes'
  },
  {
    href: '/director/list-activities',
    icon: EyeIcon,
    title: 'Actividades'
  },
  {
    href: '/director/list-evaluations',
    icon: EyeIcon,
    title: 'Evaluaciones'
  },
  {
    href: '/director/manage-gi',
    icon: EyeIcon,
    title: 'Grupo de investigación'
  }
];
const ProfessorItems = [
  {
    href: '/director/manage-gi',
    icon: EyeIcon,
    title: 'Grupo de investigación'
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
  const classes = useStyles()
  const location = useLocation()
  const [openDirector, setOpenDirector] = React.useState(false);
  const [openProfesor, setOpenProfesor] = React.useState(false);
  const [openCoordinator, setOpenCoordinator] = React.useState(false);
  const [openStudent, setOpenStudent] = React.useState(false);
  const handleClickDirector = () => {
    setOpenDirector(!openDirector);
  };
  const handleClickProfesor = () => {
    setOpenProfesor(!openProfesor);
  };

  const handleClickCoordinator = () => {
    setOpenCoordinator(!openCoordinator);
  };

  const handleClickStudent = () => {
    setOpenStudent(!openStudent);
  };


  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
  const content = (
    <>
    {localStorage.getItem("userInfo") ? (
    <>
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >

        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={"https://mdquilindo.pythonanywhere.com" + JSON.parse(localStorage.getItem("userInfo")).photo}
          to="/user/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {JSON.parse(localStorage.getItem("userInfo")).first_name + " " +JSON.parse(localStorage.getItem("userInfo")).last_name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {localStorage.getItem("rol")}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>

      {localStorage.getItem("rol").split(',').find(item => item== "dd") ? (
        <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <ListItem button onClick={handleClickProfesor}>
          <ListItemText primary="Opciones de profesor" />
          {openProfesor ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openProfesor} timeout="auto" unmountOnExit>
        <List>
          {ProfessorItems.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
        </Collapse>
      </List>
          
      ):(
        <></>
      )}
        {localStorage.getItem("rol").split(',').find(item => item== "profesor") ? (
        <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <ListItem button onClick={handleClickDirector}>
          <ListItemText primary="Opciones de director" />
          {openDirector ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openDirector} timeout="auto" unmountOnExit>
        <List>
          {DirectorItems.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
        </Collapse>
      </List>
          
      ):(
        <></>
      )}
      {localStorage.getItem("rol").split(',').find(item => item== "coordinador") ? (
        <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <ListItem button onClick={handleClickCoordinator}>
          <ListItemText primary="Opciones de Coordinador" />
          {openCoordinator ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openCoordinator} timeout="auto" unmountOnExit>
        <List>
          {CoordinatorItems.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
        </Collapse>
      </List>
          
      ):(
        <></>
      )}
      {localStorage.getItem("rol").split(',').find(item => item== "estudiante") ? (
        <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <ListItem button onClick={handleClickStudent}>
          <ListItemText primary="Opciones de estudiante" />
          {openStudent ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openStudent} timeout="auto" unmountOnExit>
        <List>
          {StudentItems.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
        </Collapse>
      </List>
          
      ):(
        <></>
      )}
      </Box>      
    </Box>

    </>):(<></>)}
    </>
    
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

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
