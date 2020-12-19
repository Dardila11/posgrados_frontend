import React, { Fragment, useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';

import service from 'src/views/teamb/services/service';
import Response from 'src/views/teamb/activitiesView/components/Response';

const City = (props) => {
    const objService = new service();

    const [Info, setInfo] = useState('');
    const [popUp, setPopUp] = React.useState(false);
    const [response, setResponse] = useState(null);

    const handleResponseAccept = () => {
        setPopUp(false);
        setResponse(null);
    };

    useEffect(() => {
        //if (props.id != null) {
            objService.GetCity(props.id).then((result) => {
                setInfo(result.data);
            }).catch(() => {
                setResponse('Error al consultar la ciudad!');
                setPopUp(true);
            });
        //}
    }, []);

    return (
        <Fragment>
            <Typography variant="body1" component="p" gutterBottom>
                <b>Ciudad: </b> {Info.name}
            </Typography>
            <Response popUpRequestPost={popUp} handleResponseAccept={handleResponseAccept} response={response} />
        </Fragment>
    );
};
export default City;