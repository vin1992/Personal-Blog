import 'antd/dist/antd.css';
import "./style.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './app';
import Home from './home';
import CreateArticle from './createArticle';
import ArticleList from './articleList';
import ArticleDetails from './articleDetails';
import Garbage from './garbage';
import Tags from './tags';

// PS: browserHistory has been removed in react 4.0  ,instead using react-router-dom hashRouter

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="backEnd" component={App}>
      <IndexRoute component={Home} />
      <Route path="create" component={CreateArticle} />
      <Route path="articleList" component={ArticleList} />
      <Route path="articleDetails/:id" component={ArticleDetails} />
      <Route path="garbage" component={Garbage} />
      <Route path="tags" component={Tags} />
    </Route>
  </Router>,
  document.querySelector('#root')
);

