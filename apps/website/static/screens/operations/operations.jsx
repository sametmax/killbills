
import React from 'react';

import "./operations.sass";

import MoneyBookMenu from "../../components/money-book-menu/money_book_menu.jsx";
import AppHeader from "../../components/header/header.jsx";

import { Link } from 'react-router'

var menu = document.getElementById('money-books-menu');

const Viewport = () => {
  return (

    <div id="app-viewport">

      <AppHeader title="No money book" />
      <div className="container" id="app-content">

          <div className="empty">
              <p>Create a money book in order to test Kill Bills:</p>

              <p>
                <Link className="btn btn-primary new-money-book"
                      to="/moneybooks/new">
                    <span className="pull-right">
                      <span className="glyphicon glyphicon-plus-sign">
                      </span>
                    </span>
                    Create a money book
                </Link>
              </p>
          </div>

      </div>

    </div>
   );
};

const OperationView = () => {
  return (
    <MoneyBookMenu children={Viewport()}/>
  );
};

export default OperationView;
