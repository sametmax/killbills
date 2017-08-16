
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
    this.state = {
      amount: 0,
      displayedAmount: "0",
      displayedOperations: "0",
      allowMinus: true,
      allowOperator: true,
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
      displayedOperations: newDisplayedOperation
    })
    
  }

  inputOperator(){
    
  }
  inputMinus(){
    
  }
  inputPercent(){
    
  }
  inputComa(){
    
  }

  clearAll() {
    this.clearDisplay();
    this.setState({
      amount: 0,
      displayedAmount: "0"
    });
  }

  clearDisplay() {
    this.setState({
      displayedOperations: "0",
      allowMinus: true,
      allowOperator: true,
      allowComa: true,
      decimalCount: 0,
      afterComa: false
    });
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
    console.log("render");
    const clearDisplayedOperation = this.state.displayedOperations !== '0';
    const clearText = clearDisplayedOperation ? 'C' : 'AC'

    return (
      <div className="calculator">
        <div className="displayed-amount">
          <Amount value={this.state.displayedAmount} currency={this.props.currency.suffix}>
          </Amount>
        </div>
        <div className="displayed-operation"><AutoScalingText fontSize="3rem">{this.state.displayedOperations}</AutoScalingText></div>
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <CalculatorKey className="key-clear" 
                             onPress={clearDisplayedOperation ? this.clearDisplay.bind(this) : this.clearAll.bind(this)}>
                {clearText}
              </CalculatorKey>
              <CalculatorKey className="key-sign" onPress={() => this.toggleSign()}><span>±</span></CalculatorKey>
              <CalculatorKey className="key-percent" onPress={() => this.inputPercent()}>%</CalculatorKey>
            </div>
            <div className="digit-keys">
              <CalculatorKey className="key-back" onPress={() => this.inputDigit(0)}>
                <span className="glyphicon glyphicon-arrow-left"></span>
              </CalculatorKey>
              <CalculatorKey className="key-0" onPress={this.inputDigit.bind(this, 0)}>0</CalculatorKey>
              <CalculatorKey className="key-dot" onPress={() => this.inputDot()}>●</CalculatorKey>
              <CalculatorKey className="key-1" onPress={this.inputDigit.bind(this, 1)}>1</CalculatorKey>
              <CalculatorKey className="key-2" onPress={this.inputDigit.bind(this, 2)}>2</CalculatorKey>
              <CalculatorKey className="key-3" onPress={this.inputDigit.bind(this, 3)}>3</CalculatorKey>
              <CalculatorKey className="key-4" onPress={this.inputDigit.bind(this, 4)}>4</CalculatorKey>
              <CalculatorKey className="key-5" onPress={this.inputDigit.bind(this, 5)}>5</CalculatorKey>
              <CalculatorKey className="key-6" onPress={this.inputDigit.bind(this, 6)}>6</CalculatorKey>
              <CalculatorKey className="key-7" onPress={this.inputDigit.bind(this, 7)}>7</CalculatorKey>
              <CalculatorKey className="key-8" onPress={this.inputDigit.bind(this, 8)}>8</CalculatorKey>
              <CalculatorKey className="key-9" onPress={this.inputDigit.bind(this, 9)}>9</CalculatorKey>
            </div>
          </div>
          <div className="operator-keys">
            <CalculatorKey className="key-divide" onPress={() => this.performOperation('/')}><span>÷</span></CalculatorKey>
            <CalculatorKey className="key-multiply" onPress={() => this.performOperation('*')}><span>×</span></CalculatorKey>
            <CalculatorKey className="key-subtract" onPress={() => this.performOperation('-')}><span>−</span></CalculatorKey>
            <CalculatorKey className="key-add" onPress={() => this.performOperation('+')}><span>+</span></CalculatorKey>
            <CalculatorKey className="key-equals" onPress={() => this.performOperation('=')}><span>=</span></CalculatorKey>
          </div>
        </div>
      </div>
    )
  }
}

export {Calculator};
