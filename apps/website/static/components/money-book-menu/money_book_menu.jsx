
import React from 'react';
import Sidebar from 'react-sidebar';
import { Link } from 'react-router';

import "./create-1st-book.en.svg";
import "./money_book_menu.sass";

import eventBus from '../../base/base.jsx'
import store from '../../store/moneybook.jsx'

var MoneyBookList = React.createClass({
  render: function(){

    var moneyBookLinks = store.getState().get("moneyBooks").map((moneybook) => (
          <Link className="btn btn-default" to="#" key={moneybook.id}>
            <span className="pull-left">
            { moneybook.name }
            </span>
            <span className="pull-right">
            { moneybook.current_balance } { moneybook.currency.suffix }
            </span>
          </Link>
    ));

    return (
      <div className="money-books">
      <ul>
        <li>
          { moneyBookLinks }
        </li>
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
      <p>
        <img src="/static/create-1st-book.en.svg"
            alt="Add your first money book in order to test KillBills" />
      </p>
    </div>
    )
  }
});

var MoneyBookMenu = React.createClass({
  getInitialState() {
    return {sidebarDocked: false, sideBarOpen: false};
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
        sidebarOpen: false
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
            </header>

            <MoneyBookList></MoneyBookList>

              <footer>

                <p className="anonymous-tip">You are anonymous. <br/> Log in to avoid losing your data!</p>

                <ul className="options">
                  <li><a className="btn btn-default" href="#">Log in</a></li>
                  <li><a className="btn btn-default" href="#">Settings</a></li>
                  <li><a className="btn btn-default" href="#">Contac-us</a></li>
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


