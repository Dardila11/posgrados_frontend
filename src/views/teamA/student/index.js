import React from 'react';
import { Box, Container } from '@material-ui/core';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import UpdateAgreementView from './UpdateAgreementView';
import UpdateGrantView from './UpdateGrantView';
import UpdateProjectView from './UpdateProjectView';
import {UpdateStudent} from './UpdateStudent';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {GrantView} from './grantView'
import {AgreementViewCard} from './agreementViewCard'
import {AgreementView} from './agreementView'
import BreadCrumbs from './BreadCrumbs'
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function options(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tab-${index}`
  };
}

const useStyles = makeStyles(() => ({
  appbar: {
    marginLeft: '10px',
    marginRight: '10px',
    width: '100vh',
    boxShadow: 'none',
    background: 'none'
  },
  contenedor: {
    borderRadiusLeft: '10px',
    boxShadow: '0 5px 2px -2px gray',
    background: 'none',
    marginLeft: '10px'
  }
}));

const AdministerProfileView = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Page title="Administrar estudiantes">
      <BreadCrumbs/>
      <Container maxWidth={false}>
        <Box mt={3}>
          
            <AppBar className={classes.appbar} position="relative">
              <Tabs
                textColor="primary"
                indicatorColor="secondary"
                value={value}
                onChange={handleChange}
              >
                <Tab
                  label={
                    <>
                      <PersonAddIcon fontSize="inherit" /> Mi perfil
                    </>
                  }
                  {...options(0)}
                />
                <Tab
                  label={
                    <>
                      <PersonAddIcon fontSize="inherit" /> Mi proyecto
                    </>
                  }
                  {...options(1)}
                />
                 <Tab
                  label={
                    <>
                      <PersonAddIcon fontSize="inherit" /> Convenios
                    </>
                  }
                  {...options(2)}
                />
                <Tab
                  label={
                    <>
                      <PersonAddIcon fontSize="inherit" /> Becas
                    </>
                  }
                  {...options(3)}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <UpdateStudent/>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <UpdateProjectView/>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <GrantView/>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <AgreementView/>
            </TabPanel>
          
        </Box>
      </Container>
    </Page>
  );
};

export default AdministerProfileView;
