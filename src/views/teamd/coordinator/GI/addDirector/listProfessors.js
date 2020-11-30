import { Container,Grid, makeStyles} from '@material-ui/core';
import React, { useState } from 'react';
import { Professor_card } from './professor_card';

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

export const ListProfessors = () => {

  const [listProfessors] = useState([
    {
      id: 1233,
      name: 'juan carlos',
      email: 'juanCarlos@gmail.com',
      edad: 20,
      isDirector: true
    },
    {
      id: 1234,
      name: 'Roberto',
      email: 'icardi@gmail.com',
      edad: 24,
      isDirector: false
    },
    {
      id: 1255,
      name: 'Ricardo Rodriguez',
      email: 'Machote@gmail.com',
      edad: 24,
      isDirector: false
    },
    {
      id: 1266,
      name: 'Susana Stivens',
      email: 'Sexy22@gmail.com',
      edad: 27,
      isDirector: true
    },
    {
      id: 1277,
      name: 'Rosa',
      email: 'Roscon@gmail.com',
      edad: 26,
      isDirector: false
    }
  ]);



  const classes = useStyles();
  return (
    <Container className = {classes.root}>
      <Grid container spacing={3}>
        {listProfessors.map(element => (
          <Grid item lg={3} md={6} xs={12} key={element.id}>
            <Professor_card profesor={element}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListProfessors;
