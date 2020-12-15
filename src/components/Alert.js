import React, {useState,useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles} from '@material-ui/core';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '20%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));


  // open true o false, Determina la visibilidad de la alerta
  // typeAlert (success,error,warning) determina el tipo de alerta
  // message: mensaje que mostrará la alerta
export const AlertView = ({open,typeAlert,message}) => {
    const [openState, setOpenState] = useState(open)
    useEffect(() => {
        setOpenState(open)
    }, [open])
    const classes = useStyles();
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpenState(false);
    }; 
    return (
      <div className={classes.root}>
        <Snackbar open={openState} autoHideDuration={6000} onClose={handleClose} 
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
        >
          <Alert onClose={handleClose} severity={typeAlert}>
            {message}
          </Alert>
        </Snackbar>
      </div>
    );
}
