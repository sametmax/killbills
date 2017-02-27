import React from 'react';

import "./new_money_book.sass";

import AppHeader from "../../components/header/header.jsx";


const MoneyInput = React.createClass({
  getInitialState: function() {
    return {"value": 0};
  },
  handleChange: function(e) {

    // build the value as it would be after the input
    const oldValue = e.target.value;
    const newValue = [
        oldValue.slice(0, e.target.selectionStart),
        e.key, 
        oldValue.slice(e.target.selectionEnd)
    ].join('');

    // allow only numbers
    if (!/^(-|[0-9,.])[0-9,.]*$/.test(newValue)) {
      return e.preventDefault();
    }

    // forbid non digits duplicate
    var match = newValue.match(/[,.]/g);
    if (match && match.length > 1) {
      return e.preventDefault();
    }

    // forbid more than 2 decimals
    match = (/[,.]/g).test(newValue);
    if (match && !/[,.]\d{0,2}$/g.test(newValue)) {
      return e.preventDefault();
    }

    // forbid leading zeros
    if (/^-?0\d/.test(newValue)) {
      return e.preventDefault();
    }

    this.setState({
      "value": parseInt(newValue, 10)
    });
  },
  render: function() {
    var sign = "";
    if (this.state.value < 0) {
      sign = "negative";
    } else {
      sign = "positive";
    }
    return (
      <input type="text" pattern="[0-9-,.]*" 
           placeholder={this.props.placeholder} 
           onKeyPress={this.handleChange}
           onPaste={this.handleChange}
           onChange={this.handleChange}
           inputMode="numeric" 
           className={"form-control " + sign}
           name="initial-amount"/>
    );
  }
});


const NewMoneyBookView = () => {
  return (
    <div id="app-viewport">

      <AppHeader title="Ajouter un nouveau livre de compte" />
      <div className="container" id="app-content">

        <div className="row">
          <form className="col-xs-12">

            <div className="form-group">
              <label htmlFor="name">Nom du livre de compte</label>
              <input type="text" className="form-control" name="name"/>
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
              <MoneyInput placeholder="Il peut être (+) positif ou (-) négatif"/>
            </div>

            <div className="form-group">
              <button className="btn btn-success">OK</button> <button className="btn btn-default">ANNULER</button>
            </div>
  
          </form>

        </div>

      </div>

    </div>
  );
};

export default NewMoneyBookView;
