import React from 'react';
import { Box, Container, Card,Typography} from '@material-ui/core';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { CreateLineResearchView } from './CreateLineResearch';
import { CreateKnowLedgeView } from './CreateKnowLedge';

import { EditKnowLedge } from './Edit/EditKnowLedge'
import { EditLineResearch } from './Edit/EditLineResearch'

import { DeletKnowLedge } from './Delete/DeleteKnowLedge'
import { DeletLineResearch } from './Delete/DeleteLineResearch'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
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

const useStyles = makeStyles((theme) => ({
  appbar: {
    marginLeft: '10px',
    marginRight: '10px',
    width: '100vh',
    boxShadow: 'none'
  },
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 224,
  },
  contenedor: {
    borderRadiusLeft: '10px',
    boxShadow: '0 5px 2px -2px gray',
    background: 'none',
    marginLeft: '10px'
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export const CreateOtherView = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Page title="Create others">
      <Container maxWidth={false}>
        <Box mt={3}>


            <AppBar
              className={classes.appbar}
              color="transparent"
              position="relative"
            >
              <Tabs
                textColor="primary"
                indicatorColor="secondary"
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="on"
              >
                <Tab label="Crear Area de conocimiento" {...options(0)} />
                <Tab label="Crear Linea de investigacion" {...options(1)} />
                <Tab label="Editar Area de Conocimient" {...options(3)} />
                <Tab label="Editar Linea de investigacion" {...options(4)} />
                <Tab label="Eliminar Area de Conocimien" {...options(5)} />
                <Tab label="Eliminar Linea de investigacio" {...options(6)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <CreateKnowLedgeView />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <CreateLineResearchView />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <EditKnowLedge />
            </TabPanel>
            <TabPanel value={value} index={3}>
              <EditLineResearch />
            </TabPanel>
            <TabPanel value={value} index={4}>
              <DeletKnowLedge />
            </TabPanel>
            <TabPanel value={value} index={5}>
              <DeletLineResearch />
            </TabPanel>
        </Box>
      </Container>
    </Page>
  );
};
