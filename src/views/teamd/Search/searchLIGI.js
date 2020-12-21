import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {GetLineGIService} from './service';
export const SearchLIGIView = ({ callback ,giID}) => {
  const [lineList, setLineList] = useState([]);
  //llenando la lista de opciones
  useEffect(() => {
    GetLineGIService(giID)
      .then(request => {
        console.log("LINESSSSSSSSS",request.data)
        setLineList(request.data.Lines)
      })
      .catch(() => setLineList([]));
  }, []);

  const getIdLine = name => {
    let find = lineList.find(knowl => knowl.name === name);
    if (find === undefined) {
    } else {
      callback(find.id);
    }
  };
  return (
    <Autocomplete
      id="lineADD"
      options={lineList}
      getOptionLabel={option => option.title}
      style={{ marginBottom: 10, marginTop: 10 }}
      renderInput={params => (
        <TextField
          id="inputOption"
          {...params}
          label="Linea de investigacion"
          variant="outlined"
          required
        />
      )}
      onInputChange={(e, input) => getIdLine(input)}
      onChange={(e, input) => getIdLine(input)}
    />
  );
};
