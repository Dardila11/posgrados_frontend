import React, { useState, useEffect } from 'react';
import {
    makeStyles
  } from '@material-ui/core';
import Page from 'src/components/Page';

import SearchBar from 'src/components/SearchBar';
import List from 'src/components/List';
import api from 'src/views/teamc/services/Api';
import ListPagination from 'src/components/ListPagination';
import BreadCrumb from 'src/components/BreadCrumb';
import BreadCrumbs from './BreadCrumbs';

const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      minHeight: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(1),
      paddingLeft: theme.spacing(1)      
    }
  }));


const CoordinatorListStudentsView = () => {

    const [studentsList, setStudentList] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const res = await api.getStudentsInfoLocal();
        setStudentList(res);
      };
      fetchData();
    }, []);

    const classes = useStyles();    
    const breadcrumb = [['Coordinador','/coordinator'],['Listado de estudiantes']];
    return (
        <Page className={classes.root} title="Listado de estudiantes">      
            <BreadCrumbs />
            <SearchBar context='students'/>
            <List list = {studentsList} option= 'Student'/>
            <ListPagination/>
        </Page>  
      ); 
};

export default CoordinatorListStudentsView;