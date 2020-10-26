import { Container, Divider, Grid } from '@material-ui/core';
import React from 'react';
import StudentCard from 'src/components/StudentCard';
import ActivityCard from 'src/views/teamc/coordinator/StudentTracking/StudentInfoView/ActivityCard';


class List extends React.Component{
    
    render(){
        var list = this.props.list;
        var option = this.props.option;
        return(
            <Container maxWidth="lg">                
                <Grid container spacing={3}>
                {console.log("Into List")}
                {console.log(list)}
                {list.map(element => (
                <Grid item lg={3} md={5} xs={12} key = {element.id}>
                    {option === 'Student'? (
                        <StudentCard element = {element}/>
                    ) : (
                        <ActivityCard key={element.id} activity={element} />
                    )}           
                </Grid>
            ))}
        </Grid>
            </Container>            
        );
    }
}

export default List;
