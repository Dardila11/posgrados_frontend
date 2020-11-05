import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

//service

import { GetlistInstitutionService } from './service';

export const SearchInstitution = ({ callback }) => {
  const [listInstitution, setlistInstitution] = useState([]);

  useEffect(() => {
    GetlistInstitutionService()
      .then(result => {
        setlistInstitution(result.data.Institutions);
      })
      .catch(setlistInstitution([]));
  }, []);

  const getIdInstitution = name => {
    let find = listInstitution.find(
      institution => institution.name_inst === name
    );
    if (find === undefined) {
    } else {
      callback(find.id);
    }
  };
  return (
    <Autocomplete
      id="searchInstitutions"
      options={listInstitution}
      getOptionLabel={option => option.name_inst}
      style={{ marginBottom: 10, marginTop: 10, widht: 300 }}
      renderInput={params => (
        <TextField
          id="inputOptionInstitution"
          {...params}
          label='Institucion'
          variant='outlined'
          required
        />
      )}
      onInputChange={(e, input) => getIdInstitution(input)}
      onChange={(e, input) => getIdInstitution(input)}
    />
  );
};
