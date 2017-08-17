
import React from 'react';

import PointTarget from 'react-point';

import {Amount} from '../number/amount.jsx';


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
    this.state = this.getInitialState();
  }

  getInitialState(){
    return {
      amount: 0,
      displayedOperations: "0",
      allowMinus: true,
      allowOperator: false,
      allowComa: true,
      decimalCount: 0,
      afterComa: false
    };
  }

  forbidOperation(){

  }

  inputDigit(digit){
    if (this.state.afterComa){
      if (this.state.decimalCount >= 2){
        return this.forbidOperation();
      }
      this.setState({
        decimalCount: this.state.decimalCount+1
      })
    }

    var newDisplayedOperation = "";
    if (this.state.displayedOperations !== "0"){
      newDisplayedOperation = this.state.displayedOperations;
    }
    newDisplayedOperation += digit.toString();
    this.setState({
      displayedOperations: newDisplayedOperation,
      allowMinus: true,
      allowOperator: true,
    })

  }

  inputOperator(operator){
    if (!this.state.allowOperator){
      return this.forbidOperation();
    }

    var newDisplayedOperation = "";
    if (this.state.displayedOperations !== "0"){
      newDisplayedOperation = this.state.displayedOperations;
    }

    this.setState({
      displayedOperations: newDisplayedOperation + operator,
      allowMinus: true,
      allowComa: true,
      decimalCount: 0,
      afterComa: false,
      allowOperator: false,
    });
  }

  inputMinus(){
    if (!this.state.allowMinus){
      return this.forbidOperation();
    }

    var newDisplayedOperation = "";
    if (this.state.displayedOperations !== "0"){
      newDisplayedOperation = this.state.displayedOperations;
    }

    this.setState({
      displayedOperations: newDisplayedOperation + '-',
      allowMinus: true,
      allowComa: true,
      decimalCount: 0,
      afterComa: false,
      allowOperator: false,
    });
  }

  inputPercent(){

  }

  inputComa(){
    if (!this.state.allowComa){
      return this.forbidOperation();
    }

    this.setState({
      displayedOperations: this.state.displayedOperations + '.',
      allowMinus: false,
      allowComa: false,
      decimalCount: 0,
      afterComa: true,
      allowOperator: false,
    });
  }

  clearAll() {
    this.setState(this.getInitialState());
  }

  clearDisplayedOperations() {
    this.setState({
      allowOperator: this.state.displayedAmount !== "0",
      displayedOperations: "0",
      allowMinus: true,
      allowComa: true,
      decimalCount: 0,
      afterComa: false
    });
  }

  inputEqual() {
    try {

        var operations = this.state.displayedOperations;
        if (/^[+/x-]/.test(operations)){
          operations = this.state.amount.toString() + operations;
        }

        var result = eval(operations.replace('x', '*'));
        result = Math.round(result * 100) / 100;
        var state = this.getInitialState();
        state.allowOperator = true;
        state.amount = result;
        this.setState(state);
    } catch (e) {
        if (e instanceof SyntaxError) {
            return this.forbidOperation();
        }
        console.error(e);
    }
  }

  // clearLastChar() {
  //   const { displayValue } = this.state

  //   this.setState({
  //     displayValue: displayValue.substring(0, displayValue.length - 1) || '0'
  //   })
  // }

  // toggleSign() {
  //   const { displayValue } = this.state
  //   const newValue = parseFloat(displayValue) * -1

  //   this.setState({
  //     displayValue: String(newValue)
  //   })
  // }

  // inputPercent() {
  //   const { displayValue } = this.state
  //   const currentValue = parseFloat(displayValue)

  //   if (currentValue === 0)
  //     return

  //   const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
  //   const newValue = parseFloat(displayValue) / 100

  //   this.setState({
  //     displayValue: String(newValue.toFixed(fixedDigits.length + 2))
  //   })
  // }

  // inputDot() {
  //   const { displayValue } = this.state

  //   if (!(/\./).test(displayValue)) {
  //     this.setState({
  //       displayValue: displayValue + '.',
  //       waitingForOperand: false
  //     })
  //   }
  // }

  // inputDigit(digit) {
  //   const { displayValue, waitingForOperand } = this.state

  //   if (waitingForOperand) {
  //     this.setState({
  //       displayValue: String(digit),
  //       waitingForOperand: false
  //     })
  //   } else {
  //     this.setState({
  //       displayValue: displayValue === '0' ? String(digit) : displayValue + digit
  //     })
  //   }
  // }

  performOperation(nextOperator) {

  }

  render() {
    const clearDisplayedOperation = this.state.displayedOperations !== '0';
    const clearText = clearDisplayedOperation ? 'C' : 'AC'

    return (
      <div className="calculator">

        <div className="displayed-amount">
          <Amount value={this.state.amount}
                  currency={this.props.currency.suffix}>
          </Amount>
        </div>

        <div className="displayed-operation">
          <AutoScalingText fontSize="3rem">
            {this.state.displayedOperations}
          </AutoScalingText>
        </div>

        <div className="calculator-keypad">

          <div className="input-keys">

            <div className="function-keys">
              <CalculatorKey className="key-clear"
                             onPress={clearDisplayedOperation ? this.clearDisplayedOperations.bind(this) : this.clearAll.bind(this)}>
                {clearText}
              </CalculatorKey>
              <CalculatorKey className="key-sign" onPress={() => this.toggleSign()}>
                <span>±</span>
              </CalculatorKey>
              <CalculatorKey className="key-percent"
                             onPress={() => this.inputPercent()}>
                %
              </CalculatorKey>
            </div>

            <div className="digit-keys">
              <CalculatorKey className="key-back" onPress={() => this.inputDigit(0)}>
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
