import "./app.sass";

import React from 'react';

import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from "react-redux";

import OperationView from '../../screens/operations/operations.jsx';

import NewMoneyBookView from '../../screens/new_money_book/new_money_book.jsx';
import store from '../../store/moneybook.jsx';

var app = document.getElementById('app');

if (app) {
  render((
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/operations" component={OperationView}/>
        <Route path="/moneybooks/new" component={NewMoneyBookView}/>
      </Router>
    </Provider>
  ), document.getElementById('app'))
}



