import React, { Fragment, useState, useEffect } from 'react';
import {Typography} from '@material-ui/core';

import service from 'src/views/teamb/services/service';

const Investigator = (props) => {
    const objService = new service();

    const [Info, setInfo] = useState('');
     
    useEffect(() => {
        objService.GetInvestigator(props.id).then((result) => {
            setInfo(result.data.investigator.user);
        }).catch(() => {
            alert("Error, no hay registros para mostrar");
        });
    }, []);

    return (
        <Fragment>         
            <Typography variant="body1" component="p" gutterBottom>
                <b>Investigador: </b> {Info.first_name} {Info.last_name} 
            </Typography>
       </Fragment>       
    );
};
export default Investigator;