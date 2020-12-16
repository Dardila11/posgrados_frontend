import React, { useState, useEffect } from 'react';
import { ConsultProgram } from './service';

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  DialogActions
} from '@material-ui/core';
import Autocomplete, {
  createFilterOptions
} from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

//Programas para llenar la lista
const programs = [
  { program: 'Doctorado en Ciencias Agrarias y Agroindustriales' },
  { program: 'Doctorado en Antropología' },
  { program: 'Doctorado en Ciencias Humanas' },
  { program: 'Doctorado en Ciencias Químicas' },
  { program: 'Doctorado en Ciencias de la Electrónica' },
  { program: 'Doctorado en Ingeniería Telemática' },
  { program: 'Doctorado en Ciencias Matemáticas' },
  { program: 'Doctorado en Etnobiología y estudios Binoculares' },
  { program: 'Doctorado en Artes Integradas con el ambiente' },
  { program: 'Especialización en gerencia de proyectos' },
  { program: 'Especialización en mercadeo corporativo' },
  { program: 'Especialización en TIC para la Innovación Educativa' },
  { program: 'Especialización en Derecho de Familia' },
  { program: 'Especialización en Estructuras' },
  { program: 'Especialización en Ingeniería de Recursos Hídricos' },
  { program: 'Especialización en Ingeniería de Vías Terrestres' },
  { program: 'Especialización en Gobierno y Políticas Públicas' },
  { program: 'Especialización en Actividad Física para la salud' },
  { program: 'Especialización en Educación y Discapacidad' },
  { program: 'Especialización en Entrenamiento Deportivo' },
  { program: 'Especialización en sistemas integrados de calidad ' },
  { program: 'Especialización en seguridad y salud en el trabajo ' },
  { program: 'Maestría en contabilidad y finanzas' },
  { program: 'Maestría en estudios interdisciplinarios del desarrollo' },
  { program: 'Maestría en gestión de organizaciones y proyectos' },
  { program: 'Maestría en computación' },
  { program: 'Maestría en música' },
  { program: 'Maestría en ciencias humanas' },
  { program: 'Maestría en Automática' },
  { program: 'Maestría en Electrónica y Telecomunicaciones' },
  { program: 'Maestría en Ingeniería Telemática' },
  { program: 'Maestría en bioingeniería' },
  { program: 'Maestría en biología' },
  { program: 'Maestría en Ciencias Matemáticas' },
  { program: 'Maestría en Deporte y Actividad Física' },
  { program: 'Maestría en Ingeniería Física' },
  { program: 'Maestría en Ingeniería de Vías Terrestres' },
  { program: 'Maestría en Recursos Hidrobiológicos Continentales' },
  { program: 'Maestría en estudios interculturales' },
  { program: 'Maestría en Gobierno y Políticas Públicas' },
  { program: 'Maestría en ética y filosofía política' },
  { program: 'Maestría en Revitalización y enseñanza de lengua indígena' },
  { program: 'Maestría en computación' }
];

export const SearchProgramOrAdd = ({ callback }) => {
  const [programList, setProgramList] = useState([]); // cambiar los nombres de los estados
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);

  const [dialogValue, setDialogValue] = React.useState({
    program: ''
  });
  const handleSubmit = event => {
    event.preventDefault();
    setValue({
      program: dialogValue.program
    });

    handleClose();
  };
  const handleClose = () => {
    setDialogValue({
      program: ''
    });

    toggleOpen(false);
  };
  //llenando la lista de opciones
  useEffect(() => {
    ConsultProgram()
      .then(request => {
        console.log(request.data);
        setProgramList(request.data); //Nota back
      })
      .catch(() => setProgramList([]));
  }, []);

  const getIdProgram = name => {
    let find = programList.find(program => program.name === name); // NOTA verificar el nombre del programa con el back (Program.name)
    if (find === undefined) {
    } else {
      callback(find.id);
    }
  };
  return (
    <>
      <Autocomplete
        value={value}
        style={{ margin: '15px 0 0 0' }}
        fullWidth
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                program: newValue
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              program: newValue.inputValue
            });
          } else {
            setValue(newValue);
          }
        }}
        id="SerchProgram" // cambiar de user a program
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          return filtered;
        }}
        options={programs}
        getOptionLabel={option => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.program;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={option => option.program}
        freeSolo
        renderInput={params => (
          <TextField
            fullWidth
            {...params}
            label="Programa"
            variant="outlined"
          />
        )}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">
            Agregue un nuevo programa
          </DialogTitle>
          <DialogContent>
            <span>
              En caso de no encontrar el programa deseado, puede crearlo
            </span>
            <Button disableElevation color="primary">
              Crear un programa
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              Agregar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
