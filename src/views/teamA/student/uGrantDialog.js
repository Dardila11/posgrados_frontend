import React,{useEffect, useState} from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, makeStyles,} from '@material-ui/core'
import { AlertView } from 'src/components/Alert';
import {UpdateGrantService} from './service'
const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      height: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3),
      paddingBlockEnd: theme.spacing(3)
    }
  }));

export const UGrantDialog = ({grant,state,setState}) => {

    const classes = useStyles();
    const [open, setOpen] = useState(state);


    useEffect(() => {
        setOpen(state)
    }, [state])

    const [openAlert, setOpenAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState('success');
    const [message, setMessage] = useState('');
  
    const [name, setname] = useState(grant.name);
    const [announcement, setannouncement] = useState(grant.announcement);
    const [description, setdescription] = useState(grant.description);
    const [resolution, setresolution] = useState(grant.num_resolution);
    const [long, setlong] = useState(grant.long);
    const [startDate, setstartDate] = useState(grant.start_date);
    const [endDate, setendDate] = useState(grant.end_date);
  
    const handleChangeName = e => {
      setname(e);
    };
    const handleChangeDescription = e => {
      setdescription(e);
    };
  
    const handleChangeResolution = e => {
      setresolution(e);
    };
    const handleChangeAnnouncement = e => {
      setannouncement(e);
    };
    const handleChangeStartDate = e => {
      setstartDate(e);
    };
    const handleChangeEndDate = e => {
      setendDate(e);
    };
    const handleChangeLong = e => {
      setlong(e);
    };
    const handleClose = ()=>{
        setState(false)
    }
    const handleUpdate = ()=>{
        UpdateGrantService({
            id: grant.id,
            name: name,
            announcement: announcement,
            // is_active: true,
            description: description,
            num_resolution: resolution,
            // student: 1, // TODO STUDENT ACTUAL
            start_date: startDate,
            end_date: endDate,
            long: long



            // // "long": 56,
            // // "start_date": "2020-12-08",
            // // "end_date": "2020-12-20",
            // // "name": "IOT",
            // // "announcement": 12312312,
            // // "description": "Si señor",
            // "num_resolution": "3123123"
        }).then(alert("Ejecutado"))
    }


    return (
<>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Actualizar convenio</DialogTitle>
        <DialogContent>
            <DialogContentText>
               Para actualizar el convenio debe elegir los campos que quiera actualizar y pulsar el boton actualizar
            </DialogContentText>
        <TextField
                      fullWidth
                      label="Nombre"
                      margin="normal"
                      name="name"
                      onChange={e => {
                        handleChangeName(e.target.value);
                      }}
                      value={name}
                      variant="outlined"
        />
        <TextField
                      fullWidth
                      label="Numero convocatoria"
                      margin="normal"
                      type='number'
                      name="announcement"
                      onChange={e => {
                        handleChangeAnnouncement(e.target.value);
                      }}
                      value={announcement}
                      variant="outlined"
                    />
        <TextField
                      fullWidth
                      label="Descripción"
                      margin="normal"
                      name="description"
                      onChange={e => {
                        handleChangeDescription(e.target.value);
                      }}
                      value={description}
                      variant="outlined"
                    />
        <TextField
              
                      fullWidth
                      label="Numero de resolución"
                      margin="normal"
                      typer="number"
                      name="resolution"
                      onChange={e => {
                        handleChangeResolution(e.target.value);
                      }}
                      value={resolution}
                      variant="outlined"
                    />

        <TextField
                      id="long"
                      label="Tiempo duracion (meses)"
                      variant="outlined"
                      type="number"
                      margin="normal"
                      onChange={e => {
                        handleChangeLong(e.target.value);
                      }}
                      value={long}
                      required
                      fullWidth
                    />
        <TextField
                      fullWidth
                      id="agreementDate"
                      label="Fecha de inicio"
                      margin="normal"
                      name="startDate"
                      type="date"
                      required
                      defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChangeCapture={e => {
                        handleChangeStartDate(e.target.value);
                      }}
                      value={startDate}
                      variant="outlined"
                    />
            <TextField
                      fullWidth
                      id="endDate"
                      label="Fecha de fin"
                      margin="normal"
                      name="endDate"
                      type="date"
                      required
                      defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true
                      }}
                      onChangeCapture={e => {
                        handleChangeEndDate(e.target.value);
                      }}
                      value={endDate}
                      variant="outlined"
                    />
        </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancelar
            </Button>
            <Button onClick={handleUpdate} color="primary">
                Actualizar
            </Button>
            </DialogActions>
      </Dialog>
      <AlertView open = {openAlert}  typeAlert = {typeAlert} message = {message}/>
    </>
    )
}
