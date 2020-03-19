function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    console.log(Boolean('('));
    let exprArr;
    let bracketsCount = 0;
    if (expr.includes(' ')) {
        exprArr = expr.split(' ');
    } else {
        exprArr = expr.split('');
    }

    exprArr.forEach(element => {
        if (element ==='(') {
            bracketsCount++;
        }
        if (element === ')') {
            bracketsCount--;
        }
    });
    
    if(bracketsCount != 0) { 
        throw "ExpressionError: Brackets must be paired";
    }

    exprArr.forEach(element => {
        if (element ==='/' && exprArr[element+1] === '0') {
            throw "TypeError: Division by zero."
        }
    });

    let stackNumbers = [];
    let stackSign = [];
    let priority = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    }
    exprArr.forEach( element => {
        if ( Number(element) === NaN){
            stackSign.push
         }
    })
}

module.exports = {
    expressionCalculator
}