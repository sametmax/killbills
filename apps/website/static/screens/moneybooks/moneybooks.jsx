
import React from 'react';

import "./moneybooks.sass";

import MoneyBookMenu from "../../components/money-book-menu/money_book_menu.jsx";
import AppHeader from "../../components/header/header.jsx";
import {moneyBooks} from "../../store/store.jsx"
import {router} from '../../base/base.jsx';

import { Link } from 'react-router'

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

class DesktopMoneyBookOperationView extends React.Component  {

  render() {
    return (
      <div id="app-viewport">
        <AppHeader title={this.props.moneyBook.name} />
        <div className="container" id="app-content">
            DESKTOP OPERATION BITCH !
        </div>
      </div>
    );
  }
}

class MobileMoneyBookOperationView extends React.Component  { 

  render() {
    return (
      <div id="app-viewport">
        <AppHeader title={this.props.moneyBook.name} />
        <div className="container" id="app-content">
            MOBILE OPERATION BITCH !
        </div>
      </div>
    );
  }
}

class MoneyBookOperationsView extends React.Component {

  constructor(props) {
    super(props);
    var mql = window.matchMedia(`(min-width: 1025px)`);
    this.state = {
      mql: mql,
      isDesktop: mql.matches,
      book: moneyBooks.getLastRelevantBook(this.props.routeParams.id)
    };
  }

  componentWillMount() {
    this.state.mql.addListener(this.mediaQueryChanged.bind(this));
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged.bind(this));
  }

  mediaQueryChanged() {
    this.setState({isDesktop: this.state.mql.matches});
  }

  componentWillReceiveProps(nextProps){
   // TODO handle 404
    var book = moneyBooks.getLastRelevantBook(nextProps.routeParams.id);
    if (!book){
      router.props.history.push('/moneybooks/');
    } else {
      moneyBooks.switchBook(book.id, nextProps.routeParams.id === book.id);
    }
    this.setState({book: book});

  }

  render() {
    var content;
    if(this.state.isDesktop) {
      content = <DesktopMoneyBookOperationView moneyBook={this.state.book}/>;
      return <MoneyBookMenu children={content}/>;
    }
    content = <MobileMoneyBookOperationView moneyBook={this.state.book}/>;
    return <MoneyBookMenu children={content}/>;
  }
}


export {DetectBookView, MoneyBookOperationsView};
