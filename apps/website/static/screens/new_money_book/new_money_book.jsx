import React from 'react';

import "./new_money_book.sass";

import AppHeader from "../../components/header/header.jsx";


const MoneyInput = React.createClass({
  getInitialState: function() {
    return {
      "displayedValue": "",
      "value": 0,
      "cursorPosition": 0,
      "error": ""
    };
  },

  componentDidUpdate: function () {
    this.refs.input.selectionStart = this.state.cursorPosition;
    this.refs.input.selectionEnd = this.state.cursorPosition;
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
      });
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
      return cancel("'-' est seulement autorisé au début");
    }

    // allow only numbers
    if (!/^(-|[0-9,.])[0-9,.]*$/.test(newValue)) {
      return cancel("Ce champ n´accepte que les nombres, '-', '.' et ','",);
    }

    // forbid non digits duplicate
    var match = newValue.match(/[,.]/g);
    if (match && match.length > 1) {
      return cancel("Vous ne pouvez pas utiliser '-', '.' et ',' deux fois",);
    }

    // forbid more than 2 decimals
    match = (/[,.]/g).test(newValue);
    if (match && !/[,.]\d{0,2}?$/g.test(newValue)) {
      return cancel("Seules deux décimales sont autorisées");
    }

    // forbid leading zeros
    if (/^-?0\d/.test(newValue)) {
      return cancel("Ce zéro ne peut-être suivi que de ',' ou '.'");
    }

    var finalValue = parseFloat(newValue.replace(",", "."))

    // limit entry value to 12 digits
    if (finalValue > 999999999999 || finalValue < -999999999999) {
      return cancel("Seuls 12 chiffres maximum sont autorisés");
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
             type="text" 
             pattern="[0-9-,.]*" 
             placeholder={this.props.placeholder} 
             onChange={this.handleChange}
             inputMode="numeric" 
             value={this.state.displayedValue}
             className={"form-control " + sign}
             name="initial-amount"/>
      </div>
    );
  }
});


const NewMoneyBookView = React.createClass({
  getInitialState: function() {
    return {
      "bookName": "",
    };
  },

  setBookName: function() {
    this.setState({
        "bookName": this.refs.bookNameInput.value,
    });
  },
 
  render: function() {

    return (
      <div id="app-viewport">

        <AppHeader title="Ajouter un nouveau livre de compte" />
        <div className="container" id="app-content">

          <div className="row">
            <form className="col-xs-12">

              <div className="form-group">
                <label htmlFor="name">Nom du livre de compte</label>
                <input type="text" 
                       ref="bookNameInput"
                       className="form-control" 
                       name="book-name"
                       onChange={this.setBookName}/>
              </div>

              <div className="form-group">
                <label htmlFor="currency">Devise du livre de compte</label>
                <select className="form-control" name="currency">
                      <option value="EUR">Euros - €</option>
                      <option value="USD">Dollars - $</option>
                </select> 
              </div>

              <div className="form-group">
                <label htmlFor="initial-amount">Solde initial du livre de compte</label>
                <MoneyInput placeholder="Il peut être (-) négatif"/>
              </div>

              <div className="form-group">
                <button disabled={!this.state.bookName} className="btn btn-success">OK</button> <button className="btn btn-default">ANNULER</button>
              </div>
    
            </form>

          </div>

        </div>

      </div>
    );
 }
});

export default NewMoneyBookView;
