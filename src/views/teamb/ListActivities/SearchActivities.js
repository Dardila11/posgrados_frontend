import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Button, TextField, InputAdornment, SvgIcon, Container, makeStyles, Select, InputLabel, MenuItem, Grid, NativeSelect } from '@material-ui/core';

import util from 'src/views/teamb/services/util';
import service from 'src/views/teamb/services/service';
import { element } from 'prop-types';

import List from 'src/components/List';
import ActivityView from 'src/views/teamb/ListActivities/ActivityView';
import Response from 'src/views/teamb/activitiesView/components/Response';

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

    const [open, setOpen] = useState('');
    const [message, setMessage] = useState('');

    const [academicYears, setAcademicYears] = useState({
        years: []
    });

    const [academicYear, setAcademicYear] = React.useState("");

    useEffect(() => {
        objService.GetPeriodsService(localStorage.getItem('id')).then((result) => {
            var dataPeriods = result.data.list_period;
            var acadYears = objUtil.GetAcademicYears(dataPeriods);
            setAcademicYears({ years: acadYears });
        }).catch(() => {
            setMessage('Error al listar los años academicos!');
            setOpen(true);
        });
        changeList();
    }, []);

    const classes = useStyles();
    const [activities, setActivities] = useState([]);
    const handleChange = (event) => {
        setAcademicYear(event.target.value);
        sessionStorage.setItem('sAY', event.target.value);
        changeList();
    };

    const handleResponseAccept = () => {
        setMessage('');
        setOpen(false);
    }

    const changeList = () => {
        if (sessionStorage.getItem('sAY') === null) {
            setMessage('Es necesario seleccionar un año academico para listar las actividades!');
            setOpen(true);
        }
        else {
            if (localStorage.getItem('id')) {
                objService.GetActivities(localStorage.getItem('id'), sessionStorage.getItem('sAY')).then((result) => {
                    var dataActivities = result.data;
                    if (dataActivities.list_activities.length === 0) {
                        setMessage('No tienes actividades registradas en el año academico ' + sessionStorage.getItem('sAY') );
                        setOpen(true);
                        setActivities([]);
                    }
                    else {
                        setActivities(dataActivities.list_activities);
                    }
                }).catch(() => {
                    setMessage('Error, no fue posible realizar la consulta, intentelo mas tarde o contacte con el administrador');
                    setOpen(true);
                });
            }
        }
    };

    return (
        <Container>
            <Container className={classes.buttonContainer}>
                <ActivityView />
            </Container>
            <Container className={classes.Container}>
                <Box mt={2}>
                    <Card className={classes.SearchBar}>
                        <CardContent>
                            <Grid container>
                                <Grid item xs={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '35px' }}>
                                    <InputLabel>Año academico</InputLabel>
                                </Grid>
                                <Grid item xs={6}>
                                    <Box maxWidth={150}>
                                        <Select fullWidth label="año academico" id="activity-type" type="select" value={sessionStorage.getItem('sAY')}
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
            <List list={activities} option="Activity" context="/student/list-activities" />
            <Response popUpRequestPost={open} handleResponseAccept={handleResponseAccept} response={message} />
        </Container>
    );
}

export default SearchBar