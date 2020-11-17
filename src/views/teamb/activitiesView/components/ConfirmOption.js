import React, { Fragment } from 'react';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions
} from '@material-ui/core';

const ConfirmOption = (props) => {
    return (
        <Fragment>
            <Dialog open={props.open} onClose={props.onClose}>
                <DialogTitle> Mensaje </DialogTitle>
                <DialogContent> {props.msg} </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary"> No </Button>
                    <Button color="primary" onClick={props.onClickPositive}> Si </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};
export default ConfirmOption;