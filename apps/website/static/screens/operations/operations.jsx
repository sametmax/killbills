
import React from 'react';

import "./operations.sass";

import MoneyBookMenu from "../../components/money-book-menu/money_book_menu.jsx";
import AppHeader from "../../components/header/header.jsx";

var menu = document.getElementById('money-books-menu');

const Viewport = () => {
  return (

    <div id="app-viewport">

      <AppHeader title="No money book" />
      <div className="container" id="app-content">

          <p className="empty">
            Create a money book in order to test Kill Bills
          </p>

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
