import React from 'react';
import { Box, Container } from '@material-ui/core';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CreateView from './create';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListProfessors from './addDirector/listProfessors';
import {ListGi} from '../GI/editGi/listGi'
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

const AdministerView = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Page title="Administer GI">
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
                      <PersonAddIcon fontSize="inherit" /> Crear
                    </>
                  }
                  {...options(0)}
                />
                <Tab
                  label={
                    <>
                      <PersonAddIcon fontSize="inherit" /> Asignar director
                    </>
                  }
                  {...options(1)}
                />
                <Tab
                  label={
                    <>
                      Editar Grupo Investigación
                    </>
                  }
                  {...options(2)}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <CreateView />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ListProfessors />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ListGi />
            </TabPanel>
          
        </Box>
      </Container>
    </Page>
  );
};

export default AdministerView;
