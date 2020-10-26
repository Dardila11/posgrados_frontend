import { Container, Grid } from '@material-ui/core';
import React from 'react';
import StudentCard from 'src/views/teamc/coordinator/ListStudentsView/StudentCard';


class List extends React.Component{
    
    render(){
        var list = this.props.list;
        return(
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                {list.map(element => (
                <Grid item lg={3} md={5} xs={12} key = {element.id}>
                    <StudentCard element = {element}/>          
                </Grid>
            ))}
        </Grid>
            </Container>            
        );
    }
}

export default List;
