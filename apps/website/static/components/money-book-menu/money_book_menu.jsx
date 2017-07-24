
import React from 'react';
import Sidebar from 'react-sidebar';
import { Link } from 'react-router';

import "./create-1st-book.en.svg";
import "./money_book_menu.sass";

import eventBus from '../../base/base.jsx';

import {moneyBooks} from "../../store/store.jsx"
import {Amount} from '../number/amount.jsx'



var MoneyBookList = React.createClass({

  getInitialState: function(){
    moneyBooks.on.change(()=> {
      this.stale = true;
    })
    moneyBooks.loadMoneyBooks();
    return {
      moneyBooks: moneyBooks,
      modifiedMoneyBooks: {}
    }
  },

  onMoneyBookUpdate: function() {
      this.stale = false;
      this.forceUpdate();
  },

  componentDidMount: function(){
    moneyBooks.on.change(this.onMoneyBookUpdate);
    if (this.stale){
      this.onMoneyBookUpdate()
    }
  },

  componentWillUnmount: function(){
    moneyBooks.off.change(this.onMoneyBookUpdate);
  },

  removeMoneyBook: function(moneyBook){
    if (confirm('Are you sure?')){
      this.state.moneyBooks.deleteBook(moneyBook);
    }
  },

  onMoneyBookNameUpdate: function(moneyBook, event){
    this.state.modifiedMoneyBooks[moneyBook.id] = event.target.value;
  },

  applyNameModifications: function(){
    Object.keys(this.state.modifiedMoneyBooks).forEach((moneyBookId) => {
      var updatedMoneyBookName = this.state.modifiedMoneyBooks[moneyBookId];
      this.state.moneyBooks.partialUpdateBook({id: moneyBookId, name: updatedMoneyBookName});
    });
  },

  render: function(){

    var books = this.state.moneyBooks.books;

    var moneyBookLinks = Object.keys(books).map((key) => {

        var moneybook = books[key];

        if (this.props.isModifying){
          return (
            <li className="moneybook" key={moneybook.id}>
              <span className="btn btn-default " >
                <span className="moneybook-balance pull-right">
                { moneybook.balance } { moneybook.currency.suffix }
                </span>
                <span>
                  <button className="glyphicon glyphicon-trash" onClick={() => this.removeMoneyBook(moneybook)}>
                  </button>
                  <span className="moneybook-name">
                    <input type="text"
                           defaultValue={ moneybook.name }
                           maxLength="32"
                           onChange={(evt) => this.onMoneyBookNameUpdate(moneybook, evt)}
                    />
                  </span>
                </span>

              </span>
            </li>
          )
        } else {
          return (
            <li key={moneybook.id}>
              <Link className="btn btn-default moneybook" to="#">
                <span className="pull-left moneybook-name">
                { moneybook.name }
                </span>
                <span className="pull-right moneybook-balance">
                  <Amount value={moneybook.balance}
                          currency={moneybook.currency.suffix}>
                  </Amount>
                </span>
             </Link>
           </li>
          )
        }

    });

    return (
      <div className="money-books">
      <ul>
        { moneyBookLinks }
        <li className="new-book">
          <Link className="btn btn-primary" to="/moneybooks/new">
            <span className="pull-right">
              <span className="glyphicon glyphicon-plus-sign">
              </span>
            </span>
            Create a money book
          </Link>
        </li>
      </ul>
      {
         (Object.keys(books).length > 0)
          ? ""
          : <p>
            {}
             <img src="/static/create-1st-book.en.svg"
                alt="Add your first money book in order to test KillBills" />
          </p>
      }
    </div>
    )
  }
});


var MoneyBookMenu = React.createClass({
  getInitialState() {
    return {
      sidebarDocked: false,
      sideBarOpen: false,
      isModifying: false,
    };
  },

  componentWillMount: function() {
    // Dock on laptops with decent res
    // We don't dock on small laptop to avoid overlap with content
    // and sidebar
    var mql = window.matchMedia(`(min-width: 1360px)`);
    mql.addListener(this.mediaQueryChanged);
    this.setState({mql: mql, sidebarDocked: mql.matches});
  },

  componentDidMount: function() {
    eventBus.on('OPEN SIDEBAR', () => {
      this.setState({
        mql: this.state.mql,
        sidebarDocked: this.state.mql.matches,
        sidebarOpen: true
      });
    });

    if (this.state.mql.matches){
      eventBus.trigger('SIDEBAR DOCKED');
    } else {
      eventBus.trigger('SIDEBAR UNDOCKED');
    }
  },

  componentWillUnmount: function() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  },

  closeSidebar: function(){
      this.setState({
        mql: this.state.mql,
        sidebarDocked: false,
        sidebarOpen: false,

      });

      eventBus.trigger('SIDEBAR CLOSED');
  },

  mediaQueryChanged: function() {
    if (this.state.mql.matches){
      eventBus.trigger('SIDEBAR DOCKED');
    } else {
      eventBus.trigger('SIDEBAR UNDOCKED');
    }
    this.setState({sidebarDocked: this.state.mql.matches});
  },

  handleModify: function(){
    if (this.state.isModifying){
      this.refs.moneyBookList.applyNameModifications();
    }
    this.setState({isModifying: !this.state.isModifying});
  },


  render: function() {

      var sidebarContent = (
        <div id="money-books-menu">
          <nav>
            <header>
              <div>
                <button className="btn btn-default"
                        onClick={this.closeSidebar}>
                  <span className="glyphicon glyphicon-menu-left"></span>
                </button>
              </div>
              <h2>
                Money books
              </h2>
              <div>
                <button className="btn btn-link" onClick={this.handleModify}>
                  { this.state.isModifying ? "OK" : "Modify"}
                </button>
              </div>
            </header>

            <MoneyBookList isModifying={this.state.isModifying} ref="moneyBookList"></MoneyBookList>

              <footer>

                <p className="anonymous-tip">You are anonymous. <br/> Log in to avoid losing your data!</p>

                <ul className="options">
                  <li><a className="btn btn-default" href="#">Log in</a></li>
                  <li><a className="btn btn-default" href="#">Settings</a></li>
                  <li><a className="btn btn-default" href="#">Contact-us</a></li>
                </ul>

              </footer>
          </nav>
        </div>
      );

    return (
      <Sidebar sidebar={sidebarContent}
                open={this.state.sidebarOpen}
                docked={this.state.sidebarDocked}
                onSetOpen={this.onSetSidebarOpen}
                children={this.props.children}
                contentClassName="react-sidebar-wrapper">
      </Sidebar>
    );

  }
});

export default MoneyBookMenu;


