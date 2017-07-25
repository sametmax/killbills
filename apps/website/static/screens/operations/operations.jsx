
import React from 'react';

import "./operations.sass";

import MoneyBookMenu from "../../components/money-book-menu/money_book_menu.jsx";
import AppHeader from "../../components/header/header.jsx";

import { Link } from 'react-router'
import {moneyBooks} from "../../store/store.jsx"

var menu = document.getElementById('money-books-menu');


class DetectBookView extends React.Component {

  componentWillMount(){
    if (moneyBooks.hasBooks()) {
      moneyBooks.switchBook(moneyBooks.lastUsedBook);
    }
  }

  render(){  
    var noBook = (
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
    
    return <MoneyBookMenu children={noBook}/>;
  };

}

class MoneyBookOperationsView extends React.Component {

  render() {

    // TODO handle 404
    var book = moneyBooks.books[this.props.routeParams.id];

    if (!book){
      moneyBooks.switchBook(moneyBooks.lastUsedBook);
    }

    var content = (
        <div id="app-viewport">
          <AppHeader title={book.name} />
          <div className="container" id="app-content">
              OPERATION BITCH !
          </div>
        </div>
    );
    
    return <MoneyBookMenu children={content}/>;
  }
}


export {DetectBookView, MoneyBookOperationsView};
