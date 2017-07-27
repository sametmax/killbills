
import "./base.sass";

import EventEmitter from 'wolfy87-eventemitter';

import React from 'react';

import { Router, Route, browserHistory } from 'react-router';

import { DetectBookView, MoneyBookOperationsView } from '../screens/moneybooks/moneybooks.jsx';

import NewMoneyBookView from '../screens/new_money_book/new_money_book.jsx';

var eventBus = new EventEmitter()


var router = (
    <Router history={browserHistory}>
    <Route path="/moneybooks/new" component={NewMoneyBookView}/>
    <Route path="/moneybooks/:id" component={MoneyBookOperationsView}/>
    <Route path="/moneybooks/" component={DetectBookView}/>
    </Router>
);

export {eventBus, router};