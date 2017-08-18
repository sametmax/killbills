import React from 'react';

import axios from 'axios';

import "./new_money_book.sass";

import AppHeader from "../../components/header/header.jsx";

import {moneyBooks} from "../../store/store.jsx"

import { Link } from 'react-router';

import {router, settings} from '../../base/base.jsx';


class MoneyInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      "displayedValue": "",
      "value": 0,
      "cursorPosition": 0,
      "error": "",
      "hasFocus": false
    };
  }

  updateInputCursor(){
    this.refs.input.setSelectionRange(
        this.state.cursorPosition,
        this.state.cursorPosition
    );
  }

  handleChange(e) {

    // create a function to stop this change in particular
    const cancel = (error) => {
      const previousSize = this.state.displayedValue.toString().length;
      const charCountDiff = previousSize - e.target.value.length;
      const cursorPosition = e.target.selectionStart + charCountDiff;
      this.setState({
        "cursorPosition": cursorPosition,
        "error": error
      }, this.updateInputCursor);
    }

    const newValue = e.target.value;


    // if the input is empty or contain only one char, set it to 0
    if (newValue === "" || /^[-.,]$/.test(newValue)){
      this.setState({
        "value": 0,
        "displayedValue": newValue,
        "cursorPosition": e.target.selectionStart,
      });
      return
    }

    // minus is only allowed at the begining
    if (/-/.test(newValue) && !/^-/.test(newValue)) {
      return cancel("'-' is only allowed at the beginning");
    }

    // allow only numbers
    if (!/^(-|[0-9,.])[0-9,.]*$/.test(newValue)) {
      return cancel("This field allows only numbers, '-', '.' and ','",);
    }

    // forbid non digits duplicate
    var match = newValue.match(/[,.]/g);
    if (match && match.length > 1) {
      return cancel("You can´t use '-', '.' and ',' twice",);
    }

    // forbid more than 2 decimals
    match = (/[,.]/g).test(newValue);
    if (match && !/[,.]\d{0,2}?$/g.test(newValue)) {
      return cancel("Two decimals max are allowed");
    }

    // forbid leading zeros
    if (/^-?0\d/.test(newValue)) {
      return cancel("The leading zero can only be followed by ',' or '.'");
    }

    var finalValue = parseFloat(newValue.replace(",", "."))

    // limit entry value to 12 digits
    if (finalValue > settings.maxMoneybookBalance || finalValue < -settings.maxMoneybookBalance) {
      // TODO: handle more for CFA and yen
      return cancel("Max balance is +/- 9999999.99");
    }

    // if we reach here, we are good to go
    this.setState({
      "displayedValue": newValue,
      "value": finalValue,
      "cursorPosition": e.target.selectionStart,
      "error": ""
    });

  }

  render() {
    var sign = "";
    if (this.state.value < 0) {
      sign = "negative";
    } else {
      sign = "positive";
    }

    var error = "";
    if (this.state.error) {
      error = (
        <p className="error">
          <i className="glyphicon glyphicon-warning-sign"></i>
          {this.state.error}
        </p>
      );
    }

    return (

      <div className="money-input">
        {error}
        <input
             ref="input"
             placeholder={this.props.placeholder}
             onChange={this.handleChange.bind(this)}
             value={this.state.displayedValue}
             className={"form-control " + sign}
             name="initial-amount"/>
      </div>
    );
  }

}


class NewMoneyBookView extends React.Component {

  constructor(props) {
    super(props);

    axios.get('/api/currencies/').then((response) => {
      this.setState({
        "currencies": response.data
      });

    });

    this.state = {
      "bookName": "",
      "currencies": [],
      "isSaving": false,
    };
  }

  componentWillMount() {
    if (moneyBooks.reachedBookLimit()) {
      router.props.history.push('/moneybooks/');
    }
  }

  setBookName() {
    this.setState({
        "bookName": this.refs.bookNameInput.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      "isSaving": true,
    });

    moneyBooks.createBook({
      "name": this.refs.bookNameInput.value,
      "currency": this.refs.currencyInput.value,
      "balance": this.refs.balanceInput.state.value,
    }).then((book) => {
      this.setState({
        "isSaving": false,
      });
      moneyBooks.switchBook(book.id);
    }).catch((error) => {
      console.error(error)
      this.setState({
        "isSaving": false,
      });
    });
  }

  render() {
    var currencies = this.state.currencies.map(function(currency){
      return (
        <option value={currency.code} key={currency.code}>
          {currency.name} - {currency.suffix}
        </option>
      );
    });

    return (
      <div id="app-viewport">

        <AppHeader classes="large">
          <h1>Add a new money book</h1>
        </AppHeader>
        <div className="container" id="app-content">

          <div id="new-money-book-form" className="row">
            <form onSubmit={this.handleSubmit.bind(this)} className="col-xs-12">

              <div className="form-group">
                <label htmlFor="name">Money book name</label>
                <input type="text"
                       ref="bookNameInput"
                       className="form-control"
                       name="book-name"
                       //TODO: display alert when limit is reached
                       maxLength="30"
                       required
                       onChange={this.setBookName.bind(this)}/>
              </div>

              <div className="form-group">
                <label htmlFor="currency">Money book currency</label>
                <select ref="currencyInput" className="form-control" name="currency">
                { currencies }
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="initial-amount">Money book inital balance</label>
                <MoneyInput ref="balanceInput" placeholder="It can be (-) negative"/>
              </div>

              <div className="form-group">
                <button
                  disabled={!this.state.bookName || this.state.isSaving}
                  className="btn btn-success"
                >
                  {
                    (this.state.isSaving)
                      ? <span><i className="glyphicon glyphicon-refresh glyphicon-refresh-animate"></i> SAVING</span>
                      : <span>OK</span>
                  }
                </button>
                <Link className="btn btn-default" to='/moneybooks/'>CANCEL</Link>
              </div>

            </form>

          </div>

        </div>

      </div>
    );
  }
}

export default NewMoneyBookView;
