import React, { useState, useEffect } from 'react';
import { makeStyles, Typography, Box,
  Button, } from '@material-ui/core';
import Page from 'src/components/Page';
import SearchBar from 'src/components/SearchBar';
import List from 'src/components/List';
import api from 'src/views/teamc/services/Api';
import EditDepartmentView from './editDepartmentViewmod';

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
  const eEditDepartmentView = () => {
    

      return (
        <Page  title="Editar Departamento">
        
          <SearchBar  context="editDepartment" />          
          <EditDepartmentView />
            
          
        </Page>
      );

  };

  export default eEditDepartmentView;