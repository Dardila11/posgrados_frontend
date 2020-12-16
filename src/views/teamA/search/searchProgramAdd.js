/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, {
  createFilterOptions
} from '@material-ui/lab/Autocomplete';

const filter = createFilterOptions();

//Programas para llenar la lista
const programs = [
  { program: 'Doctorado en Ciencias Agrarias y Agroindustriales' },
  { program: 'Doctorado en Antropología' },
  { program: 'Doctorado en Ciencias Humanas' },
  { program: 'Doctorado en Artes Integradas con el ambiente' },
  { program: 'Especialización en Derecho de Familia' },
  { program: 'Especialización en Estructuras' },
  { program: 'Maestría en gestión de organizaciones y proyectos' },
  { program: 'Maestría en computación' },
  { program: 'Maestría en música' }
];

const [value, setValue] = React.useState(null);
const [open, toggleOpen] = React.useState(false);

const handleClose = () => {
  setDialogValue({
    program: ''
  });

  toggleOpen(false);
};

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

export const SearchProgramAdd = () => {
  return (
    <>
      <Autocomplete
        value={value}
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
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              orogram: `Add "${params.inputValue}"`
            });
          }

          return filtered;
        }}
        id="search-program-add"
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
        style={{ width: 300 }}
        freeSolo
        renderInput={params => (
          <TextField {...params} label="Fre" variant="outlined" />
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
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
