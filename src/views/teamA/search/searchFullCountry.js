import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { listFullCountriesService } from './service';

export const SearchFullCountry = ({ callback }) => {
  const [listCountries, setListCountries] = useState([]);
  useEffect(() => {
    listFullCountriesService()
      .then(result => setListCountries(result.data.Countrys))
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
      id="searchCountries"
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
