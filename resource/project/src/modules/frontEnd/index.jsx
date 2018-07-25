import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style.css";
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Loadable from 'react-loadable';
import reducer from './ducks';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// const Loading = () => <div>Loading ,Please wait a while...</div>;

// const App = Loadable({
//   loader: () => import('./app'),
//   loading: Loading
// })

// const Home = Loadable({
//   loader: () => import('./home'),
//   loading: Loading
// })

// const Details = Loadable({
//   loader: () => import('./details'),
//   loading: Loading
// })



import App from './app';
import Home from './home';
import Details from './details';
// PS: browserHistory has been removed in react 4.0  ,instead using react-router-dom hashRouter

const store = createStore(reducer);

ReactDOM.render(
  // <Provider store={store}>
  <Router history={browserHistory}>
    <Route path="frontEnd" component={App}>
      <IndexRoute component={Home} />
      <Route path="details/:categoryId" component={Details} />
    </Route>
  </Router>,
  // </Provider>,
  document.querySelector('#root')
);

