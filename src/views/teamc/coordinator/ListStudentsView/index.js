import React, { useState, useEffect } from 'react';
import {
    makeStyles
  } from '@material-ui/core';
import Page from 'src/components/Page';
import BreadCrumbs from './BreadCrumbs';
import SearchBar from './SearchBar';
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


const ListStudentsView = () => {
    const [studentsList, setStudentList] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const res = await api.getStudentsInfoLocal();
        setStudentList(res);
      };
      fetchData();
    }, []);

    const classes = useStyles();
    return (
        <Page className={classes.root} title="Listado de estudiantes">      
            <BreadCrumbs />
            <SearchBar handleSearch={handleSearch}/>
            <List list = {studentsList}/>
        </Page>  
      ); 
};

export default ListStudentsView;