import "./style.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Link, HashRouter } from 'react-router-dom';

import Home from './home';
import Details from './details';
// PS: browserHistory has been removed in react 4.0  ,instead using react-router-dom hashRouter

ReactDOM.render(
  <HashRouter>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/details" component={Details} />
    </div>
  </HashRouter>,
  document.querySelector('#root')
);
