import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import getRoutes from './routes';
import { Provider } from 'react-redux';
import DevTools from './containers/DevTools/DevTools';
import store from './redux/store';

const routes = (
  <Router history={browserHistory}>
    {getRoutes(store)}
  </Router>
);

ReactDOM.render(
  <Provider store={store} key="provider">
    <div>
      {routes}
      <DevTools />
    </div>
  </Provider>,
  document.getElementById('root')
);
