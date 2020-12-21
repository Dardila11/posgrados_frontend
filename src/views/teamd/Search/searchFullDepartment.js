import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { listFullDeparmentsService } from './service';

// eslint-disable-next-line react/prop-types,import/prefer-default-export
export const SearchFullDepartment = ({ idCountry, callback }) => {
  const [listDepartments, setListDepartments] = useState([]);
  useEffect(() => {
    listFullDeparmentsService(idCountry).then(result =>
      {
      setListDepartments(result.data)
        console.log("Departamento ",result)
    }
    );
  }, [idCountry]);

  const getIdDepartment = name => {
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
