function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let result;
    let exprArr;
    let bracketsCount = 0;
    if (expr.includes(' ')) {
        exprArr = expr.trim().split(' ');
    } else {
        exprArr = expr.trim().split('');
    }

    exprArr = exprArr.filter(function(element) {
        return !(element == '');
    });

    if (expr.includes('(') || expr.includes(')')) {
        if (expr.match(/\)/g) === null || expr.match(/\(/g) === null ||
            expr.match(/\(/g).length != expr.match(/\)/g).length ) {
            throw new Error("ExpressionError: Brackets must be paired");
        }
    }

    if (expr.includes('/0') || expr.includes('/ 0')) {  
        throw new Error("TypeError: Division by zero.") 
    }

    function calculate(first, sign, second) {
        switch (sign) {
            case '*':
                return parseFloat(first)*parseFloat(second);
                break;
            case '/':
                return parseFloat(first)/parseFloat(second);
                break;
            case '+':
                return parseFloat(first)+parseFloat(second);
                break;
            case '-':
                return parseFloat(first)-parseFloat(second);
                break
        }
    }

    let stackNumbers = [];
    let stackSign = [];
    let priority = {
        '(': 0,
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    }

    exprArr.forEach( element => {

        if ( element === '+' || element === '-'|| element === '*' || element === '/' || element === '(' || element === ')'){
            let lastSign = stackSign[stackSign.length-1];
            let leftNumber;
            let rightNumber;

            if (stackSign.length === 0 || element === '(' || priority[element] > priority[lastSign] ) {
                stackSign.push(element);
                return;
            }

            if (element === ')') {
                while (lastSign != '('){
                    leftNumber = stackNumbers[stackNumbers.length-2];
                    rightNumber = stackNumbers[stackNumbers.length-1];
                    stackNumbers.splice(stackNumbers.length-2, 2);
                    stackNumbers.push(calculate(leftNumber, lastSign, rightNumber));
                    stackSign.pop();
                    lastSign = stackSign[stackSign.length-1];
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
                    leftNumber = stackNumbers[stackNumbers.length-2];
                    rightNumber = stackNumbers[stackNumbers.length-1];
                    stackNumbers.splice(stackNumbers.length-2, 2);
                    stackNumbers.push(calculate(leftNumber, lastSign, rightNumber));
                    stackSign.pop();
                    lastSign = stackSign[stackSign.length-1];
                }
                stackSign.push(element);
            }
         } else {
             stackNumbers.push(element);
         }
    })

    if (stackSign.length != 0) {
        let lastSign = stackSign[stackSign.length-1];
        let leftNumber;
        let rightNumber;
        while (stackSign.length !=0) {
            leftNumber = stackNumbers[stackNumbers.length-2];
            rightNumber = stackNumbers[stackNumbers.length-1];
            stackNumbers.splice(stackNumbers.length-2, 2);
            stackNumbers.push(calculate(leftNumber, lastSign, rightNumber));
            stackSign.pop();
            lastSign = stackSign[stackSign.length-1];
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