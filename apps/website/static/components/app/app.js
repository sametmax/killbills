import "./app.sass";

import React from 'react';

import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import OperationView from '../../screens/operations/operations.js'

render((
  <Router history={hashHistory}>
    <Route path="/operations" component={OperationView}/>
  </Router>
), document.getElementById('app'))


