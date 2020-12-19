import React, { useState, useEffect } from 'react';
import { ConsultProgram, ConsultStudent , ConsultUserService} from './service';
import 'src/views/teamA/coordinator/styles.css';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
  DialogActions,
  makeStyles
} from '@material-ui/core';
import Autocomplete, {
  createFilterOptions
} from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

//Profes para llenar la lista


export const SearchTeacher = ({ callback }) => {
  const [teacherList, setTeacherList] = useState([]); // cambiar los nombres de los estados
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const [Teachers, setTeachers] = useState([]);
useEffect(() => {
  ConsultUserService().then(result => setTeachers(result.data.Users.find(result => result.is_proffessor == true)))
  
}, [])
  const [dialogValue, setDialogValue] = React.useState({
    teacher: ''
  });
  const handleSubmit = event => {
    event.preventDefault();
    setValue({
      teacher: dialogValue.teacher
    });

    handleClose();
  };
  const handleClose = () => {
    setDialogValue({
      teacher: ''
    });

    toggleOpen(false);
  };
  //llenando la lista de opciones
  useEffect(() => {
    ConsultStudent()
      .then(request => {
        console.log(request.data);
        setTeacherList(request.data); //Nota back
      })
      .catch(() => setTeacherList([]));
  }, []);

  const getIdTeacher = name => {
    let find = teacherList.find(teacher => teacher.name === name); // NOTA verificar el nombre del profesor con el back (Program.name)
    if (find === undefined) {
    } else {
      callback(find.id);
    }
  };
  return (
    <>
      <Autocomplete
        value={value}
        style={{ margin: '10px 0 0 0' }}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                teacher: newValue
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              teacher: newValue.inputValue
            });
          } else {
            setValue(newValue);
          }
        }}
        id="SerchTeacher" // cambiar de user a program
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          return filtered;
        }}
        options={Teachers}
        getOptionLabel={option => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.teacher;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={option => option.username}
        freeSolo
        renderInput={params => (
          <TextField {...params} label="Director" variant="outlined" />
        )}
      />
    </>
  );
};
