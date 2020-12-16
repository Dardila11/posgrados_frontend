import React, { useState } from 'react'
import { Card,CardContent,CardActions,Button, makeStyles, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import {UAgreementDialog} from './uAgreementDialog'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export const AgreementViewCard = ({agreement}) => {
    const [openDialog, setOpenDialog] = useState(false)
    const openDialogF =()=>{
        setOpenDialog(true)
    } 


    return (
        <Card className="border border-dark rounded mb-0">
            <CardContent>
            <Typography color="textPrimary" variant="h3">Convenio</Typography>
            <Box display="flex" flexDirection="column"marginTop={2}>
                {/* <Typography color="textPrimary" variant="h4">Beca <Typography color="textPrimary" variant="body1">{agreement.id}</Typography></Typography> */}
                <Typography color="textPrimary" variant="h5">Numero de acuerdo<Typography color="textPrimary" variant="body2">{agreement.long}</Typography></Typography>
                <Typography color="textPrimary" variant="h5">Fecha del acuerdo<Typography color="textPrimary" variant="body2">{agreement.agreement_date}</Typography></Typography>
                <Typography color="textPrimary" variant="h5">Fecha de inicio <Typography color="textPrimary" variant="body2">{agreement.start_date}</Typography></Typography>
                <Typography color="textPrimary" variant="h5">Fecha de vencimiento <Typography color="textPrimary" variant="body2">{agreement.end_date}</Typography></Typography>
                <Typography color="textPrimary" variant="h5">Periodo academico <Typography color="textPrimary" variant="body2"> {agreement.period_academic}</Typography></Typography>
                <Typography color="textPrimary" variant="h5">Descuento<Typography color="textPrimary" variant="body2">{agreement.percentage_discount}%</Typography></Typography>
                <Typography color="textPrimary" variant="h5">Observación<Typography color="textPrimary" variant="body2">{agreement.observation}</Typography></Typography>
            </Box>
            <Box display="flex"justifyContent="flex-end">
                    <CardActions>
                            <Button 
                                size="small"
                                onClick={openDialogF}
                                >
                                    <EditIcon />
                            </Button>
                    </CardActions>
            </Box>
            </CardContent>
            < UAgreementDialog agreement={agreement} state={openDialog} setState={setOpenDialog}/>
        </Card>
    )
}

