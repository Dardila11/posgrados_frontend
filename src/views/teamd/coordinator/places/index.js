import React from 'react';
import {
  Box,
  Container,
  Card
  
} from '@material-ui/core';
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
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function options(index) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tab-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  appbar :{
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
    marginLeft: '10px',
    

  }
}));



// --------------------- //
const AdministerPlacesView = () =>{

    const classes = useStyles();
      const [value, setValue] = React.useState(0);
    
      const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    return(
      <Page
      title="Administer Places"
    >
      <Container maxWidth={false}>
        <Box mt={3}>
            <Card>
                <AppBar className={classes.appbar} position="relative">

                <Tabs textColor="primary" indicatorColor="secondary" value={value} onChange={handleChange}>
                  <Tab label="Crear pais"  {...options(0)} />
                  <Tab label="Crear departamento"  {...options(1)} />
                  <Tab label="Crear ciudad"  {...options(2)} />
                  <Tab label="Crear institucion"  {...options(3)} />
                </Tabs>
              </AppBar>
                  <TabPanel value={value} index={0}>
                    <CreateCountryView/>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <CreateDepartmentView/>
                  </TabPanel>
                  <TabPanel value={value} index={2}>
                    <CreateCityView/>
                  </TabPanel>
                  <TabPanel value={value} index={3}>
                    <CreateInstitutionView/>
                  </TabPanel>
                  
            </Card>
          </Box>
        </Container>
  </Page>
        
    )


}

export default AdministerPlacesView;