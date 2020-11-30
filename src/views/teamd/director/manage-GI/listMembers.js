import { Container,Grid, makeStyles} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {ListMembersApi} from './service'
import {MemberCard} from './MemberCard'
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

export const ListMembers = () => {
    const classes = useStyles();
    const [ListMembers, setListMembers] = useState([])
    useEffect(() => {
      const data = async () => {ListMembersApi().then((request)=> {setListMembers(request.data.Members)})}
      data();
    }, [])
    return (
      <Container className = {classes.root}>
        <Grid container spacing={3}>
          {ListMembers && ListMembers.map(element => (
            <Grid item lg={3} md={6} xs={12} key={element.id}>
              <MemberCard member={element}/>
            </Grid>
          ))} 
  
        </Grid>
      </Container>
    );
}
