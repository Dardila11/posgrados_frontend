import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Card,
  CardContent,
  makeStyles,
  Modal
} from '@material-ui/core';
import Page from 'src/components/Page';
const useStyles = makeStyles((theme) => ({
    modal: {
      position:'absolute',
      width:400,
      background:'white',
      border:'2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2,4,3),
      top:'50%',
      transform:'translate(-50%, -50%)'
    }
  }));
export const CreateProgramModal = () => {
    const classes = useStyles();
    const [modal, setModal] = useState(false);
    const abrirCerrarModal =() =>{
        setModal(!modal)
    };
    
    return (
        <Modal
        isOpen={true}
        onClose={handleClose}
        style={customStyles}
        closeTimeoutMS={200}
        className='modal'
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>




    )



}