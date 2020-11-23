import React, { useState } from 'react';
import { Input, Button } from '@material-ui/core';

const UploadFile = () => {
  const [file, setfile] = useState(null);

  const insertFile = e => {
    setfile(e);
  };

  const uploadFile = () => {
    const formData = new FormData();

    for (let i = 0; i < file.length; i++) {
      formData.append('file', file[i]);
      console.log(file[i]);
    }
  };

  return (
    <div>
      <label id="hi"> HOLA SOY NUEVO</label>
      <br />
      <Input
        type="file"
        name="file"
        inputProps={{ accept: '.pdf' }}
        onChange={e => insertFile(e.target.files)}
      />
      <br />
      <Button variant="contained" color="primary" onClick={() => uploadFile()}>
        {' '}
        Upload{' '}
      </Button>
    </div>
  );
};

export default UploadFile;
