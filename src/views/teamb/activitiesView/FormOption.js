import React, { Fragment } from 'react';
import {
    Button, makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
    options: {
        marginTop: '10px',
        marginLeft: '8px'
    }
}));

const FormOption = (props) => {
    const classes = useStyles();
    return (
        <Fragment>
            {/* Onclick, lanzar la ventana emergente de confirmación cuando se pulsa sobre el botón*/}
            <Button className={classes.options} onClick={props.onClick} color="primary" variant={props.variant}>
                {props.name}
            </Button>
        </Fragment>
    );
};
export default FormOption;