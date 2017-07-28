
import React from 'react';

import "./moneybooks.sass";
import "./icon-stats.png";

import MoneyBookMenu from "../../components/money-book-menu/money_book_menu.jsx";
import AppHeader from "../../components/header/header.jsx";
import {moneyBooks} from "../../store/store.jsx"
import {router, eventBus} from '../../base/base.jsx';
import {Amount} from '../../components/number/amount.jsx';

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
        <div id="app-viewport" className="no-money-book">
          <AppHeader className="large">
            <h1>No money book</h1>
          </AppHeader>
          <div  id="app-content">
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
      <div id="app-viewport" className="moneybook mobile">
        <AppHeader>
          <h1>{this.props.moneyBook.name}</h1>
        </AppHeader>
        <div  id="app-content">
            DESKTOP OPERATION BITCH !
        </div>
      </div>
    );
  }
}

class MobileMoneyBookOperationView extends React.Component  {


  render() {

    var operations = [
      {
        groupName: 'jul 2017',
        type: 'operations',
        data: [
          {
            id: 1,
            date: '03/07/17',
            description: 'Salsa lessons',
            amount: -10,
            mode: 'cash',
            tags: [
              'danse',
              'sport',
              'fun',
              'going out'
            ]
          },
          {
            id: 2,
            date: '02/07/17',
            description: 'Refund Joe',
            amount: -300,
            mode: 'wire',
            tags: [
              'debt',
            ]
          },
          {
            id: 3,
            date: '01/07/17',
            description: '',
            amount: 3000,
            mode: 'wire',
            tags: [
              'pay',
            ]
          }
        ]
      },
      {
        groupName: 'jan 2017 - juil 2017',
        type: 'empty'
      },
      {
        groupName: 'jan 2017',
        type: 'operations',
        data: [
          {
            id: 4,
            date: '39/01/17',
            description: "Diner at Raja's",
            amount: -49.85,
            mode: 'creditcard',
            tags: [
              'resto',
              'food',
              'fun',
              'going out'
            ]
          },
        ]
      },
      {
        groupName: 'jul 16',
        type: 'operations',
        data: [
          {
            id: 5,
            date: '03/07/16',
            description: 'Salsa lessons',
            amount: -10,
            mode: 'cash',
            tags: [
              'danse',
              'sport',
              'fun',
              'going out'
            ]
          },
          {
            id: 6,
            date: '02/07/16',
            description: 'Refund Joe',
            amount: -300,
            mode: 'wire',
            tags: [
              'debt',
            ]
          },
          {
            id: 7,
            date: '01/07/16',
            description: '',
            amount: 3000,
            mode: 'wire',
            tags: [
              'pay',
            ]
          }
        ]
      },

      {
        groupName: 'jan 2016',
        type: 'operations',
        data: [
          {
            id: 8,
            date: '39/01/17',
            description: "Diner at Raja's",
            amount: -49.85,
            mode: 'creditcard',
            tags: [
              'resto',
              'food',
              'fun',
              'going out'
            ]
          },
        ]
      },
      {
        groupName: 'jul 2015',
        type: 'operations',
        data: [
          {
            id: 9,
            date: '03/07/15',
            description: 'Salsa lessons',
            amount: -10,
            mode: 'cash',
            tags: [
              'danse',
              'sport',
              'fun',
              'going out'
            ]
          },
          {
            id: 10,
            date: '02/07/15',
            description: 'Refund Joe',
            amount: -300,
            mode: 'wire',
            tags: [
              'debt',
            ]
          },
          {
            id: 11,
            date: '01/07/15',
            description: '',
            amount: 3000,
            mode: 'wire',
            tags: [
              'pay',
            ]
          }
        ]
      },
      {
        groupName: 'jan 2015',
        type: 'operations',
        data: [
          {
            id: 12,
            date: '39/01/15',
            description: "Diner at Raja's",
            amount: -49.85,
            mode: 'creditcard',
            tags: [
              'resto',
              'food',
              'fun',
              'going out'
            ]
          },
        ]
      },
      {
        groupName: 'jul 2014',
        type: 'operations',
        data: [
          {
            id: 13,
            date: '03/07/14',
            description: 'Salsa lessons',
            amount: -10,
            mode: 'cash',
            tags: [
              'danse',
              'sport',
              'fun',
              'going out'
            ]
          },
          {
            id: 14,
            date: '02/07/14',
            description: 'Refund Joe',
            amount: -300,
            mode: 'wire',
            tags: [
              'debt',
            ]
          },
          {
            id: 15,
            date: '01/07/14',
            description: '',
            amount: 3000,
            mode: 'wire',
            tags: [
              'pay',
            ]
          }
        ]
      },
      {
        groupName: 'jan 2014',
        type: 'operations',
        data: [
          {
            id: 16,
            date: '39/01/14',
            description: "Diner at Raja's",
            amount: -49.85,
            mode: 'creditcard',
            tags: [
              'resto',
              'food',
              'fun',
              'going out'
            ]
          },
        ]
      },
    ];


    // limit the size of the name if it's too big
    var maxWidth = 26; // current design break with more
    var name = this.props.moneyBook.name;
    var balance = this.props.moneyBook.balance;
    var balanceSize = balance.toString().length;
    if (name.length + balanceSize > maxWidth){
      var maxNameSize = 26 - balanceSize - 3;
      name = name.slice(0, maxNameSize) + '...';
    }

    var counter = 0;

    return (
      <div id="app-viewport" className="moneybook mobile">
        <AppHeader>
          <h1>
            {name} &nbsp;&nbsp;
            <Amount value={balance}
                    currency={this.props.moneyBook.currency.suffix}>
            </Amount>
          </h1>
          <div className="date">
            <button>
              <img src="/static/icon-stats.png" />
            </button>
          </div>
        </AppHeader>
        <div  id="app-content">
            {
              operations.map((group) => {
                if (group.type == "empty"){
                  return <div className="emptyGroup" key={group.groupName}>
                    <div className="group-name">
                      <span>{ group.groupName }</span>
                    </div>
                    <div className="group-content"> No operations during this period </div>
                  </div>
                } else {
                  return <div className="operation-group" key={group.groupName}>
                    <div className="group-name">
                      <span>{ group.groupName }</span>
                    </div>
                    <div className="group-content">
                    {
                      group.data.map((operation) => {
                        var classes = "operation ";
                        classes += counter % 2 == 0 ? "even" : "odd";
                        var div = <div className={classes} key={operation.id}>
                          { operation.description }
                        </div>
                        counter += 1;
                        return div;
                      })
                    }
                    </div>
                  </div>
                }
              })
            }
        </div>
        <footer>
        </footer>
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
    this.routeToMoneyBook(this.props);
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged.bind(this));
  }

  mediaQueryChanged() {
    this.setState({isDesktop: this.state.mql.matches});
  }

  componentWillReceiveProps(nextProps){
    this.routeToMoneyBook(nextProps);
  }

  routeToMoneyBook(props){
    var book = moneyBooks.getLastRelevantBook(props.routeParams.id);
    if (!book){
      router.props.history.push('/moneybooks/');
    } else {
      eventBus.trigger('CLOSE SIDEBAR');
      moneyBooks.switchBook(book.id, props.routeParams.id === book.id);
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
