import React, { useState } from 'react';

const SearchProfessor = ({ onSearchProfessor }) => {
  const [searchInput, setsearchInput] = useState(' ');

  const handleSearch = e => {
    setsearchInput(e.target.value);
    onSearchProfessor(searchInput);
  };

  return (
    <>
      <p>Buscar Profesor</p>
      //TODO
    </>
  );
};

export default SearchProfessor;
