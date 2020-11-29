import React, { Fragment, useState, useEffect } from 'react';

import {
    Typography, Grid
} from '@material-ui/core';

import service from 'src/views/teamb/services/service';
import util from 'src/views/teamb/services/util';

const CoordEvaluation = (props) => {
    const objService = new service();
    const objUtil = new util();

    const [evaluationCoordinator, setEvaluationCoordinator] = useState('');
     
    useEffect(() => {
        objService.GetCoordinatorEvaluation(props.id).then((result) => {
            var dataEvaluation = result.data;
            setEvaluationCoordinator(dataEvaluation.eval_coord);
        }).catch(() => {
            alert("Error, no hay registros para mostrar");
        });
    }, []);

    return (
        <Fragment>
            {evaluationCoordinator != null ? 
                <Grid>
                    <Typography variant="body1" component="p" gutterBottom>
                        <b>Observaciones del coordinador:</b> {evaluationCoordinator.observations} 
                    </Typography>
                    <Typography variant="body1" component="p" gutterBottom>
                        <b>Creditos asignados: </b> {evaluationCoordinator.credits}
                    </Typography>
                </Grid>
               
            :null 
            }
        </Fragment>
    );
};
export default CoordEvaluation;