import React, { useState, useEffect } from 'react';
import { makeStyles, Typography, Box,
  Button, } from '@material-ui/core';
import Page from 'src/components/Page';
import SearchBar from 'src/components/SearchBar';
import List from 'src/components/List';
import api from 'src/views/teamc/services/Api';
import EditCountryView from './editCountryViewmod';

/*
const handleSearch = event => {
    console.log('Cadena de busqueda: ', event.target.value);
    this.setState({
      inputValue: event.target.value
    });
  };
/
  const useStyles = makeStyles(theme => ({
   searbuton:{
      marginRight: theme.spacing(1)
    }
  }));
*/  
  const eEditCountryView = () => {
    
      return (
        <Page  title="Editar Pais">
        

          <EditCountryView />
            
          
        </Page>
      );

  };

  export default eEditCountryView;