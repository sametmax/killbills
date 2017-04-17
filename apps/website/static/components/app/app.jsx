import "./app.sass";

import React from 'react';

import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import OperationView from '../../screens/operations/operations.jsx'

import NewMoneyBookView from '../../screens/new_money_book/new_money_book.jsx'

var app = document.getElementById('app');

if (app) {
	render((
	  <Router history={browserHistory}>
	    <Route path="/operations" component={OperationView}/>
	    <Route path="/moneybooks/new" component={NewMoneyBookView}/>
	  </Router>
	), document.getElementById('app'))
}



