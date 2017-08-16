
import React from 'react';

import {Calculator} from '../../components/calculator/calculator.jsx'
import AppHeader from "../../components/header/header.jsx";
import '../../components/calculator/calculator.sass'
import './new_operation.sass'
import './medium-icon-bank-check.png'
import './medium-icon-cash.png'
import {moneyBooks} from "../../store/store.jsx"

import {router, settings} from '../../base/base.jsx'


class NewOperationView extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      moneyBook: undefined
    }
  }

  componentWillReceiveProps(nextProps){
    this.routeToMoneyBook(nextProps);
  }

  componentWillMount(){
    this.routeToMoneyBook(this.props);
  }

  routeToMoneyBook(props){
    var book = moneyBooks.getLastRelevantBook(props.routeParams.id);
    if (!book){
      router.props.history.push('/moneybooks/');
    } else {
      moneyBooks.switchBook(book.id, props.routeParams.id === book.id);
    }
    this.setState({moneyBook: book});
  }

  onCancel(){
    // TODO: What if there is no back ?
    router.props.history.goBack()
  }


  render(){
    var maxOperationAmount = settings.maxMoneybookBalanc-Math.abs(this.state.moneyBook.balance);

    return <div id="new-operation">

      <AppHeader classes="large" neverShowMenuButton={true}>
        <h1>{this.state.moneyBook.name}</h1>
      </AppHeader>

      <Calculator maxAmount={maxOperationAmount} currency={this.state.moneyBook.currency}/>

      <div className="btn-group operation-type" role="group" aria-label="...">

        <button type="button" className="btn btn-default">
          <img src="/static/medium-icon-bank-check.png"></img>
        </button>

        <button type="button" className="btn btn-default">
          <img src="/static/medium-icon-cash.png"></img>
        </button>

        <button type="button" className="btn btn-default">
          <span className="glyphicon glyphicon-credit-card"></span>
        </button>

        <button type="button" className="btn btn-default">
          <span className="glyphicon glyphicon-transfer"></span>
        </button>
      </div>

      <div className="validation">
        <button className="btn btn-success" >OK</button>
        <button className="btn btn-default"
                onClick={this.onCancel.bind(this)}>
          CANCEL
        </button>
      </div>
    </div>;
  }

}


export {NewOperationView}
