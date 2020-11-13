import { Card,CardContent,CardActions,Button, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import {AssignDirector} from './AssignDirector'
const useStyles = makeStyles({
    root: {
      borderRadius: 3,
      minWidth: '200px',
      

    },
  });

export const Professor_card = ({profesor}) => {
    
    const { id, name , email, edad, isDirector} = profesor;
    const classes = useStyles();
    const [dialogState, setDialogState] = useState(false)

    const getState = (state)=> {
        setDialogState(state)
        console.log("estado cuando se obtiene ", dialogState)
    }
    const handleAssign = () =>{
        setDialogState(true)
        console.log("Asignar director")
    }

    return (
        <Card className="border border-dark rounded mb-0">
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {name}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                    {email}
                </Typography>
                {isDirector === true ?(
                    <>
                    <CardActions>
                        <Button variant="outlined" size="small" disabled>Eliminar Director</Button>
                    </CardActions>
                    </>  
                    ) : isDirector == false ? (
                    <>
                    <CardActions>
                        <Button 
                            variant="outlined" 
                            color="primary" size="small" 
                            className = {classes.button}
                            onClick = {handleAssign}
                            >
                                Asignar Director
                        </Button>
                    </CardActions>
                    </>    
                    ) : (
                    <Typography color="textSecondary" gutterBottom>
                        Not Found
                    </Typography>
                    )}
            </CardContent>
           <AssignDirector state = {dialogState} getState = {getState} />


        </Card>


    )
}
