
import React from 'react';

import './header.sass';

import {eventBus} from '../../base/base.jsx';

class AppHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {'showMenuButton': false};
  }


  openSideBar() {
    eventBus.trigger('OPEN SIDEBAR');
    this.setState({'showMenuButton': false});
  }

  componentWillMount() {
    eventBus.on('SIDEBAR UNDOCKED',  () => {
      this.setState({'showMenuButton': true});
    });

    eventBus.on('SIDEBAR CLOSED',  () => {
      this.setState({'showMenuButton': true});
    });


    eventBus.on('SIDEBAR DOCKED', () => {
      this.setState({'showMenuButton': false});
    })
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
}



export default AppHeader;
