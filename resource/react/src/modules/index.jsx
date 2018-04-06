import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import Home from './home';

console.log(Home, '21');
ReactDOM.render(
  <Home />,
  document.querySelector('#root')
);
