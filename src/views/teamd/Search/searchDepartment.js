import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { listDeparmentsService } from './service';

// eslint-disable-next-line react/prop-types,import/prefer-default-export
export const SearchDepartment = ({ idCountry, callback }) => {
  const [listDepartments, setListDepartments] = useState([]);
  useEffect(() => {
    console.log('buscando departamentos ');
    listDeparmentsService(idCountry).then(result =>
      setListDepartments(result.data.Departments)
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
      freeSolo
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
