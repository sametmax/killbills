
import React from 'react';

import {Calculator} from '../../components/calculator/calculator.jsx'
import '../../components/calculator/calculator.sass'
import './new_operation.sass'
import './medium-icon-bank-check.png'
import './medium-icon-cash.png'


class NewOperationView extends React.Component {


  render(){
    return <div className="calculator" id="new-operation">
      <Calculator />

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
        <button className="btn btn-default" to='#'>CANCEL</button>
      </div>
    </div>;
  }

}


export {NewOperationView}
