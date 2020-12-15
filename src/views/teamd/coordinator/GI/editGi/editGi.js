import { FormGroup, makeStyles, Typography,Button, Box} from '@material-ui/core'
import React, { useState } from 'react'
import {SearchGI} from '../../../Search/searchGI'
import {SearchDeparmentI} from '../../../Search/searchDepartmentI'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {CreateView} from '../../../coordinator/GI/create'
import {AssignDirector} from '../../GI/service'
const useStyles =makeStyles({
    contenedor:{

    }
})

export const EditGi = () => {
    const clases = useStyles();

    const [idGi, setIdGi] = useState('')
    const [deparmentId, setDeparmentId] = useState('')
    const [openDialog, setOpenDialog] = useState(false)

    const getIdGi = (id)=>{
        setIdGi(id)
    }
    const getIdDeparment = (id)=>{
        setDeparmentId(id)
    }
    const handleEdit = (e)=>{
        e.preventDefault();
        
        setOpenDialog(true)
    }
    const handleCloseDialog =()=>{
        setOpenDialog(false);
    }
    const handleEditGi=()=>{

    }
    
    return (
        <div >
            <form onSubmit={handleEdit}>
                <Box
                    display="flex"
                    flexDirection="column"
                    height="100%"
                >
                    <FormGroup>
                        <SearchDeparmentI className={clases.input} callback={getIdDeparment}/>
                        <SearchGI callback={getIdGi} departmentIID={deparmentId}/>
                    </FormGroup>
                    <FormGroup>
                        <Button
                            id="editarGi"
                            color="primary"
                            type="submit"
                            variant="contained"
                            style={{ marginBottom: 10, marginTop: 10, width: 300 }}    
                        >
                            Editar    
                        </Button>    
                    </FormGroup>
                </Box>
            </form> 

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Grupo de investigación</DialogTitle>
                <DialogContent>
                        {/* <Box
                    display="flex"
                    flexDirection="column"
                    height="100%"
                    alignItems="center"
                    paddingTop={3}
                    > */}
                    {/* <form onSubmit={handleEditGi}>
                        <Box mb={3}>
                        <FormGroup>
                            <TextField
                            fullWidth
                            label="Nombre"
                            name="name"
                            style={{ marginBottom: 10, marginTop: 10, width: 500 }}
                            onChange={e => {
                                handleChangeName(e);
                            }}
                            type="text"
                            value={name}
                            variant="outlined"
                            required
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                                )
                            }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <TextField
                            fullWidth
                            label="Email"
                            name="email"
                
                            style={{ marginBottom: 10, marginTop: 10, width: 500 }}
                            onChange={e => {
                                handleChangeEmail(e);
                            }}
                            type="email"
                            value={email}
                            variant="outlined"
                            required
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <MailRoundedIcon />
                                </InputAdornment>
                                )
                            }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <SearchDeparmentI callback={handleChangeDepartmentI} />
                        </FormGroup>
                        <TextField
                            id="categoriaId"
                            label="Categoria"
                            style={{ width: '100px' }}
                            variant="outlined"
                            select
                            margin="normal"
                            onChange={e => {
                            
                            handleChangeCategory(e);
                            }}
                            value={category}
                            required
                            fullWidth
                        >
                            <MenuItem key="CategoryOption1" value="A">
                            A
                            </MenuItem>
                            <MenuItem key="CategoryOption2" value="B">
                            B
                            </MenuItem>
                            <MenuItem key="CategoryOption3" value="C">
                            C
                            </MenuItem>
                        </TextField>

                        <FormGroup>
                            <InputLabel id="label-date">Fecha fundación</InputLabel>
                            <TextField
                            id="dateGI"
                            type="date"
                            defaultValue="2020-01-01"
                            required
                            style={{ marginBottom: 10, marginTop: 10, width: 200 }}
                            InputLabelProps={{
                                shrink: true
                            }}
                            onInputCapture={handleChangeDateFoundation}
                            />
                        </FormGroup>
                        <Box my={2}>
                            <Button
                            color="primary"
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            style={{ marginBottom: 10, marginTop: 10, width: 500 }}
                            >
                            Editar
                            </Button>
                        </Box>
                        </Box>
                    </form>
                    </Box> */}
                </DialogContent>
            </Dialog>
        </div>
    )
}
