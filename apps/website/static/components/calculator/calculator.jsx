
import React from 'react';

import PointTarget from 'react-point';

import {Amount} from '../number/amount.jsx';
import {MathParser} from '../number/parser.js';


class AutoScalingText extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      fontSize: this.props.fontSize
    };
  }

  updateScaling(){
    const { scale } = this.state
    const node = this.node
    const parentNode = node.parentNode

    if (this.props.children.length < 19
        && this.state.fontSize !== this.props.fontSize){
      this.setState({ fontSize: this.props.fontSize });
    } else if (this.props.children.length >= 19
        && this.state.fontSize !== "2rem") {
      this.setState({ fontSize: "2rem" });
    }
  }

  componentDidUpdate() {
    this.updateScaling();
  }

  render() {
    const { fontSize } = this.state

    return (
      <div
        className="auto-scaling-text"
        style={{ "fontSize": fontSize }}
        ref={node => this.node = node}
      >{this.props.children}</div>
    )
  }
}


class CalculatorKey extends React.Component {
  render() {
    const { onPress, className, ...props } = this.props;
    return (
      <PointTarget onPoint={onPress}>
        <button className={`calculator-key ${className}`} {...props}/>
      </PointTarget>
    )
  }
}

class Calculator extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      history: [this.getInitialState()],
      error: '',
      inputSign: '-',
      forceSign: true
    };
  }

  getInitialState(){
    return {
      amount: 0,
      displayedOperations: "0",
      allowMinus: true,
      allowOperator: false,
      allowComa: true,
      decimalCount: 0,
      afterComa: false,
      allowPercent: false,
      allowEqual: true,
      allowDigit: true
    };
  }

  getLastState(){
    return this.state.history[this.state.history.length-1];
  }

  pushState(state){
    var newState = {...this.getLastState(), ...state};
    this.state.history.push(newState);
    this.state.error = "";
    this.forceUpdate();
  }

  resetStateHistory(state){
    this.setState({history: [state]});
  }

  forbidOperation(error){
    this.setState({error: error});
  }

  inputDigit(digit){
    var state = this.getLastState();

    if (!state.allowDigit){
      return this.forbidOperation("You can't type in a number now");
    }

    var decimalCount = state.decimalCount
    if (state.afterComa){
      if (state.decimalCount >= 2){
        return this.forbidOperation("Max 2 decimals");
      }
      decimalCount += 1;
    }

    var newDisplayedOperation = "";
    if (state.displayedOperations !== "0"){
      newDisplayedOperation = state.displayedOperations;
    }

    // force negative first input
    if (this.state.inputSign === "-"
        && newDisplayedOperation === ""
        && this.state.forceSign){
      newDisplayedOperation += "-";
      this.state.forceSign = false;
    }

    newDisplayedOperation += digit.toString();
    this.pushState({
      displayedOperations: newDisplayedOperation,
      allowMinus: true,
      allowOperator: true,
      decimalCount: decimalCount,
      allowPercent: true,
      allowEqual: true,
      allowDigit: true
    })

  }

  inputOperator(operator){

    var state = this.getLastState();

    if (!state.allowOperator){
      return this.forbidOperation("You can't type in an operator now");
    }

    var newDisplayedOperation = "";
    if (state.displayedOperations !== "0"){
      newDisplayedOperation = state.displayedOperations;
    }

    this.pushState({
      displayedOperations: newDisplayedOperation + operator,
      allowMinus: true,
      allowComa: true,
      decimalCount: 0,
      afterComa: false,
      allowOperator: false,
      allowPercent: false,
      allowEqual: false,
      allowDigit: true
    });
  }

  inputMinus(){

    var state = this.getLastState();

    if (!state.allowMinus){
      return this.forbidOperation("You can't type in a minus signe now");
    }

    var newDisplayedOperation = "";
    if (state.displayedOperations !== "0"){
      newDisplayedOperation = state.displayedOperations;
    }

    this.pushState({
      displayedOperations: newDisplayedOperation + '-',
      allowMinus: true,
      allowComa: true,
      decimalCount: 0,
      afterComa: false,
      allowOperator: false,
      allowPercent: false,
      allowEqual: false,
      allowDigit: true
    });
  }

  inputComa(){

    var state = this.getLastState();

    if (!state.allowComa){
      return this.forbidOperation();
    }

    this.pushState({
      displayedOperations: state.displayedOperations + '.',
      allowMinus: false,
      allowComa: false,
      decimalCount: 0,
      afterComa: true,
      allowOperator: false,
      allowPercent: false,
      allowEqual: false,
      allowDigit: true
    });
  }

  clearAll() {
    this.state.forceSign = true;
    this.resetStateHistory(this.getInitialState());
  }

  clearDisplayedOperations() {
    var lastState = this.getLastState();
    var newState = this.getInitialState();
    newState.amount = lastState.amount;
    newState.allowOperator = lastState.displayedAmount !== "0";
    this.state.forceSign = true;
    this.resetStateHistory(newState);
  }

  performOperations(operations){

    var state = this.getLastState();
    var parser = new MathParser();

    // if operations starts by an operator, add the previous result in
    // the mix
    if (/^[+/x]/.test(operations)){
      operations = state.amount.toString() + operations;
    } else if (/^-/.test(operations) && state.amount !== 0){
      operations = state.amount.toString() + operations;
    }

    // replace cosmetic "x" with parsable "*"
    operations = operations.replace('x', '*');

    try {
        var res = parser.parse(operations);
        if (res !== 0 && Math.abs(res) < 0.01){
          return this.forbidOperation("The number is too small to be money");
        }
        return res;

    } catch (e) {
        // this should not happend either, but again, just in case...
        this.forbidOperation();
        console.error(e);
    }
  }

  inputEqual() {

    var state = this.getLastState();
    if (!state.allowEqual){
      return this.forbidOperation();
    }

    var state = this.getLastState();
    var result = this.performOperations(state.displayedOperations);
    if (!result){
      return
    }
    var newState = this.getInitialState();
    newState.allowOperator = result !== 0;
    newState.amount = result;
    this.resetStateHistory(newState);
  }

  clearLastChar() {
    var state = this.getLastState();
    if (state.displayedAmount === "0"){
      return this.forbidOperation();
    }
    this.state.history.pop();
    if (!this.state.history.length){
      this.resetStateHistory(this.getInitialState());
    } else {
      this.forceUpdate();
    }
  }

  toggleSign() {
    var state = this.getLastState();
    this.state.inputSign = this.state.inputSign === "-" ? "+" : '-'
    this.pushState({
      amount: -state.amount,
    });
  }

  inputPercent() {
    var state = this.getLastState();

    if (!state.allowPercent){
      return this.forbidOperation();
    }

    this.pushState({
      allowMinus: true,
      allowOperator: true,
      allowComa: false,
      decimalCount: 0,
      afterComa: false,
      allowPercent: false,
      displayedOperations: state.displayedOperations + "%",
      allowEqual: true,
      allowDigit: false
    })
  }

  render() {
    var state = this.getLastState();
    const clearDisplayedOperation = state.displayedOperations !== '0';
    const clearText = clearDisplayedOperation ? 'C' : 'AC'

    var error = "";
    if (this.state.error) {
      error = (
        <p className="error">
          <i className="glyphicon glyphicon-warning-sign"></i>
          {this.state.error}
        </p>
      );
    }

    var sign = '';
    if (state.amount === 0 && this.state.inputSign === "-"){
      sign = '-';
    }

    return (
      <div className="calculator">

        <div className="displayed-amount">
          <Amount value={state.amount}
                  currency={this.props.currency.suffix}
                  forceSign={sign}>
          </Amount>
        </div>

        <div className="displayed-operation">
          <AutoScalingText fontSize="3rem">
            {state.displayedOperations}
          </AutoScalingText>
        </div>

        <div className="error">{error}</div>

        <div className="calculator-keypad">

          <div className="input-keys">

            <div className="function-keys">
              <CalculatorKey className="key-clear"
                             onPress={clearDisplayedOperation ? this.clearDisplayedOperations.bind(this) : this.clearAll.bind(this)}>
                {clearText}
              </CalculatorKey>
              <CalculatorKey className="key-percent"
                             onPress={this.inputPercent.bind(this)}>
                %
              </CalculatorKey>
              <CalculatorKey className="key-sign" onPress={this.toggleSign.bind(this)}>
                <span>±</span>
              </CalculatorKey>

            </div>

            <div className="digit-keys">
              <CalculatorKey className="key-back" onPress={this.clearLastChar.bind(this)}>
                <span className="glyphicon glyphicon-arrow-left"></span>
              </CalculatorKey>
              <CalculatorKey className="key-0"
                             onPress={this.inputDigit.bind(this, 0)}>
                0
              </CalculatorKey>
              <CalculatorKey className="key-dot"
                             onPress={this.inputComa.bind(this)}>
                ●
              </CalculatorKey>
              <CalculatorKey className="key-1"
                             onPress={this.inputDigit.bind(this, 1)}>
                1
              </CalculatorKey>
              <CalculatorKey className="key-2"
                             onPress={this.inputDigit.bind(this, 2)}>
                2
              </CalculatorKey>
              <CalculatorKey className="key-3"
                             onPress={this.inputDigit.bind(this, 3)}>
                3
              </CalculatorKey>
              <CalculatorKey className="key-4"
                             onPress={this.inputDigit.bind(this, 4)}>
                4
              </CalculatorKey>
              <CalculatorKey className="key-5"
                             onPress={this.inputDigit.bind(this, 5)}>
                5
              </CalculatorKey>
              <CalculatorKey className="key-6"
                             onPress={this.inputDigit.bind(this, 6)}>
                6
              </CalculatorKey>
              <CalculatorKey className="key-7"
                             onPress={this.inputDigit.bind(this, 7)}>
                7
              </CalculatorKey>
              <CalculatorKey className="key-8"
                             onPress={this.inputDigit.bind(this, 8)}>
                8
              </CalculatorKey>
              <CalculatorKey className="key-9"
                             onPress={this.inputDigit.bind(this, 9)}>
                9
              </CalculatorKey>
            </div>

          </div>

          <div className="operator-keys">
            <CalculatorKey className="key-divide"
                           onPress={this.inputOperator.bind(this, '/')}>
              <span>÷</span>
            </CalculatorKey>
            <CalculatorKey className="key-multiply"
                           onPress={this.inputOperator.bind(this, 'x')}>
              <span>×</span>
            </CalculatorKey>
            <CalculatorKey className="key-subtract"
                           onPress={this.inputMinus.bind(this)}>
              <span>−</span>
            </CalculatorKey>
            <CalculatorKey className="key-add"
                           onPress={this.inputOperator.bind(this, '+')}>
              <span>+</span>
            </CalculatorKey>
            <CalculatorKey className="key-equals"
                           onPress={this.inputEqual.bind(this)}>
              <span>=</span>
            </CalculatorKey>
          </div>

        </div>
      </div>
    )
  }
}

export {Calculator};
