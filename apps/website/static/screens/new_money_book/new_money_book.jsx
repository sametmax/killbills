import React from 'react';

import axios from 'axios';

import {browserHistory} from 'react-router';

import "./new_money_book.sass";

import AppHeader from "../../components/header/header.jsx";

import {moneyBooks} from "../../store/store.jsx"


const MoneyInput = React.createClass({
  getInitialState: function() {
    return {
      "displayedValue": "",
      "value": 0,
      "cursorPosition": 0,
      "error": "",
      "hasFocus": false
    };
  },

  updateInputCursor: function(){
    this.refs.input.setSelectionRange(
        this.state.cursorPosition,
        this.state.cursorPosition
    );
  },

  handleChange: function(e) {

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
    if (finalValue > 999999999999 || finalValue < -999999999999) {
      return cancel("12 digits max are allowed");
    }

    // if we reach here, we are good to go
    this.setState({
      "displayedValue": newValue,
      "value": finalValue,
      "cursorPosition": e.target.selectionStart,
      "error": ""
    });

  },
  render: function() {
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
             onChange={this.handleChange}
             value={this.state.displayedValue}
             className={"form-control " + sign}
             name="initial-amount"/>
      </div>
    );
  }
});


const NewMoneyBookView = React.createClass({
  getInitialState: function() {
    axios.get('/api/currencies/').then((response) => {
      this.setState({
        "currencies": response.data
      });

    });

    return {
      "bookName": "",
      "currencies": [],
      "isSaving": false,
    };
  },

  setBookName: function() {
    this.setState({
        "bookName": this.refs.bookNameInput.value,
    });
  },

  handleSubmit: function(e) {
    e.preventDefault();
    this.setState({
      "isSaving": true,
    });

    moneyBooks.createBook({
      "name": this.refs.bookNameInput.value,
      "currency": this.refs.currencyInput.value,
      "balance": this.refs.balanceInput.state.value,
    }).then((response) => {
      this.setState({
        "isSaving": false,
      });
      this.props.router.push('/operations/');
    }).catch((error) => {
      console.log(error)
      this.setState({
        "isSaving": false,
      });
    });
  },

  render: function() {
    var currencies = this.state.currencies.map(function(currency){
      return (
        <option value={currency.code} key={currency.code}>
          {currency.name} - {currency.suffix}
        </option>
      );
    });

    return (
      <div id="app-viewport">

        <AppHeader title="Add a new money book" />
        <div className="container" id="app-content">

          <div id="new-money-book-form" className="row">
            <form onSubmit={this.handleSubmit} className="col-xs-12">

              <div className="form-group">
                <label htmlFor="name">Money book name</label>
                <input type="text"
                       ref="bookNameInput"
                       className="form-control"
                       name="book-name"
                       //TODO: display alert when limit is reached
                       maxLength="32"
                       required
                       onChange={this.setBookName}/>
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
                <a className="btn btn-default" href='/operations/'>CANCEL</a>
              </div>

            </form>

          </div>

        </div>

      </div>
    );
 }
});

export default NewMoneyBookView;
