import { Container,Grid, makeStyles} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {ListProfessorApi} from '../GI/service'
import {Profesor_card} from './profesor_card'
import {CreateFormation} from './service'
const useStyles = makeStyles({
    root: {
      marginTop: "30px",
      background: 'white',
      border: 1,
      borderRadius: 3,
      boxShadow: '-1px 8px 36px 4px rgba(158,158,158,1)',
      padding: '50px'
    },
    inputs: {
      margin: '10px'
    }
  });

export const ListProfesor = () => {
    const classes = useStyles();
    const [listProfessors, setlistProfessors] = useState([])
    useEffect(() => {
      const data = async () => {ListProfessorApi().then((request)=> {setlistProfessors(request.data)})}
      data();
    }, [])
    return (
      <Container className = {classes.root}>
        <Grid container spacing={2}>
          {listProfessors && listProfessors.map(element => (
            <Grid item lg={5} md={7} xs={12} key={element.id}>
              <Profesor_card profesor={element}/>
            </Grid>
          ))} 
  
        </Grid>
      </Container>
    );
}
