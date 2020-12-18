import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { CreateProfessorApi } from './service';
import 'bootstrap/dist/css/bootstrap.min.css';
import { makeStyles } from '@material-ui/core/styles';
import { AlertView } from '../../../../components/Alert'
import {
  Box,
  Button,
  Container,
  Typography
} from '@material-ui/core';
import { SearchDeparmentI } from '../../Search/searchDepartmentI';
import { SearchInstitution } from '../../Search/searchInstitution';
import { SearchUser } from '../../Search/searchUser';

const useStyles = makeStyles({
  root: {
    background: 'white',
    border: 1,
    borderRadius: 3,
    boxShadow: '-1px 8px 36px 4px rgba(158,158,158,1)',
    padding: '50px'
  },
  inputs: {
    margin: '10px'
  }
});

const CreateProfessorView = () => {
  
  const [open, setOpen] = useState(false)
  const [typeAlert, setTypeAlert] = useState('success')
  const [message, setMessage] = useState('')
  const clases = useStyles();
  const [user, setUser] = useState('');
  const [Institution, setInstitution] = useState(null);
  const [departmentI, setdepartmentI] = useState(null);
  const [isInternal, setisInternal] = useState(true);


  //obtener inputs
  const handleChangeDepartmentI = result => {
    setdepartmentI(result);
  };
  const getIdInstitution = id => {
    setInstitution(id);
  };
  const getIdUser = id => {
    setUser(id);
  };

  const handleChangeIsInternal = () => {
    let selecteds = document.getElementById('selectedIsInternal');
    setisInternal(selecteds.options[selecteds.selectedIndex].text);
    if (selecteds.options[selecteds.selectedIndex].text === 'No') {
      setisInternal(false);
    } else {
      setisInternal(true);
    }
  };
  const handleCreate = () => {
    setOpen(false)
    if (isInternal === true) {
      CreateProfessorApi({
        is_director_student: false,
        is_director_gi: false,
        is_internal: isInternal,
        user: user,
        institution: 1,
        department: departmentI
      })
        .then((request) => {
          setOpen(true)
          setTypeAlert('success')
          setMessage('Profesor creado correctamente')
        })
        .catch((request) => {
          setOpen(true)
          setTypeAlert('error')
          setMessage('Error, Verifica los datos!')
        });
    } else {
      CreateProfessorApi({
        is_director_student: false,
        is_director_gi: false,
        is_internal: isInternal,
        user: user,
        institution: Institution,
        department: departmentI
      })
        .then((request) => {
          setOpen(true)
          setTypeAlert('success')
          setMessage('Profesor creado correctamente')
        })
        .catch((request) => {
          console.log(request)
          setOpen(true)
          setTypeAlert('error')
          setMessage('Error, Verifica los datos!')
        });
    }

  };
  const handleSubmit = event => {
    handleCreate();
    event.preventDefault();
  };
  return (
    <Box m={5}>
      <Container maxWidth="sm" className={clases.root}>
        <Typography color="textPrimary" variant="h1" align="center">
          Crear Profesor
        </Typography>

        <Formik
          initialValues={{}}
          validationSchema={Yup.object().shape({
            departmentI: Yup.string()
              .max(255)
              .required('Department is required'),
            institution: Yup.string()
              .max(255)
              .required('Institutio is required')
          })}
          onSubmit={() => {}}
        >
          {() => (
            <>
              <Box
                display="flex"
                flexDirection="column"
                height="100%"
                justifyContent="center"
              >
                <form onSubmit={handleSubmit} className={clases.inputs}>
                  <SearchUser callback={getIdUser} />

                  <Box mb={3}>
                    {/* usserrr */}

                    <div
                      style={{
                        display: 'flex',
                        marginTop: '20px',
                        marginBottom: '20px',
                        paddingLeft: '2px'
                      }}
                    >
                      <Typography color="textPrimary" variant="h5">
                        ¿Es interno?
                      </Typography>
                      <select
                        style={{
                          marginTop: '0px',
                          width: '50px',
                          height: '25px',
                          marginLeft: '15px'
                        }}
                        id="selectedIsInternal"
                        onChange={handleChangeIsInternal}
                      >
                        <option value="Si">Si</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                    <span>
                      {isInternal ? (
                        <div /* Este es el div 1 */>
                          <SearchDeparmentI
                            callback={handleChangeDepartmentI}
                          />
                        </div>
                      ) : (
                        /* Institution*/
                        <SearchInstitution callback={getIdInstitution} />
                      )}
                    </span>

                    <Box my={2}>
                      <Button
                        color="primary"
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Crear
                      </Button>
                    </Box>
                  </Box>
                </form>
              </Box>
            </>
          )}
        </Formik>
        <AlertView open = {open}  typeAlert = {typeAlert} message = {message}/>
      </Container>
    </Box>
  );
};
export default CreateProfessorView;
