import React from 'react';
import {Box, Card, CardContent, TextField, InputAdornment, SvgIcon, Container, makeStyles, Select,InputLabel, MenuItem, Grid} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

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

const SearchBar = ({className,context,periods,status,programs, ...rest }) => {

    const classes = useStyles();
    return (
        <Container className = {classes.Container}>
            
                <Box mt={2}>
                    
                        <Card className = {classes.SearchBar}>
                        <CardContent>
                            <Grid container spacing = {3}>
                                <Grid item lg={5} md={5} xs={12}>
                                    <Box maxWidth={500}>
                                    <TextField  fullWidth InputProps={{ startAdornment: (
                                            <InputAdornment position="start">
                                            <SvgIcon fontSize="small" color="action">
                                            <SearchIcon/>
                                            </SvgIcon>
                                            </InputAdornment>
                                        )
                                        }}
                                        placeholder = {
                                            context == 'activities' ? (
                                                'Buscar actividad ...'
                                            ):(
                                                context == 'students' ? (
                                                    'Buscar estudiante ...'
                                                ): (
                                                    'Buscar Evaluación ...'
                                                )
                                            )
                                        }                                  
                                        variant="outlined"
                                    />
                                    </Box>
                                </Grid>
                                {periods == undefined ? (
                                    console.log('No period parameter filther')
                                ):(
                                    <Grid item lg={2} md={2} xs={12}>
                                    <Box className= {classes.Select}>
                                        <InputLabel htmlFor='Select-period'>Seleccionar periodo</InputLabel>
                                        <Select id='Select-period'>
                                            {periods.map(element => <MenuItem key={element} value = {element} > {element}</MenuItem>)}
                                        </Select>
                                    </Box>
                                    </Grid>
                                )}
                                {status == undefined ? (
                                    console.log('No status parameter filther')
                                ):(
                                    <Grid item lg={2} md={2} xs={12}>
                                    <Box className= {classes.Select}>
                                        <InputLabel htmlFor='Select-status'>Seleccionar tipo</InputLabel>
                                        <Select id='Select-status'>
                                            {status.map(element => <MenuItem key={element} value = {element} > {element}</MenuItem>)}
                                        </Select>
                                    </Box>
                                    </Grid>
                                )}
                                {programs == undefined ? (
                                    console.log('No programs parameter filther')
                                ):(
                                    <Grid item lg={2} md={2} xs={12}>
                                    <Box className= {classes.Select}>
                                        <InputLabel htmlFor='Select-programs'>Seleccionar programa</InputLabel>
                                        <Select id='Select-programs'>
                                            {programs.map(element => <MenuItem key={element} value = {element} > {element}</MenuItem>)}
                                        </Select>
                                    </Box>
                                    </Grid>
                                )}
                            </Grid>
                        </CardContent>
                        </Card>                    
                </Box>
        </Container>
    );
}

export default SearchBar