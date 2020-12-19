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
      renderInput={params => (
        <TextField
          id="inputOptionInstitution"
          {...params}
          label='Institución'
          variant='outlined'
          required
          style={{width: 300,marginLeft:10,marginBottom:20}}
        />
      )}
      onInputChange={(e, input) => getIdInstitution(input)}
      onChange={(e, input) => getIdInstitution(input)}
    />
  );
};
