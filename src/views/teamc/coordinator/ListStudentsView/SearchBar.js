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

const SearchBar = () => {
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
                                        placeholder='Buscar Estudiante...'
                                        variant="outlined"
                                    />
                                    </Box>
                                </Grid>
                                <Grid item lg={2} md={5} xs={12}>
                                    <Box className= {classes.Select}>
                                        <InputLabel htmlFor='Select-cohorte'>Seleccionar Cohorte</InputLabel>
                                        <Select id='Select-cohorte'>
                                            <MenuItem value = {"2020"} >2020</MenuItem>
                                            <MenuItem value = {"2019"} >2019</MenuItem>
                                            <MenuItem value = {"2018"} >2018</MenuItem>
                                        </Select>
                                    </Box>
                                </Grid>
                                <Grid item lg={2} md={5} xs={12}>
                                    <Box className= {classes.Select}>
                                        <InputLabel htmlFor='Select-status'>Seleccionar estado</InputLabel>
                                        <Select name='Estado' id='Select-status'>
                                            <MenuItem value = 'ACTIVO' >ACTIVO</MenuItem>
                                            <MenuItem value = 'INACTIVO' >INACTIVO</MenuItem>
                                            <MenuItem value = 'GRADUADO' >GRADUADO</MenuItem>
                                            <MenuItem value = 'RETIRADO' >RETIRADO</MenuItem>
                                        </Select>
                                    </Box>
                                </Grid>
                                <Grid item lg={2} md={5} xs={12}>
                                    <Box className= {classes.Select}>
                                        <InputLabel htmlFor='Select-program'>Seleccionar programa</InputLabel>
                                        <Select name='Programa' id='Select-program'>
                                            <MenuItem value = {1} >Maestria en Computacion</MenuItem>
                                            <MenuItem value = {2} >Maestria en Electronica</MenuItem>
                                            <MenuItem value = {3} >Maestria en Automatica</MenuItem>
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