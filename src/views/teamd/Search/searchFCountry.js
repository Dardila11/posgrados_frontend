import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { listFCountriesService } from './service';

export const SearchCountry = ({ callback }) => {
  const [listCountries, setListCountries] = useState([]);
  useEffect(() => {
    listFCountriesService()
      .then(result => setListCountries(result.data))
      .catch(()=> setListCountries([]));
  }, []);
  const getIdContry = async name => {
    let find = listCountries.find(country => country.name === name);
    if (find === undefined) {
    } else {
      callback(find.id);
    }
  };
  return (
    <Autocomplete
      id="searchFCountries"
      options={listCountries}
      getOptionLabel={option => option.name}
      style={{ marginBottom: 10, marginTop: 10, widht: 300 }}
      renderInput={params => (
        <TextField
          id="inputOptionCountry"
          {...params}
          label="Pais"
          variant="outlined"
          required
        />
      )}
      onInputChange={(e, input) => getIdContry(input)}
      onChange={(e, input) => getIdContry(input)}
    />
  );
};
