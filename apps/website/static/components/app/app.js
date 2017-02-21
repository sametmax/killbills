import "./app.sass";

import React from 'react';

import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import OperationView from '../../screens/operations/operations.js'

import NewMoneyBookView from '../../screens/new_money_book/new_money_book.js'


render((
  <Router history={hashHistory}>
    <Route path="/operations" component={OperationView}/>
    <Route path="/moneybooks/new" component={NewMoneyBookView}/>
  </Router>
), document.getElementById('app'))


