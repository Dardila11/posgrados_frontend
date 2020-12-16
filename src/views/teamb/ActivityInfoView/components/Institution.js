import React, { Fragment, useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';

import service from 'src/views/teamb/services/service';

const Institution = (props) => {
    const objService = new service();

    const [Info, setInfo] = useState('');

    useEffect(() => {
        //if (props.id !== null) {
            objService.GetInstitution(props.id).then((result) => {
                setInfo(result.data);
            }).catch(() => {
                alert("Error, no hay registros para mostrar");
            });
        //}
    }, []);

    return (
        <Fragment>
            <Typography variant="body1" component="p" gutterBottom>
                <b>{props.msg} </b> {Info.name_inst}
            </Typography>
        </Fragment>
    );
};
export default Institution;