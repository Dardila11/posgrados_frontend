import React, { useEffect } from 'react';
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
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/avatar_7.png',
  jobTitle: 'Coordinador',
  name: 'John Doe'
};

const items = [
  {
    href: '/coordinator/list-students',
    icon: UsersIcon,
    title: 'Visualizar Estudiantes'
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
  /*   {
    href: '/director/list-evaluations',
    icon: UsersIcon,
    title: 'Visualizar Evaluaciones'
  } */
  {
    href: '/coordinator/list-activities',
    icon: EyeIcon,
    title: 'Actividades'
  },
  {
    href: '/coordinator/list-evaluations',
    icon: EyeIcon,
    title: 'Evaluaciones'
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
  const classes = useStyles();
  const location = useLocation();

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
          to="/app/account"
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
