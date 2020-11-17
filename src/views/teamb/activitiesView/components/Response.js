import React from 'react';
import {
  Button, Typography, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide
} from '@material-ui/core';

// Transición de la ventana emergente que muestra el resultado de enviar los datos del formulario
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Response = (props) => {
  return (
    <Dialog open={props.popUpRequestPost} TransitionComponent={Transition}
      keepMounted onClose={props.handleResponseAccept} aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title"> Información </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {props.response ?
            <Typography component={'span'} variant={'body2'}> {props.response} </Typography> :
            <Typography component={'span'} variant={'body2'}>
              Ejecutando su petición, espere un momento por favor...
            </Typography>
          }
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {props.response ? <Button onClick={props.handleResponseAccept} color="primary"> Aceptar </Button> : null}
      </DialogActions>
    </Dialog>
  );
};
export default Response;