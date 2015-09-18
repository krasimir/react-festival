import React from 'react';
import Festival from './Festival.jsx';

window.onload = () => {
  React.render(
    <Festival />,
    document.querySelector('#container')
  );
};
