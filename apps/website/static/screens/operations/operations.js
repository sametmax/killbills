
import React from 'react';

import { render } from 'react-dom'

import { Router, Route, hashHistory } from 'react-router'

import "./operations.sass";

import MoneyBookMenu from "../../components/money-book-menu/money_book_menu.js";
import AppHeader from "../../components/header/header.js";

var menu = document.getElementById('money-books-menu');


const MainView = () => {
  return (

    <div id="app-viewport">

      <AppHeader title="Aucun livre de compte" />
      <div className="container" id="app-content">

          <p className="empty">
            Veuillez créer un livre de compte afin de tester Kill Bills
          </p>

      </div>

    </div>
   )
}


const App = () => {
  return (
    <MoneyBookMenu children={MainView()}/>
  );
};

render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
  </Router>
), document.getElementById('app'))

