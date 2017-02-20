
import React from 'react';
import Sidebar from 'react-sidebar';

import "./create-1st-book.svg";
import "./money_book_menu.sass";

import eventBus from '../../base/base.js'


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
                Livres de comptes
              </h2>
            </header>

              <div className="money-books">
                <ul>
                  <li className="new-book">
                    <a className="btn btn-primary" href="#">
                      <span className="pull-right">
                        <span className="glyphicon glyphicon-plus-sign">
                        </span>
                      </span>
                      Creer un livre de compte
                    </a>
                  </li>
                </ul>

                <p>
                  <img src="/static/create-1st-book.svg"
                      alt="Ajoutez votre premier livre de compte pour créer KillBills" />
                </p>
              </div>

              <footer>

                <p className="anonymous-tip">Vous êtes anonymes, connectez-vous pour ne pas perdre vos données</p>

                <ul className="options">
                  <li><a className="btn btn-default" href="#">S'identifier</a></li>
                  <li><a className="btn btn-default" href="#">Paramètres</a></li>
                  <li><a className="btn btn-default" href="#">Contactez-nous</a></li>
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


