import React from 'react';
import { Box, Container, Card } from '@material-ui/core';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CreateCountryView from './createCountryView';
import CreateDepartmentView from './createDepartmentView';
import CreateCityView from './createCityView';
import CreateInstitutionView from './createInstitutionView';
import EditCountryView from './EditPlaces/editCountryView';
import EditDepartmentView from './EditPlaces/editDepartmentView';
import EditCityView from './EditPlaces/editCityView';
import EditInstitutionView from './EditPlaces/editInstitutionView'
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

// --------------------- //
const AdministerPlacesView = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Page title="Administer Places">
      <Container maxWidth={false}>
        {' '}
        {/* TODOPagina lenta por peticiones innecesarias*/}
        <Box mt={4}>
          <AppBar className={classes.appbar} position="relative">
            <Tabs
              textColor="primary"
              indicatorColor="secondary"
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="on"
            >
              <Tab label="Crear pais" {...options(0)} />
              <Tab label="Crear departamento" {...options(1)} />
              <Tab label="Crear ciudad" {...options(2)} />
              <Tab label="Crear institucion" {...options(3)} />
              <Tab label="Editar Pais" {...options(4)} />
              <Tab label="Editar Departamento" {...options(5)} />
              <Tab label="Editar Ciudad " {...options(6)} />
              <Tab label="Editar Institución " {...options(7)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <CreateCountryView />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CreateDepartmentView />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <CreateCityView />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <CreateInstitutionView />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <EditCountryView />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <EditDepartmentView />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <EditCityView />
          </TabPanel>
          <TabPanel value={value} index={7}>
            <EditInstitutionView />
          </TabPanel>
        </Box>
      </Container>
    </Page>
  );
};

export default AdministerPlacesView;
