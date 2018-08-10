import 'antd/dist/antd.css';
import 'react-quill/dist/quill.snow.css';
import "./style.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import App from './app';
import Home from './home';
import CreateArticle from './createArticle';
import ModifyArticle from './modifyArticle';
import ArticleList from './articleList';
import ArticleDetails from './articleDetails';
import Garbage from './garbage';
import Login from './login';
import Tags from './tags';
import Door from './door';

// PS: browserHistory has been removed in react 4.0  ,instead using react-router-dom hashRouter

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Door}>
      <Route path="backEnd" component={App}>
        <Route path="home" component={Home} />
        <Route path="create" component={CreateArticle} />
        <Route path="modify/:id" component={ModifyArticle} />
        <Route path="articleList" component={ArticleList} />
        <Route path="articleDetails/:id" component={ArticleDetails} />
        <Route path="garbage" component={Garbage} />
        <Route path="tags" component={Tags} />
      </Route>
      <Route path="login" component={Login} />
    </Route>
  </Router>,
  document.querySelector('#root')
);

