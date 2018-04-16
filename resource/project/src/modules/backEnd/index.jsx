import 'antd/dist/antd.css';
import "./style.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './app';
import Home from './home';
import CreateArticle from './createArticle';
import articleList from './articleList';

// PS: browserHistory has been removed in react 4.0  ,instead using react-router-dom hashRouter

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="backEnd" component={App}>
      <IndexRoute component={Home} />
      <Route path="create" component={CreateArticle} />
      <Route path="articleList" component={articleList} />
    </Route>
  </Router>,
  document.querySelector('#root')
);

