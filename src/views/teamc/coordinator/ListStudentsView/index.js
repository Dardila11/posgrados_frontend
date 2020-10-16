import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Grid,
    makeStyles
  } from '@material-ui/core';
import Page from 'src/components/Page';
import BreadCrumbs from './BreadCrumbs';
import ListStudents from './ListStudents';
import SearchBar from './SearchBar';
import data from './Data.json';

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
    const classes = useStyles();
    return (
        <Page className={classes.root} title="Listado de estudiantes">      
            <BreadCrumbs />
            <SearchBar />
            <ListStudents studentsList = {list}/>
        </Page>  
      ); 
};

export default ListStudentsView;