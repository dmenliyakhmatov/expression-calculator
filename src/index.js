function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let result;
    let exprArr;
    let stackNumbers = [];
    let stackSign = [];
    let lastSign;
    let priority = {
        '(': 0,
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    }
    
    /* Функция просчета стека*/  
    function calculateStack() {
      let leftNumber;
      let rightNumber;
  
      leftNumber = stackNumbers[stackNumbers.length-2]
      rightNumber = stackNumbers[stackNumbers.length-1];
      stackNumbers.splice(stackNumbers.length-2, 2);
      stackNumbers.push(calculate(leftNumber, lastSign, rightNumber));
      stackSign.pop();
      lastSign = stackSign[stackSign.length-1];
  }

  /*Функция простых арифметических действи*/
  function calculate(first, sign, second) {
    switch (sign) {
        case '*':
            return parseFloat(first)*parseFloat(second);
        case '/':
            return parseFloat(first)/parseFloat(second);
        case '+':
            return parseFloat(first)+parseFloat(second);
        case '-':
            return parseFloat(first)-parseFloat(second);
    }
  }
  
    /*разбиваем строку на массив*/
    if (expr.includes(' ')) {
        exprArr = expr.split(' ');
    } else {
        exprArr = expr.split('');
    }
  
    /* Исключение пробелов из массива*/
    exprArr = exprArr.filter(function(element) {
        return !(element == '');
    });
  
    /* Отсечение выражений с непарными скобками*/
    if (expr.includes('(') || expr.includes(')')) {
        if (expr.match(/\)/g) === null || expr.match(/\(/g) === null ||
            expr.match(/\(/g).length != expr.match(/\)/g).length ) {
            throw new Error("ExpressionError: Brackets must be paired");
        }
    }
    
    /*Исключение выражений с делением на ноль*/
    if (expr.includes('/0') || expr.includes('/ 0')) {  
        throw new Error("TypeError: Division by zero.") 
    }
  
    /*Расчет всего выражения*/
    exprArr.forEach( element => {
  
        if ( element === '+' || element === '-'|| element === '*' || element === '/' || element === '(' || element === ')'){
            lastSign = stackSign[stackSign.length-1]

            if (stackSign.length === 0 || element === '(' || priority[element] > priority[lastSign] ) {
                stackSign.push(element);
                return;
            }
  
            if (element === ')') {
                while (lastSign != '('){
                    calculateStack();
                }
                stackSign.pop();
                return;
            }
  
            if ( element != "(" && element != ")" && priority[element] < priority[lastSign] ||
                 priority[element] === priority[lastSign]) {
                while(priority[element] < priority[lastSign] || priority[element] === priority[lastSign]) {
                    if (lastSign ==='(') {
                        break;
                    }
                   calculateStack();
                }
                stackSign.push(element);
            }
         } else {
             stackNumbers.push(element);
         }
    })
  
    if (stackSign.length != 0) {
      lastSign = stackSign[stackSign.length-1];
        while (stackSign.length != 0) {
           calculateStack();
        }
        result = parseFloat(stackNumbers[0]);
    } else {
        result = parseFloat(stackNumbers[0]);
    }
    return result;
  
  }

module.exports = {
    expressionCalculator
}