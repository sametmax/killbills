
import React from 'react';

import "./moneybooks.sass";
import "./icon-stats.png";
import "./icon-plus.png";
import "./icon-cash.png";

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
                    <Link className="btn btn-primary --money-book"
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
  
  truncateDescription(description, amount, maxSize, truncateSize=3){
    var balanceSize = amount.toString().length;
    if (description.length + balanceSize > maxSize){
      var maxNameSize = maxSize - balanceSize - truncateSize;
      description = description.slice(0, maxNameSize) + '...';
    }
    return description;
  }

  render() {

    var operations = [
      {
        groupName: 'jul 2017',
        type: 'operations',
        data: [
          {
            id: 1,
            date: '03/07',
            description: 'Salsa lessons',
            amount: -10,
            type: 'cash',
            tags: [
              'danse',
              'sport',
              'fun',
              'going out'
            ]
          },
          {
            id: 2,
            date: '02/07',
            description: 'Refund Joe',
            amount: -300,
            type: 'wire',
            tags: [
              'debt',
            ]
          },
          {
            id: 3,
            date: '01/07',
            description: '',
            amount: 3000,
            type: 'wire',
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
            date: '39/01',
            description: "Diner at Raja's",
            amount: -49.85,
            type: 'creditcard',
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
            date: '03/07',
            description: 'LLLLLLLLLLLLLLLLLLLLLLLLLLLLLL',
            amount: -100000000000.00,
            type: 'cash',
            tags: [
              'abcdkdjfuritkfig',
              'abcdkdjfuritkfi1',
              'abcdkdjfuritkfi2',
              'abcdkdjfuritkfi3'
            ]
          },
          {
            id: 6,
            date: '02/07',
            description: 'Refund Joe',
            amount: -300,
            type: 'wire',
            tags: [
              'debt',
            ]
          },
          {
            id: 7,
            date: '01/07',
            description: '',
            amount: 3000,
            type: 'wire',
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
            date: '39/01',
            description: "Diner at Raja's",
            amount: -49.85,
            type: 'creditcard',
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
            date: '03/07',
            description: 'Salsa lessons',
            amount: -10,
            type: 'cash',
            tags: [
              'danse',
              'sport',
              'fun',
              'going out'
            ]
          },
          {
            id: 10,
            date: '02/07',
            description: 'Refund Joe',
            amount: -300,
            type: 'wire',
            tags: [
              'debt',
            ]
          },
          {
            id: 11,
            date: '01/07',
            description: '',
            amount: 3000,
            type: 'wire',
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
            date: '39/01',
            description: "Diner at Raja's",
            amount: -49.85,
            type: 'creditcard',
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
            date: '03/07',
            description: 'Salsa lessons',
            amount: -10,
            type: 'cash',
            tags: [
              'danse',
              'sport',
              'fun',
              'going out'
            ]
          },
          {
            id: 14,
            date: '02/07',
            description: 'Refund Joe',
            amount: -300,
            type: 'wire',
            tags: [
              'debt',
            ]
          },
          {
            id: 15,
            date: '01/07',
            description: '',
            amount: 3000,
            type: 'wire',
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
            date: '39/01',
            description: "Diner at Raja's",
            amount: -49.85,
            type: 'creditcard',
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
    
    var name = this.truncateDescription(
      this.props.moneyBook.name,
      this.props.moneyBook.balance,
      26,
    ) 

    var counter = 0;

    var suffix = this.props.moneyBook.currency.suffix 

    return (
      <div id="app-viewport" className="moneybook mobile">
        <AppHeader>
          <h1>
            {name} &nbsp;&nbsp;
            <Amount value={this.props.moneyBook.balance}
                    currency={suffix}>
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
                        var description = this.truncateDescription(
                          operation.description,
                          operation.amount,
                          40,
                          5
                        )
                        var classes = "operation ";
                        classes += counter % 2 == 0 ? "even" : "odd";
                        var operationType;
                        switch (operation.type) {
                          case "creditcard":
                            console.log("card");
                            operationType = <span className="glyphicon glyphicon-credit-card"></span>
                            break;
                          case "cash":
                            operationType = <img src="/static/icon-cash.png"></img>
                            break;
                        }
                        var div = <div className={classes} key={operation.id}>
                          <div className="operation-data"> 
                            <span className="operation-date">{ operation.date }</span>
                            <span className="operation-description">{ description }</span>
                            <span className="operation-amount-type">
                             <span className="operation-amount">{ operation.amount } { suffix }</span>
                             <span className="operation-type">{ operationType }</span>
                            </span>
                          </div> 
                          <div className="operation-tags"> {
                              operation.tags.map((tag) => {
                                return <span key={tag}>{ tag }</span>
                            })
                          }
                          </div>
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
          <div>
            <button>
              <img src="/static/icon-plus.png" />
             {/* <img className="glyphicon glyphicon-plus"></span> */}
            </button>
          </div>
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
