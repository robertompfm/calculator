// GLOBAL VARIABLES
let accumulatorStr = '';
let currentNumberStr = '';
let currentOperatorStr = '';


// CONSTANTS
const doubleOButton = document.querySelector('#btn--00');  // 00 button
const dotButton = document.querySelector('#btn--dot');  // dot button
const delButton = document.querySelector('#btn--del');  // del button
const operatorButons = {
    '/': document.querySelector('#btn--div'),
    '*': document.querySelector('#btn--times'),
    '-': document.querySelector('#btn--minus'),
    '+': document.querySelector('#btn--plus'),
};  // operators (/, *, -, +)
const digitButtons = {};
for (let i = 0; i < 10; i++) {
    digitButtons[i] = document.querySelector(`#btn--${i}`);
};  // digits (0, 1, 2, 3, 4, 5, 6, 7, 8, 9)
const equalsBtn = document.querySelector('#btn--equals');  // = button
const acBtn = document.querySelector('#btn--ac');  // AC button

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

const ERROR_MESSAGE = 'ERROR!';

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
    if (num2 === 0) return NaN;
    return num1 / num2;
}

// OPERATE FUNCTION
function operate(operator, num1, num2) {
    console.log({operator, num1, num2}); // REMOVE THIS LINE!!!!!!!
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

// UPDATE OPERATOR
function updateCurrentOperatorStr(newOperator) {
    if (accumulatorStr !== ERROR_MESSAGE) {
        currentOperatorStr = newOperator
    }
}

// UPDATE THE TOP DISPLAY EXPRESSION
function updateTopDisplay() {
    setExpressionTop(
        accumulatorStr + 
        OPERATORS_DISPLAY_STR[currentOperatorStr] + 
        currentNumberStr
        );
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
    if ((accumulatorStr !== '' && currentOperatorStr === '') ||
        accumulatorStr === ERROR_MESSAGE) {
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
    // if the number was jus a dot or a minus sign, 
    // it will be treated as a zero
    if (currentNumberStr === '.' || currentNumberStr === '-') {
        currentNumberStr = '0';
    }
    let accumulator = Number(accumulatorStr);
    let operator = currentOperatorStr;
    let number = Number(currentNumberStr);
    // if there is a current operator,
    // the expression on the top of the screen is updated
    if (currentOperatorStr !== '') {
        updateTopDisplay();
    }
    accumulator = operate(operator, accumulator, number);
    if (Number.isNaN(accumulator)) {
        accumulatorStr = ERROR_MESSAGE;
        currentOperatorStr = '';
        currentNumberStr = '';
        return;
    }
    accumulatorStr = accumulator.toString();
    currentOperatorStr = '';
    currentNumberStr = '';
}


// CHANGE OPERATOR
function selectOperator(newOperator) {
    if (accumulatorStr === ERROR_MESSAGE) {
        return;
    }
    if ((currentOperatorStr === '*' ||
        currentOperatorStr === '/') && 
        (newOperator == '-' &&
        currentNumberStr === '')) {
        addNewNumber('-');
        return;
    }
    computeResult();
    updateCurrentOperatorStr(newOperator);
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


// CLEAR ALL FUNCTION
function clear() {
    setExpressionTop('');
    setExpressionBottom('');

    accumulatorStr = '';
    currentNumberStr = '';
    currentOperatorStr = '';
}


// KEY PRESS HANDLER
function typeKey(e) {
    let key = KEY_CODES[e.keyCode];
    if (typeof key === 'number') {
        digitButtons[key].classList.add('btn--press');
        digitButtons[key].click();
        return;
    }
    switch (key) {
        case 'BACKSPACE':
            delButton.classList.add('btn--press');
            delButton.click();
            return;
        case '.':
            dotButton.classList.add('btn--press');
            dotButton.click();
            return;    
        case '+':
        case '-': 
        case '*': 
        case '/':
            operatorButons[key].classList.add('btn--press');
            operatorButons[key].click();
            return;
        case '=':
            equalsBtn.classList.add('btn--press');
            equalsBtn.click();
            return;
        default:
            return;
    }    
}


// BUTTON CLICK HANDLERS
function clickNumber(e) {
    addNewNumber(e.target.textContent);
}

function clickOperator(e) {
    selectOperator(e.target.textContent);
}


// REMOVE TRANSICTION FUNCTION
function removeTransition(e) {
    if (e.propertyName != 'transform') return;
    this.classList.remove('btn--press');
}

// CLICK EVENT LISTENERS
for (const btn in digitButtons) {
    digitButtons[btn].addEventListener('click', clickNumber);
}
doubleOButton.addEventListener('click', clickNumber);
dotButton.addEventListener('click', clickNumber);
delButton.addEventListener('click', removeLastNumber);
for (const btn in operatorButons) {
    operatorButons[btn].addEventListener('click', clickOperatorBtn);
}
equalsBtn.addEventListener('click', selectEquals);
acBtn.addEventListener('click', clear);


// KEY PRESS LISTENERS
window.addEventListener('keydown', typeKey);

// TRANSICTION LISTENERS
for (const btn in digitButtons) {
    digitButtons[btn].addEventListener('transitionend',removeTransition);
}
doubleOButton.addEventListener('transitionend',removeTransition);
dotButton.addEventListener('transitionend',removeTransition);
delButton.addEventListener('transitionend',removeTransition);
for (const btn in operatorButons) {
    operatorButons[btn].addEventListener('transitionend',removeTransition);
}
equalsBtn.addEventListener('transitionend',removeTransition);
acBtn.addEventListener('transitionend',removeTransition);



clear();