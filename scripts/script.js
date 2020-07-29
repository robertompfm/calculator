// GLOBAL VARIABLES
let accumulatorStr = '';
let currentNumberStr = '';
let currentOperatorStr = '';

const KEY_CODES = {
    96: 0, 97: 1, 98: 2, 99: 3, 100: 4, 
    101: 5, 102: 6, 103: 7, 104: 8, 105: 9, 

    48: 0, 49: 1, 50: 2, 51: 3, 52: 4, 
    53: 5, 54: 6, 55: 7, 56: 8, 57: 9,

    110: '.', 190: '.', 13: '=', 107: '+',
    109: '-', 106: '*', 111: '/', 8: 'BACKSPACE',
}

const OPERATORS_DISPLAY_STR = {
    '/': ' / ',
    '*': ' x ',
    '+': ' + ',
    '-': ' - ',
    '': ''
}


// OPERATOR FUNCTIONS
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) return 'ERROR!';
    return num1 / num2;
}

// OPERATE FUNCTION
function operate(operator, num1, num2) {
    console.log({operator, num1, num2});
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return num2 !== 0 ? num2 : num1 !== 0 ? num1 : 0;
    }
}

// GETTERS AND SETTERS
function getExpressionTop() {
    let displayTop = document
        .querySelector('.display__top')
        .querySelector('p');
    return displayTop.textContent;
}

function setExpressionTop(expression) {
    let displayTop = document
        .querySelector('.display__top')
        .querySelector('p');
    displayTop.textContent = expression;
}

function getExpressionBottom() {
    let displayBottom = document
        .querySelector('.display__bottom')
        .querySelector('p');
    return displayBottom.textContent;
}

function setExpressionBottom(expression) {
    let displayBottom = document
        .querySelector('.display__bottom')
        .querySelector('p');
    displayBottom.textContent = expression;
}


// UPDATE THE BOTTOM DISPLAY EXPRESSION
function updateBottomDisplay() {
    setExpressionBottom(
        accumulatorStr + 
        OPERATORS_DISPLAY_STR[currentOperatorStr] + 
        currentNumberStr
        );  
}

// UPDATE CURRENT NUMBER STRING
function addCharToCurrentNumberStr(char) {
    if (accumulatorStr !== '' && currentOperatorStr === '') {
        accumulatorStr = '';
    }
    currentNumberStr = currentNumberStr + char;
}

function removeLastDigitFromCurrentNumber() {
    currentNumberStr = currentNumberStr.slice(0, -1);
}


// ADD NEW NUMBER FUNCTION
function addNewNumber(newNumber) {
    addCharToCurrentNumberStr(newNumber);
    updateBottomDisplay();
}


// REMOVE LAST NUMBER FUNCTION
function removeLastNumber() {
    removeLastDigitFromCurrentNumber();
    updateBottomDisplay();
}


// COMPUTE RESULT
function computeResult() {
    let accumulator = Number(accumulatorStr);
    let operator = currentOperatorStr;
    let number = Number(currentNumberStr);
    accumulator = operate(operator, accumulator, number);
    accumulatorStr = accumulator.toString();
    currentOperatorStr = '';
    currentNumberStr = '';
}


// CHANGE OPERATOR
function selectOperator(newOperator) {
    computeResult();
    currentOperatorStr = newOperator;
    updateBottomDisplay();
}

function clickOperatorBtn(e) {
    let id = e.target.id;
    let newOperator;
    switch (e.target.id) {
        case 'btn--div':
            newOperator = '/';
            break;
        case 'btn--times':
            newOperator = '*';
            break;
        case 'btn--minus':
            newOperator = '-';
            break;
        case 'btn--plus':
            newOperator = '+';
            break;
    }
    selectOperator(newOperator);
}


// SELECT EQUALS
function selectEquals() {
    computeResult();
    updateBottomDisplay();
}



function updateLastExpression() {
    if (operator === '' && current === '') {
        lastExpression = 0;
    } else if (operator === '') {
        lastExpression = current;
    } else {
        lastExpression = accumulator + operator + current
    }
}


// CLEAR ALL FUNCTION
function clear() {
    setExpressionTop('');
    setExpressionBottom('');

    accumulator = 0;
    current = 0;
}


// BUTTON CLICK EVENTS
//   Number click function
function clickNumber(e) {
    addNewNumber(e.target.textContent);
}
//   Operator click function
function clickOperator(e) {
    selectOperator(e.target.textContent);
}
//   0 to 9 listeners
for (let i = 0; i < 10; i++) {
    let numberButton = document.querySelector(`#btn--${i}`);
    numberButton.addEventListener('click', clickNumber);
}
//   00 listener
const doubleOButton = document.querySelector('#btn--00');
doubleOButton.addEventListener('click', clickNumber);
//   Dot listener
const dotButton = document.querySelector('#btn--dot');
dotButton.addEventListener('click', clickNumber);
//   Del button (same as backspace) listeners
const delButton = document.querySelector('#btn--del');
delButton.addEventListener('click', removeLastNumber);
//   Operator buttons
const operatorButons = [
    document.querySelector('#btn--div'),
    document.querySelector('#btn--times'),
    document.querySelector('#btn--minus'),
    document.querySelector('#btn--plus'),
];
operatorButons.forEach(btn => btn.addEventListener('click', clickOperatorBtn));
//   Equals button
const equalsBtn = document.querySelector('#btn--equals');
equalsBtn.addEventListener('click', selectEquals);

// KEY PRESS HANDLERS
//   Keydown listeners
window.addEventListener('keydown', typeKey);
//   Typing function
function typeKey(e) {
    let key = KEY_CODES[e.keyCode];
    if (key === undefined) {
        return;
    }
    
    if (key === 'BACKSPACE') {
        removeLastNumber();
        return;
    }

    if (typeof key === 'number') {
        addNewNumber(key);
        return;
    }

    if (key === '.') {
        writeCharOnDisplayBottom(key);
        return;
    }

    if (key === '+' || 
        key === '-' || 
        key === '*' || 
        key === '/') {
        selectOperator(key);
        return;
    }
}





clear();