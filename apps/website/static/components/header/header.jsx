
import React from 'react';

import './header.sass';

import eventBus from '../../base/base.jsx'

var AppHeader = React.createClass({

  getInitialState() {
    return {'showMenuButton': false};
  },

  openSideBar: function() {
    eventBus.trigger('OPEN SIDEBAR');
    this.setState({'showMenuButton': false});
  },

  componentWillMount: function() {
    eventBus.on('SIDEBAR UNDOCKED',  () => {
      this.setState({'showMenuButton': true});
    });

    eventBus.on('SIDEBAR CLOSED',  () => {
      this.setState({'showMenuButton': true});
    });


    eventBus.on('SIDEBAR DOCKED', () => {
      this.setState({'showMenuButton': false});
    })
  },

  componentWillUnmount: function() {
    eventBus.removeEvent('SIDEBAR UNDOCKED');
    eventBus.removeEvent('SIDEBAR DOCKED');
  },

  render: function(){

    var buttonClass = "btn btn-default";
    if (!this.state.showMenuButton){
      buttonClass += " hide";
    }

    return (
          <header id="app-header"
                  className="fluid-container navbar navbar-default">
              <div>
                <button className={buttonClass}
                        onClick={this.openSideBar}>
                  <span className="glyphicon glyphicon-menu-hamburger"></span>
                </button>
              </div>

              <h1>{this.props.title}</h1>
          </header>
      )
  }
});



export default AppHeader;
