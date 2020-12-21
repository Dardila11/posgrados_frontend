import React,{useEffect, useState} from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, makeStyles,FormLabel} from '@material-ui/core'
import { AlertView } from 'src/components/Alert';
import {UpdateAgreementService} from './service'
import { duration } from 'moment';
import { AgreementView } from './agreementView';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: theme.palette.background.dark,
      height: '100%',
      paddingBottom: theme.spacing(3),
      paddingTop: theme.spacing(3),
      paddingBlockEnd: theme.spacing(3)
    }
  }));

export const UAgreementDialog = ({agreement,state,setState}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(state);


    useEffect(() => {
        setOpen(state)
    }, [state])

    const [openAlert, setOpenAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState('success');
    const [message, setMessage] = useState('');

    const [long, setLong] = useState(agreement.long)
    const [startDate, setStartDate] = useState(agreement.start_date)
    const [endDate, setEndDate] = useState(agreement.end_date)
    const [agreement_date, setAgreement_date] = useState(agreement.agreement_date)
    const [percentage_discount, setPercentage_discount] = useState(agreement.percentage_discount)
    const [observation, setObservation] = useState(agreement.observation)
    const [periodicAcademic, setPeriodicAcademic] = useState(agreement.period_academic)
    const [archivo, setArchivo] = useState(null);
    const handleChangeObservation = e => {
      setObservation(e);
    };
  
    const percentage_discountF = e => {
      setPercentage_discount(e)
    };
    const handleChangePeriodAcademic = e => {
      setPeriodicAcademic(e)
    };
    const handleChangeStartDate = e => {
      setStartDate(e);
    };
    const handleChangeEndDate = e => {
      setEndDate(e);
    };
    const handleChangeLong = e => {
      setLong(e);
    };
    const handleClose = ()=>{
        setState(false)
    }
    const handleChangeAgreementDate = (valor)=> {
        setAgreement_date(valor)
    }
    const handleChangeArchivo = e => {
      setArchivo(e);
      
    };
    const handleUpdate = ()=>{
        let fd = new FormData();
        fd.append("voucher", archivo[0])
        fd.append("observation",observation )
        fd.append("percentage_discount", percentage_discount)
        
        fd.append("period_academic",periodicAcademic )
        
        fd.append("agreement_date",agreement_date )
        fd.append("start_date", startDate)
        fd.append("end_date",endDate )
        fd.append("long",long )
        fd.append("id",agreement.id )
        UpdateAgreementService(
          fd
            /* "id": agreement.id,
            "long": long,
            "start_date": startDate,
            "end_date": endDate,
            "date_record": agreement.data_record,
            "date_update": agreement.data_update, //Todo fecha actual
            "is_active": true,
            "agreement_date": agreement_date,
            "period_academic": periodicAcademic,
            "percentage_discount": percentage_discount,
            "observation": observation, */
        ).then(alert("Ejecutado"))
    }


    return (
<>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Actualizar beca</DialogTitle>
        <DialogContent>
            <DialogContentText>
               Para actualizar el convenio debe elegir los campos que quiera actualizar y pulsar el boton actualizar
            </DialogContentText>
        <TextField
                      fullWidth
                      label="Duracion"
                      margin="normal"
                      name="duracion"
                      onChange={e => {
                        handleChangeLong(e.target.value);
                      }}
                      value={long}
                      variant="outlined"
        />
            <TextField
                      fullWidth
                      id="endDate"
                      label="agrement_date"
                      margin="normal"
                      name="endDate"
                      type="date"
                      required

                      InputLabelProps={{
                        shrink: true
                      }}
                      onChangeCapture={e => {
                        handleChangeAgreementDate(e.target.value);
                      }}
                      value={agreement_date}
                      variant="outlined"
                    />
        <TextField
              
                      fullWidth
                      label="Periodo academico"
                      margin="normal"
                      typer="number"
                      name="periodoA"
                      onChange={e => {
                        handleChangePeriodAcademic(e.target.value);
                      }}
                      value={periodicAcademic}
                      variant="outlined"
                    />

        <TextField
                      id="percentDiscount"
                      label="Porcentaje de descuento"
                      variant="outlined"
                      type="number"
                      margin="normal"
                      onChange={e => {
                        percentage_discountF(e.target.value);
                      }}
                      value={percentage_discount}
                      required
                      fullWidth
                    />
        <TextField
                      id="observationId"
                      label="Observación"
                      variant="outlined"
                      type="text"
                      margin="normal"
                      onChange={e => {
                        handleChangeObservation(e.target.value);
                      }}
                      value={observation}
                      required
                      fullWidth
                    />
        <TextField
                      fullWidth
                      id="dateStart"
                      label="Fecha Inicio"
                      margin="normal"
                      name="startDate"
                      type="date"
                      required
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

                      InputLabelProps={{
                        shrink: true
                      }}
                      onChangeCapture={e => {
                        handleChangeEndDate(e.target.value);
                      }}
                      value={endDate}
                      variant="outlined"
                    />
                    
                    <Button
                      variant="contained"
                      component="label"
                      id="mg-left"
                      startIcon={<CloudUploadIcon />}
                    >
                      Subir justificante
                      <input 
                      type="file" 
                      required
                      onChange={e => {
                        handleChangeArchivo(e.target.files);
                      }}
                      
                       />
                    </Button>
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
