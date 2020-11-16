import React, { useEffect, useState } from 'react';
import {
    Select, MenuItem, InputLabel, FormControl, makeStyles
} from '@material-ui/core';

import service from '../services/service';

const objService = new service();

const useStyles = makeStyles(() => ({
    field: {
        marginTop: '18px'
    },
}));

const SelectField = (props) => {
    const classes = useStyles();
    
    const [stateSelect, setStateSelect] = useState({
        list: []
    })

    useEffect(() => {
        if (props.name === "programaSeleccionado") {
            objService.GetPrograms().then((result) => {
                var data = result.data;
                setStateSelect({ list: data });
            }).catch(() => {
                alert("No hay programas registrados");
            });
        }
        if (props.name === "institucionSeleccionada") {
            objService.GetInstitutions().then((result) => {
                var data = result.data;
                setStateSelect({ list: data });
            }).catch(() => {
                alert("No hay instituciones registradas");
            });
        }
        if (props.name === "paisSeleccionado") {
            objService.GetCountries().then((result) => {
                var data = result.data;
                setStateSelect({ list: data });
            }).catch(() => {
                alert("No hay paises registrados");
            });
        }
        if (props.name === "ciudadSeleccionada") {
            objService.GetCities().then((result) => {
                var data = result.data;
                setStateSelect({ list: data });
            }).catch(() => {
                alert("No hay ciudades registradas");
            });
        }
    }, []);

    return (
        <FormControl className={classes.field} fullWidth required variant="outlined">
            <InputLabel> {props.label} </InputLabel>
            <Select defaultValue={0} onChange={props.handleChange} label={props.label} name={props.name}>
                <MenuItem disabled value={0}> Seleccione una opción... </MenuItem>
                {stateSelect.list.map(element => (
                    <MenuItem key={element.id} value={element.id}> 
                        {
                            props.name === "institucionSeleccionada" ?  element.name_inst : element.name
                        } 
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
export default SelectField;