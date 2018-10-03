class SmartCalculator {
  constructor(initialValue) {
      this.value = initialValue;
      this.expression = [initialValue];

      this.priorities = new Map();
      this.priorities.set('+', 1);
      this.priorities.set('-', 1);
      this.priorities.set('*', 2);
      this.priorities.set('/', 2);
      this.priorities.set('**', 3);
  }

  add(number) {
    this.expression.push('+');
    this.expression.push(number);

    this.value = this.createStack(this.expression);

    return this;
  }
    
  subtract(number) {
    this.expression.push('-');
    this.expression.push(number);

    this.value = this.createStack(this.expression);

    return this;
  }

  multiply(number) {
    this.expression.push('*');
    this.expression.push(number);

    this.value = this.createStack(this.expression);

    return this;
  }

  devide(number) {
    this.expression.push('/');
    this.expression.push(number);

    this.value = this.createStack(this.expression);

    return this;
  }

  pow(number) {
    this.expression.push('**');
    this.expression.push(number);

      this.value = this.createStack(this.expression);

      return this;
  }

  createStack(expression) {
    this.res = [];
    this.operations = [];
      
    expression.forEach((elem) => {
      if (this.isANumber(elem)) {
        this.res.push(elem);
      } else {
        let last = this.operations[this.operations.length - 1];

        while(this.priorities.get(last) >= this.priorities.get(elem)) {
          if (this.priorities.get(elem) == Math.max(...this.priorities.values())) break;

          this.res.push(this.operations.pop());
          last = this.operations[this.operations.length - 1];
        } 

        this.operations.push(elem);
      }
    });

    while (this.operations.length != 0) {
      this.res.push(this.operations.pop());
    }

    this.calculate(this.res);
    return this.res;
  }

  calculate (stack) {
    for (let i = 0; i < stack.length; i++) {
      let output = null;

      switch (stack[i]) {
        case '+':
          output = stack[i - 2] + stack[i - 1];
          stack.splice(i - 2, 3, output);
          i -= 2;
          break;
        case '-':
          output = stack[i - 2] - stack[i - 1];
          stack.splice(i - 2, 3, output);
          i -= 2;
          break;
        case '*':
          output = stack[i - 2] * stack[i - 1];
          stack.splice(i - 2, 3, output);
          i -= 2;
          break;
        case '/':
          output = stack[i - 2] / stack[i - 1];
          stack.splice(i - 2, 3, output);
          i -= 2;
          break;
        case '**':
          output = stack[i - 2] ** stack[i - 1];
          stack.splice(i - 2, 3, output);
          i -= 2;
          break;
      } 
    }
  }

  isANumber(x) {
  return !isNaN(parseFloat(x)) && isFinite(x);
  }

  valueOf() {
    this.value = this.createStack(this.expression);
      return this.value[0];
  }
}
module.exports = SmartCalculator;
