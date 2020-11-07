import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, TextField, InputAdornment, SvgIcon, Container, makeStyles, Select, InputLabel, MenuItem, Grid, NativeSelect } from '@material-ui/core';

import util from 'src/views/teamb/services/util';
import service from 'src/views/teamb/services/service';
import { element } from 'prop-types';

const objService = new service();
const objUtil = new util();

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
    Select: {
        alignItems: 'center'
    },

}));

const SearchBar = ({ className, context, ...rest }) => {

    const [academicYears, setAcademicYears] = useState({
        years: []
    })
    
    useEffect(() => {
        /* Dato quemado desde la tabla User: id_user */
        objService.GetPeriodsService(8).then((result) => {
            var dataPeriods = result.data.list_period;
            var acadYears = objUtil.GetAcademicYears(dataPeriods);
            setAcademicYears({ years: acadYears });
        }).catch(() => {
            alert("Error, no hay registros para mostrar");
        });
    }, []);

    const classes = useStyles();
    const [academicYear, setAcademicYear] = React.useState("");
    const handleChange = (event) => {
        setAcademicYear(event.target.value);
    };

    return (
        <Container className={classes.Container}>
            <Box mt={2}>
                <Card className={classes.SearchBar}>
                    <CardContent>
                        <Grid style={{ display: 'flex', justifyContent: 'center' }} container spacing={3}  >
                            <Grid item lg={2} md={2} xs={1} style={{ display: 'flex', alignItems: 'center' }}>
                                <InputLabel>Año academico</InputLabel>
                            </Grid>
                            <Grid item lg={5} md={5} xs={12}>
                                <Box maxWidth={500}>
                                    <Select fullWidth label="año academico" id="activity-type" type="select" defaultValue={"2020-21"} /* Pensar este valor por defecto */
                                        variant="outlined" onChange={handleChange}
                                    >
                                        {academicYears.years.map(element => (
                                            <MenuItem key={element.academicYear} value={element.academicYear}> {element.academicYear} </MenuItem>
                                        ))}
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