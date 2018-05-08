import 'antd/dist/antd.css';
import "./style.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './app';
import Home from './home';
import Details from './details';
// PS: browserHistory has been removed in react 4.0  ,instead using react-router-dom hashRouter

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="frontEnd" component={App}>
      <IndexRoute component={Home} />
      <Route path="details/:categoryId" component={Details} />
    </Route>
  </Router>,
  document.querySelector('#root')
);

