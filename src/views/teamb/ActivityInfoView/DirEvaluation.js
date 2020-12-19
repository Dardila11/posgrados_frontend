import React, { Fragment, useState, useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';
import service from 'src/views/teamb/services/service';
import util from 'src/views/teamb/services/util';
import Response from 'src/views/teamb/activitiesView/components/Response';

const DirEvaluation = (props) => {
    const objService = new service();
    const objUtil = new util();

    const [evaluationDirector, setEvaluationDirector] = useState('');
    const [popUp, setPopUp] = React.useState(false);
    const [response, setResponse] = useState(null);

    const handleResponseAccept = () => {
        setPopUp(false);
        setResponse(null);
    };

    useEffect(() => {
        objService.GetDirectorEvaluation(props.id).then((result) => {
            var dataEvaluation = result.data;
            setEvaluationDirector(dataEvaluation.eval_dir);
        }).catch(() => {
            setResponse('Error al consultar el la observacion del director!');
            setPopUp(true);
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
            <Response popUpRequestPost={popUp} handleResponseAccept={handleResponseAccept} response={response} />
        </Fragment>
    );
};
export default DirEvaluation;