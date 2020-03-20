function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    let result;
    let exprArr;
    let bracketsCount = 0;
    if (expr.includes(' ')) {
        exprArr = expr.split(' ');
    } else {
        exprArr = expr.split('');
    }

    exprArr = exprArr.filter(function(element) {
        return !(element == '');
    });
   

    exprArr.forEach(element => {
        if (element ==='(') {
            bracketsCount++;
        }
        if (element === ')') {
            bracketsCount--;
        }
    });
    
    if(bracketsCount != 0) { 
        throw new Error("ExpressionError: Brackets must be paired");
    }

    exprArr.forEach(element => {
        if (element ==='/' && exprArr[element+1] === '0') {
           throw new Error("TypeError: Division by zero.") 
        }
    });

    function calculate(first, sign, second) {
        switch (sign) {
            case '*':
                return Number(first)*Number(second);
                break;
            case '/':
                return Number(first)/Number(second);
                break;
            case '+':
                return Number(first)+Number(second);
                break;
            case '-':
                return Number(first)-Number(second);
                break
        }
    }

    let stackNumbers = [];
    let stackSign = [];
    let priority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    }

    exprArr.forEach( element => {
        console.log(stackNumbers);
        console.log(stackSign);
        if ( element === '+' || element === '-'|| element === '*' || element === '/' || element === '(' || element === ')'){
            let lastSign = stackSign[stackSign.length-1];
            let leftNumber;
            let rightNumber;
            
            if (priority.element > priority.lastSign || 
                element === '(' || stackSign.length === 0) {
                    console.log('1');
                stackSign.push(element);
                return;
            }
            if (element === ')') {
                console.log('5');
                while (lastSign != '('){
                    leftNumber = stackNumbers[stackNumbers.length-1];
                    rightNumber = stackNumbers[stackNumbers.length-2];
                    stackNumbers.splice(stackNumbers.length-2, 2);
                    stackNumbers.push(calculate(leftNumber, lastSign, rightNumber));
                    stackSign.pop();
                    lastSign = stackSign[stackSign.length-1];
                }
                stackSign.pop();
                return;
            }
            if ( priority.element > priority.lastSign) {
                console.log('4');
                while(priority.element > priority.lastSign || lastSign ==='(') {
                    leftNumber = stackNumbers[stackNumbers.length-1];
                    rightNumber = stackNumbers[stackNumbers.length-2];
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
            leftNumber = stackNumbers[stackNumbers.length-1];
            rightNumber = stackNumbers[stackNumbers.length-2];
            stackNumbers.splice(stackNumbers.length-2, 2);
            stackNumbers.push(calculate(leftNumber, lastSign, rightNumber));
            stackSign.pop();
        }
    } else {
        result = Number(stackNumbers[0]);
    }

    return result;
}

module.exports = {
    expressionCalculator
}