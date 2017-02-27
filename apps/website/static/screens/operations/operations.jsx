
import React from 'react';

import "./operations.sass";

import MoneyBookMenu from "../../components/money-book-menu/money_book_menu.jsx";
import AppHeader from "../../components/header/header.jsx";

var menu = document.getElementById('money-books-menu');

const Viewport = () => {
  return (

    <div id="app-viewport">

      <AppHeader title="Aucun livre de compte" />
      <div className="container" id="app-content">

          <p className="empty">
            Veuillez créer un livre de compte afin de tester Kill Bills
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
