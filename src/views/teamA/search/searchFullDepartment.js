import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { listFullDeparmentsService } from './service';

// eslint-disable-next-line react/prop-types,import/prefer-default-export
export const SearchFullDepartment = ({ idCountry, callback }) => {
  const [listDepartments, setListDepartments] = useState([]);
  useEffect(() => {
    console.log('buscando departamentos ');
    console.log(idCountry);
    listFullDeparmentsService(idCountry).then(result =>
      setListDepartments(result.data.States)
    );
  }, [idCountry]);

  const getIdDepartment = name => {
    console.log(name);
    let find = listDepartments.find(department => department.name === name);
    if (find === undefined) {
    } else {
      callback(find.id);
    }
  };
  return (
    <Autocomplete
      id="searchDepartments"
      options={listDepartments}
      getOptionLabel={option => option.name}
      style={{ marginBottom: 10, marginTop: 10 }}
      renderInput={params => (
        <TextField
          id="inputOptionDepartment"
          {...params}
          label="Departamento"
          variant="outlined"
          required
        />
      )}
      onInputChange={(e, input) => getIdDepartment(input)}
      onChange={(e, input) => getIdDepartment(input)}
    />
  );
};
