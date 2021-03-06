
import React, { useEffect, useState } from 'react';
import { Gi_Card } from './Gi_Card';
import {ListGiApi} from '../service'
import { Container,Grid, makeStyles} from '@material-ui/core';
import {GetGIForIns} from "src/views/teamd/Search/service"
import {GetAllGi} from "src/views/teamd/Search/service"

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
export const ListGi = () => {
    const classes = useStyles();
    const [listGi, setListGi] = useState([])
    useEffect(() => {
      const data = async () => {GetAllGi().then((request)=> {setListGi(request.data)})}
      data();
    }, [])
    return (
      <Container className = {classes.root}>
        <Grid container spacing={3}>
          {listGi && listGi.map(element => (
            <Grid item lg={4} md={7} xs={12} key={element.id}>
              <Gi_Card gi={element}/>
            </Grid>
          ))} 
  
        </Grid>
      </Container>
    );
}
