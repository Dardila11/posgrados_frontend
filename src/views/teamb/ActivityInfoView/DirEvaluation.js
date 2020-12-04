import React, { Fragment, useState, useEffect } from 'react';

import {
    Typography, Grid
} from '@material-ui/core';

import service from 'src/views/teamb/services/service';
import util from 'src/views/teamb/services/util';

const DirEvaluation = (props) => {
    const objService = new service();
    const objUtil = new util();

    const [evaluationDirector, setEvaluationDirector] = useState('');

    useEffect(() => {
        objService.GetDirectorEvaluation(props.id).then((result) => {
            var dataEvaluation = result.data;

            setEvaluationDirector(dataEvaluation.eval_dir);

        }).catch(() => {
            alert("Error, no hay registros para mostrar");
        });
    }, []);

    return (
        <Fragment>
            {evaluationDirector != null ?
                <Grid>
                    <Typography variant="body1" component="p" gutterBottom>
                        <b>Observaciones del director:</b> {evaluationDirector.observations}
                    </Typography>
                    <Typography variant="body1" component="p" gutterBottom>
                        <b>Evaluación del director: </b> {objUtil.GetEvaluation(evaluationDirector.value)}
                    </Typography>
                </Grid>
            : null
            }
        </Fragment>
    );
};
export default DirEvaluation;