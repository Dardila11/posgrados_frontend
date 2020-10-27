import React, { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core';





export const  ListProfessors = ({professors,filterBy}) => {
    

    const [open, setOpen] = useState(false);



    const [color, setcolor] = useState("rojo")
    const handleAssing = () =>{
      setOpen(true);
      
    }
    const handleAssingClose = () => {

      setOpen(false);
    };
    const handleAdd = (isDirector) =>{
        if (!isDirector){
            return <button onClick= {handleAssing}>Asignar</button>
        }else{
          return <button disabled>Asignar</button>
        }

    }
    const list = () =>{
      if (filterBy!=" "){
        return professors.map ( 
          (i) => {

            if (i.name.toLowerCase().search(filterBy.toLowerCase()) > -1){
             
            return(  
              <TableRow
              hover
              key={i.id}
            >
                    <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                        
                      >
                        {i.name}
                      </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {i.email}
                    </TableCell>
                    <TableCell>
                      {i.edad}
                    </TableCell>
                    <TableCell>
                        {
                          handleAdd(i.isDirector)
                        }
                  </TableCell>
            </TableRow>
            )
          }
        }
        )
      }else{
        return professors.map ( 
          (i) => {
            return(  
              <TableRow
              hover
              key={i.id}
            >
                    <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      <Typography
                        color="textPrimary"
                        variant="body1"
                        
                      >
                        {i.name}
                      </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {i.email}
                    </TableCell>
                    <TableCell>
                      {i.edad}
                    </TableCell>
                    <TableCell>
                        {
                          handleAdd(i.isDirector)
                        }
                  </TableCell>
            </TableRow>
            )
          }
        )
      }

    }
    
    
    return (
      <>
        <Card
        >
        <PerfectScrollbar>
          <Box minWidth={1050}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Nombre
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
                  <TableCell>
                    Edad
                  </TableCell>
                  <TableCell>
                    
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list()}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
      </Card>


      <Dialog open={open} onClose={handleAssingClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Asignar</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Grupo de investigación"
          type="text"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAssingClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAssingClose} color="primary">
          Asignar
        </Button>
      </DialogActions>
      </Dialog>
      </>
    )
    
}

export default ListProfessors;