import { Container, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React from 'react';

const useStyles = makeStyles((theme) => ({

        root: {
          paddingTop: 40,
          margin: '20px',
        },
        Container:{
            textAlign: 'rigth'
        }
      }));


const ListPagination = () => {   
  
        const classes = useStyles();

        return(
            <Container className = {classes.Container} >
                <Pagination count={10} color='primary' />          
            </Container>            
        );
    

}


export default ListPagination;
