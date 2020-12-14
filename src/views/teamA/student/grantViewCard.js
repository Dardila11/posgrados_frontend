import React, { useState } from 'react'
import { Card,CardContent,CardActions,Button, makeStyles, Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box';
import {UGrantDialog} from './uGrantDialog'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

export const GrantViewCard = ({grant}) => {

    const [openDialog, setOpenDialog] = useState(false)
    const [lineInvestigation, setLineInvestigation] = useState(grant.investigation_line)
    const openDialogF =()=>{
        setOpenDialog(true)
    }
    return (
        <Card className="border border-dark rounded mb-0">
            
            <CardContent>
            <Typography color="textPrimary" variant="h3">Información del convenio</Typography>
            <Box display="flex" flexDirection="column"marginTop={2}>
                <Typography color="textPrimary" variant="h4">Nombre <Typography color="textPrimary" variant="body2">{grant.name}</Typography></Typography>
                <Typography color="textPrimary" variant='h4'>Inicio<Typography color="textPrimary" variant="body2">{grant.start_date}</Typography></Typography>
                <Typography color="textPrimary" variant='h4'>Fecha de vencimiento<Typography color="textPrimary" variant="body2">{grant.end_date}</Typography></Typography>
                <Typography color="textPrimary" variant='h4'> Description <Typography color="textPrimary" variant="body2">{grant.description}</Typography></Typography>
            </Box>
            <Box display="flex" justifyContent="flex-end">
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
            <UGrantDialog grant={grant} state={openDialog} setState={setOpenDialog}/>
        </Card>
    )
}
