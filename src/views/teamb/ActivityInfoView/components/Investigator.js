import React, { Fragment, useState, useEffect } from 'react';
import {Typography} from '@material-ui/core';

import service from 'src/views/teamb/services/service';
import Response from 'src/views/teamb/activitiesView/components/Response';

const Investigator = (props) => {
    const objService = new service();

    const [Info, setInfo] = useState('');
    const [popUp, setPopUp] = React.useState(false);
    const [response, setResponse] = useState(null);

    const handleResponseAccept = () => {
        setPopUp(false);
        setResponse(null);
    };
     
    useEffect(() => {
        objService.GetInvestigator(props.id).then((result) => {
            setInfo(result.data.investigator.user);
        }).catch(() => {
            setResponse('Error al consultar el investigador!');
            setPopUp(true);
        });
    }, []);

    return (
        <Fragment>         
            <Typography variant="body1" component="p" gutterBottom>
                <b>Investigador: </b> {Info.first_name} {Info.last_name} 
            </Typography>
            <Response popUpRequestPost={popUp} handleResponseAccept={handleResponseAccept} response={response} />
       </Fragment>       
    );
};
export default Investigator;