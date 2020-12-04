import React, { Fragment, useState, useEffect } from 'react';
import {Typography} from '@material-ui/core';

import service from 'src/views/teamb/services/service';

const Program = (props) => {
    const objService = new service();


    const [InfoProgram, setInfoProgram] = useState('');
     
    useEffect(() => {
        objService.GetProgram(props.id).then((result) => {
            setInfoProgram(result.data);
        }).catch(() => {
            alert("Error, no hay registros para mostrar");
        });
    }, []);

    return (
        <Fragment>         
            <Typography variant="body1" component="p" gutterBottom>
                <b>Programa: </b> {InfoProgram.name} 
            </Typography>
       </Fragment>       
    );
};
export default Program;