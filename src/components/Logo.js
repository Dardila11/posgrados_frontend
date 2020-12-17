import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="/static/logo.svg"
      width = "50"
      height = "50"
      {...props}
    />
  );
};

export default Logo;
