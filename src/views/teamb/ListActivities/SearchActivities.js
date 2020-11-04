import React from 'react';
import {Box, Card, CardContent, TextField, InputAdornment, SvgIcon, Container, makeStyles, Select,InputLabel, MenuItem, Grid} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    root: {  
    },
    Container: {
        height: 100
    },
    SearchBar: {
        paddingTop: 0,
        paddingBottom: 2,
        height: 90,
        
    },
    Select:{
        alignItems: 'center' 
    },
    
  }));

const SearchBar = ({className,context, ...rest }) => {
    const [activity, setActivity] = React.useState("");
    const changeActivityType = (e) => { 
        setActivity(e) 
      }
    const classes = useStyles();
 
    return (
        <Container className = {classes.Container}>
            <Box mt={2}>
                <Card className = {classes.SearchBar}>
                <CardContent>
                        <Grid style={{ display: 'flex', justifyContent: 'center' }} container spacing = {3}  >
                            <Grid item lg={2} md={2} xs={1}>
                                <InputLabel>Periodo academico</InputLabel>
                            </Grid>
                            <Grid item lg={5} md={5} xs={12}>
                                <Box maxWidth={500}>
                                    <Select  fullWidth label="año academico" id="activity-type" type="select" defaultValue={""} variant="outlined"
                                    onChange={e => changeActivityType(e.target.value)}>
                                        <MenuItem value={'activityone'}>2019-02</MenuItem>
                                        <MenuItem value={'activitytwo'}>2020-01</MenuItem>
                                        <MenuItem value={'activitythree'}>2020-02</MenuItem>
                                    </Select>
                                </Box>
                            </Grid>
                        </Grid>     
                      
                    </CardContent>
                </Card>                    
            </Box>
        </Container>
    );
}


export default SearchBar