import { Container,Grid, makeStyles} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Professor_card } from './professor_card';
import {ListProfessorApi} from '../service'
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

  const classes = useStyles();
  const [listProfessors, setlistProfessors] = useState([])
  useEffect(() => {
    const data = async () => {ListProfessorApi().then((request)=> {console.log(request.data);setlistProfessors(request.data.Professors)})}
    data();
  }, [])
  return (
    <Container className = {classes.root}>
      <Grid container spacing={3}>
        {listProfessors && listProfessors.map(element => (
          <Grid item lg={3} md={6} xs={12} key={element.id}>
            <Professor_card profesor={element}/>
          </Grid>
        ))} 

      </Grid>
    </Container>
  );
};

export default ListProfessors;
