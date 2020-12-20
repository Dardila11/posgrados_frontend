import { CardContent,CardActions,Button, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import Box from '@material-ui/core/Box';
import {EditGiDialog} from './EditGiDialog'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import {ConsultGi} from '../service'
import { AlertView } from 'src/components/Alert'
import Select from '@material-ui/core/Select';
export const Gi_Card = ({gi}) => {

    const [open, setOpen] = useState(false)
    const [typeAlert, setTypeAlert] = useState('success')
    const [message, setMessage] = useState('')

    const { id,name,email,foundation_date,category,department,status} = gi;

    const [dialogState, setDialogState] = useState(false)
    const handleAssign = () =>{
        setDialogState(true)
    }
    const handleTrash =()=>{
        console.log("grupo de investigacion aaaaa",status)
        ConsultGi({
            id: id,
            status: false,
            department:department
        }).then( result => 

            {
                setOpen(true)
                setTypeAlert('success')
                setMessage('Eliminado correctamente')
            }

        ).catch( result => {
            setOpen(true)
            setTypeAlert('error')
            setMessage('No se elimino ',result.data)
        } )

    }
    return (
        // <RouterLink to={link}>
        <Box className="border rounded mb-0">
            
            <CardContent>
            <Typography color="textPrimary" variant="h4">INFO. Grupo de investegación</Typography>
            <Box alignItems="start" display="flex" flexDirection="column">
                <Typography color="textPrimary" variant="h5">Nombre:  <Typography color="textPrimary" variant="caption">{name}</Typography></Typography>
                <Typography color="textPrimary" variant="h5">Email:  <Typography color="textPrimary" variant="caption">{email}</Typography></Typography>
                <Typography color="textPrimary" variant="h5">Fecha de fundación:  <Typography color="textPrimary" variant="caption">{foundation_date}</Typography></Typography>
                <Typography color="textPrimary" variant="h5">Categoría:  <Typography color="textPrimary" variant="caption">{category}</Typography></Typography>
                <Box display="flex"> 
                    <Typography color="textPrimary" variant="h5"> Estado: 
                        { status ? (
                        <Typography color="primary" variant="inherit"> 
                            <Box fontWeight="fontWeightBold" m={0}>
                            Activo
                            </Box>
                        </Typography>) : 
                        (<Typography color="error" variant="inherit" component="div">
                            <Box fontWeight="fontWeightBold" m={0}>
                                Inactivo
                            </Box> 
                        </Typography>) } 
                    </Typography>                 
                </Box>
                {/* <Typography color="textSecondary" gutterBottom>
                    Email: {usuario.email}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Institucion: {nameInstitution}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    Departamento: {nameDeparment}
                </Typography> */}
                </Box>
                    <Box display="flex" justifyContent="flex-end">
                    <CardActions>
                            <Button 
                                size="small"
                                onClick={handleAssign}
                                >
                                    <EditIcon />
                            </Button>
                            <Button 
                                size="small"
                                onClick={handleTrash}
                                >
                                    <DeleteIcon />
                            </Button>
                    </CardActions>
                     </Box>
                    <EditGiDialog state={dialogState} setState={setDialogState} gi={gi}/>
            
            </CardContent>
            <AlertView open = {open}  typeAlert = {typeAlert} message = {message}/>
        </Box>
        
        // </RouterLink>


    )
}
