import React, { Fragment, useState, useEffect } from 'react';
import {Typography} from '@material-ui/core';

import service from 'src/views/teamb/services/service';
import Response from 'src/views/teamb/activitiesView/components/Response';

const Program = (props) => {
    const objService = new service();


    const [InfoProgram, setInfoProgram] = useState('');
    const [popUp, setPopUp] = React.useState(false);
    const [response, setResponse] = useState(null);

    const handleResponseAccept = () => {
        setPopUp(false);
        setResponse(null);
    };
     
    useEffect(() => {
        objService.GetProgram(props.id).then((result) => {
            setInfoProgram(result.data);
        }).catch(() => {
            setResponse('Error al consultar el programa!');
            setPopUp(true);
        });
    }, []);

    return (
        <Fragment>         
            <Typography variant="body1" component="p" gutterBottom>
                <b>Programa: </b> {InfoProgram.name} 
            </Typography>
            <Response popUpRequestPost={popUp} handleResponseAccept={handleResponseAccept} response={response} />
       </Fragment>       
    );
};
export default Program;