import React, { useState, useEffect } from 'react';
import {
  Divider,
    makeStyles
  } from '@material-ui/core';
import Page from 'src/components/Page';
import BreadCrumbs from './BreadCrumbs';
import SearchBar from 'src/components/SearchBar';
import List from 'src/components/List';
import api from 'src/views/teamc/services/Api';

const handleSearch = (event) => {
  console.log("Cadena de busqueda: ", event.target.value);
  this.setState({
    inputValue: event.target.value
  })
}

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(1)      
    }
  }));


const DirectorListStudentsView = () => {
    const [studentsList, setStudentList] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const res = await api.getStudentsInfoDirectorLocal(1);
        setStudentList(res);
      };
      fetchData();
    }, []);

    const classes = useStyles();
    return (
        <Page className={classes.root} title="Listado de estudiantes">      
            <BreadCrumbs />
            <SearchBar handleSearch={handleSearch} context='students'/>
            <List list = {studentsList} option= 'Student'/>
        </Page>  
      ); 
};

export default DirectorListStudentsView;