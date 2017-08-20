

class MathParser{

  constructor(){

    this.currentOperation = this.newOperation();
    this.operations = [this.currentOperation];
    this.currentOperationGroup = this.operations;

    this.allowedOperators = {
      '-': (a, b) => a + b,
      '+': (a, b) => a + b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
    }
  }

  newOperation(){
    return {
      sign: (x) => x,
      func: (a, b) => b,
      value: '',
    };
  }

  parse(input){
    var current = input[0];
    var next;
    var state = this.start;

    for (var i = 1, len = input.length; i < len; i++) {
      next = input[i];
      state = state.bind(this)(current, next);
      current = next;
    }

    if (this.isNumber(current)){
      this.number(current);
    }

    if (current === "%"){
      this.percent(current);
    }

    return this.calculate(undefined, this.operations);
  }

  calculate(total, operations){

    do {
      var operation = operations.shift();

      var value = operation.value;
      if (this.isString(operation.value)){
        value = operation.sign(parseFloat(operation.value));
      } else {
        value = this.calculate(total, value);
      }

      total = operation.func(total, value);
    } while(operations.length)

    return total;
  }

  start(current, next){

    // we parse a minus sign
    if (current === "-"){
      return this.sign(current, next);
    }

    if (this.isNumber(current)){
      return this.number(current, next);
    }

    throw "Expected sign and numbers, got current = " + current;
  }


  operator(current, next){
    if (!this.isOperator(current)){
      throw "Expected operator, got current = " + current;
    }

    this.currentOperation = this.newOperation();
    var operator = this.allowedOperators[current];

    if (current === "+" || current === "-"){

      var linkingOperation = this.newOperation();
      this.currentOperationGroup.push(linkingOperation);
      linkingOperation.func = operator;
      this.currentOperationGroup = [];
      if (current === "-"){
        this.sign(current, next)
      }
      linkingOperation.value = this.currentOperationGroup
    } else {
      this.currentOperation.func = operator;
    }

    this.currentOperationGroup.push(this.currentOperation);

    return this.start;
  }

  sign(current, next){
    if (current !== "-"){
      throw "Expected minus, got current = " + current;
    }

    var oldFunc = this.currentOperation.sign;
    this.currentOperation.sign = (x) => {
      var res = -oldFunc(x);
      return res
    }

    if (next === undefined){
      return
    }

    if (next === "-"){
      return this.sign;
    }

    if (this.isNumber(next)){
      return this.number;
    }

    throw "Expected sign and numbers, got next = " + next;
  }

  number(current, next){

    if (!this.isNumber(current)){
      throw "Expected number, got current = " + current;
    }

    this.currentOperation.value += current;

    if (next === undefined){
      return
    }

    if (this.isOperator(next)){
      return this.operator;
    }

    if (next === "%"){
      return this.percent;
    }

    if (this.isNumber(next)){
      return this.number;
    }

    throw "Expected sign, numbers or %, got next = " + next;
  }

  percent(current, next){
    if (current !== "%"){
      throw "Expected %, got current = " + current;
    }

    var oldFunc = this.currentOperation.func;
    this.currentOperation.func = (a, b) => {
      b = a === undefined ? b / 100 : a / 100 * b;
      var res = oldFunc(a, b);
        return res
    }

    if (next === undefined){
      return
    }

    if (this.isOperator(next)){
      return this.operator;
    }

    throw "Expected operator, got next = " + next;

  }

  isOperator(input){
    return /[+*/-]/.test(input);
  }

  isNumber(input){
    return /[0-9.]/.test(input);
  }

  isString(input){
    return Object.prototype.toString.call(input) === "[object String]";
  }

}

export {MathParser};

