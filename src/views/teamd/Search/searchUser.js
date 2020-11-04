import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ConsultUserService } from './service';
export const SearchUser = ({ callback }) => {
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    ConsultUserService()
      .then(request => {
        console.log(request.data);
        setUserList(request.data.Users);
      })
      .catch(() => setUserList([]));
  }, []);

  const getIdUser = name => {
    let find = userList.find(user => user.username === name);
    if (find === undefined) {
    } else {
      callback(find.id);
    }
  };
  return (
    <Autocomplete
      id="searchUser"
      options={userList}
      getOptionLabel={option => option.username}
      style={{ marginBottom: 10, marginTop: 10 }}
      renderInput={params => (
        <TextField
          id="inputOption"
          {...params}
          label='Usuario'
          variant='outlined'
          required
        />
      )}
      onInputChange={(e, input) => getIdUser(input)}
      onChange={(e, input) => getIdUser(input)}
    />
  );
};
