
import React from 'react';

import './header.sass';

import {eventBus} from '../../base/base.jsx';

import {store} from "../../store/store.jsx"

class AppHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {'showMenuButton': false};
  }

  openSideBar() {
    eventBus.trigger('OPEN SIDEBAR');
    this.setState({'showMenuButton': false});
    store.data.showMenuButton = false;
  }

  componentWillMount() {
    if (!this.props.neverShowMenuButton){
      this.setState({'showMenuButton': store.data.showMenuButton});
      eventBus.on('SIDEBAR UNDOCKED',  () => {
        this.setState({'showMenuButton': true});
        store.data.showMenuButton = true;
      });

      eventBus.on('SIDEBAR CLOSED',  () => {
        this.setState({'showMenuButton': true});
        store.data.showMenuButton = true;
      });


      eventBus.on('SIDEBAR DOCKED', () => {
        this.setState({'showMenuButton': false});
        store.data.showMenuButton = false;
      })
    }
  }

  componentWillUnmount() {
    eventBus.removeEvent('SIDEBAR UNDOCKED');
    eventBus.removeEvent('SIDEBAR DOCKED');
    eventBus.removeEvent('SIDEBAR CLOSED');
  }

  render(){
    var buttonClass = "btn btn-default";
    if (!this.state.showMenuButton){
      buttonClass += " hide";
    }

    var headerClass = "fluid-container navbar navbar-default ";
    headerClass += this.props.classes;

    return (
          <header id="app-header"
                  className={headerClass}>
              <div>
                <button className={buttonClass}
                        onClick={this.openSideBar.bind(this)}>
                  <span className="glyphicon glyphicon-menu-hamburger"></span>
                </button>
              </div>

              {this.props.children}
          </header>
      )
  }
}



export default AppHeader;
