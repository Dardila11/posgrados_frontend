import React, { useState, useEffect } from 'react';
import {
    makeStyles
  } from '@material-ui/core';
import Page from 'src/components/Page';
import BreadCrumbs from './BreadCrumbs';
import ListStudents from './ListStudents';
import SearchBar from './SearchBar';
import data from './Data.json';
import api from 'src/views/teamc/services/Api';

const list = data;

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
        const res = await api.getStudentsInfo();
        setStudentList(res.data);
      };
      fetchData();
    }, []);

    const classes = useStyles();
    return (
        <Page className={classes.root} title="Listado de estudiantes">      
            <BreadCrumbs />
            <SearchBar />
            <ListStudents studentsList = {studentsList}/>
        </Page>  
      ); 
};

export default ListStudentsView;