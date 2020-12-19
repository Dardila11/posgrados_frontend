import React, { useState, useEffect, Fragment } from 'react';
import {
    Button, DialogActions, Dialog, DialogContent, TextField, makeStyles, Typography, Grid
} from '@material-ui/core';

import ConfirmOption from 'src/views/teamb/activitiesView/components/ConfirmOption';
import Response from 'src/views/teamb/activitiesView/components/Response';
import service from '../services/service';

const objService = new service();

const useStyles = makeStyles(() => ({
    root: {
        marginTop: '12px',
        marginBottom: '6px'
    },
    title: {
        margin: '20px'
    },
    validator: {
        color: 'red',
        fontSize: 13
    },
    container: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
}));

const Prize = (props) => {
    const classes = useStyles();

    const [popUpRequestPost, setPopUpRequestPost] = React.useState(false);
    const [response, setResponse] = useState(null);

    useEffect(() => {
        objService.GetPrizes(props.id).then((result) => {
            var data = result.data.prizes;
            var listField = "";
            if (data.length > 0) {
                data.forEach(element => {
                    listField += element.name
                    listField += " - "
                });
            }
            else { listField = "Esta actividad aun no tiene premios asignados"; }
            document.getElementById("listPrizes").textContent = listField;
        }).catch(() => {
            setResponse('Error al consultar los premios!');
            popUpRequestPost(true);
        });
    }, []);

    const [values, setValues] = useState({
        name: '',
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const [popUpCreate, setPopUpCreate] = React.useState(false);
    const [popUpAdd, setPopUpAdd] = React.useState(false);
    const [popUpCancel, setPopUpCancel] = React.useState(false);
    const [errorName, setErrorName] = useState(null);

    const handleResponseAccept = () => {
        if (response == "Premio asignado correctamente") {
            window.location.href = window.location.href;
        }
        setPopUpRequestPost(false);
        setResponse(null);
        setValues({name: ''});
    };

    const formPrize = () => {
        setPopUpCreate(true);
    };
    const savePrize = () => {
        if (values.name != '') {
            objService.PostPrize({
                "name": values.name,
                "activity": props.id
            }).then((result) => {
                setResponse("Premio asignado correctamente");
            }).catch(() => {
                setResponse("Ups! Ha ocurrido un error al registrar el premio, recuerde que el nombre es unico, sino intentelo mas tarde o contacte con el administrador");
            });
            setErrorName(null);
            setPopUpCreate(false);
            setPopUpRequestPost(true);
        }
        else { setErrorName("Es necesario diligenciar el campo"); }
        setPopUpAdd(false);
    };

    const handleAdd = () => {
        setPopUpAdd(true);
    };
    const handleAddNegative = () => {
        setPopUpAdd(false);
    };

    const handleClose = () => {
        setPopUpCancel(true);
    };
    const handleCancelAffirmative = () => {
        setErrorName('');
        values.name = "";
        setPopUpCreate(false);
        setPopUpCancel(false);
    };
    const handleCancelNegative = () => {
        setPopUpCancel(false);
    };

    return (
        <Fragment>
            <Button className={classes.root} variant="contained" color="primary" onClick={formPrize}>
                <b>Agregar premio</b>
            </Button>

            <Grid className={classes.container}>
                <Typography variant="body1" component="p" gutterBottom>
                    <b>Premios:</b>
                </Typography>
                &nbsp;
                <Typography variant="body1" component="p" gutterBottom id="listPrizes"></Typography>
            </Grid>

            <Dialog open={popUpCreate} onClose={handleClose} >
                <Typography className={classes.title} variant="h1" align="center" gutterBottom>
                    Agregar premio
                </Typography>
                <DialogContent dividers>
                    <TextField fullWidth label="Nombre" name="name" onChange={handleChange} required variant="outlined" />
                    {errorName ? <Typography className={classes.validator}> {errorName} </Typography> : null}
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="secondary"> Cancelar </Button> &nbsp;
                    <Button onClick={handleAdd} variant="contained" color="primary"> Agregar </Button>
                </DialogActions>
            </Dialog>

            <ConfirmOption open={popUpCancel} onClose={handleCancelNegative} onClickPositive={handleCancelAffirmative}
                msg={'¿Esta seguro de que desea cancelar el registro del premio?'}
            />

            <ConfirmOption open={popUpAdd} onClose={handleAddNegative} onClickPositive={savePrize}
                msg={'¿Esta seguro que desea adicionar este premio?'}
            />

            <Response popUpRequestPost={popUpRequestPost} handleResponseAccept={handleResponseAccept} response={response} />
        </Fragment>
    );
};
export default Prize;