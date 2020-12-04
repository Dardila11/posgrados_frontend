import React, { Fragment, useState, useEffect } from 'react';
import {Typography} from '@material-ui/core';

import service from 'src/views/teamb/services/service';

const InvestigationLine = (props) => {
    const objService = new service();

    const [Info, setInfo] = useState('');
     
    useEffect(() => {
        objService.GetInvestigationLine(props.id).then((result) => {
            setInfo(result.data);
        }).catch(() => {
            alert("Error, no hay registros para mostrar");
        });
    }, []);

    return (
        <Fragment>         
            <Typography variant="body1" component="p" gutterBottom>
                <b>Linea de investigación: </b> {Info.name} 
            </Typography>
       </Fragment>       
    );
};
export default InvestigationLine;