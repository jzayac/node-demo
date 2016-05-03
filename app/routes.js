import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  App,
  Main,
  Todo,
  NotFound } from './containers';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Main} />
    <Route path="todo" component={Todo} />
    <Route path="*" component={NotFound} status={404} />
  </Route>
);
