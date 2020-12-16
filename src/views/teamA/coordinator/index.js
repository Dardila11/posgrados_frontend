import React from 'react';
import { Box, Container } from '@material-ui/core';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RegisterStudent from './RegisterStudent';
import RegisterProjectView from './RegisterProjectView';
import EditStudent from './EditStudent';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import RegisterAgreementView from './RegisterAgreementView';
import RegisterGrantView from './RegisterGrantView';
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

const AdministerStudentView = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Page title="Administrar estudiantes">
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
                      <PersonAddIcon fontSize="inherit" /> Registrar estudiante
                    </>
                  }
                  {...options(0)}
                />
                <Tab
                  label={
                    <>
                      <PersonAddIcon fontSize="inherit" /> Registrar proyecto
                    </>
                  }
                  {...options(1)}
                />
                 <Tab
                  label={
                    <>
                      <PersonAddIcon fontSize="inherit" /> Registrar beca
                    </>
                  }
                  {...options(2)}
                />
                 <Tab
                  label={
                    <>
                      <PersonAddIcon fontSize="inherit" /> Registrar convenio
                    </>
                  }
                  {...options(3)}
                />
                <Tab
                  label={
                    <>
                      <PersonAddIcon fontSize="inherit" /> Editar estudiante
                    </>
                  }
                  {...options(4)}
                />
                
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={2}>
              <RegisterGrantView />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <RegisterProjectView/>
            </TabPanel>
            <TabPanel value={value} index={4}>
              <EditStudent/>
            </TabPanel>
            <TabPanel value={value} index={3}>
              <RegisterAgreementView/>
            </TabPanel>
            <TabPanel value={value} index={0}>
              <RegisterStudent/>
            </TabPanel>
          
        </Box>
      </Container>
    </Page>
  );
};

export default AdministerStudentView;
