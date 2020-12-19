import React, { Fragment, useState, useEffect } from 'react';
import { Typography, Grid } from '@material-ui/core';
import service from 'src/views/teamb/services/service';
import Response from 'src/views/teamb/activitiesView/components/Response';

const CoordEvaluation = (props) => {
    const objService = new service();

    const [evaluationCoordinator, setEvaluationCoordinator] = useState('');
    const [popUp, setPopUp] = React.useState(false);
    const [response, setResponse] = useState(null);

    const handleResponseAccept = () => {
        setPopUp(false);
        setResponse(null);
    };
     
    useEffect(() => {
        objService.GetCoordinatorEvaluation(props.id).then((result) => {
            var dataEvaluation = result.data;
            setEvaluationCoordinator(dataEvaluation.eval_coord);
        }).catch(() => {
            setResponse('Error al consultar el la observacion del coordinador!');
            setPopUp(true);
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
            <Response popUpRequestPost={popUp} handleResponseAccept={handleResponseAccept} response={response} />
        </Fragment>
    );
};
export default CoordEvaluation;