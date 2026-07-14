"use strict";
const buttons = document.querySelectorAll('.btn'); // it made a constant global variable and detect the type as html button element -- this is document Object
const displayElement = document.querySelector('#display'); // it made a constant global variable and detect the id display as div element -- this is document object in html 
const operators = ['+', '-', '*', '/']; // it made a constant global variable and the data type is array of characters, which means string when combine
if (!displayElement) {
    throw new Error('Display element was not found.');
} // it says if the display element is false or null then it will use a throw new Error class function and tell display element was not found
const display = displayElement; // it made the displayelemt as display for short
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        handleInput(button.textContent || '');
    });
}); // it calls all the button class and seperate each using foreach as button then each button has event listener of click and an arrow function was made inside of the event to handle the content of button in html using handleInput function
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/^[0-9]$/.test(key) || operators.includes(key)) {
        handleInput(key);
        return;
    }
    if (key === 'Enter' || key === '=') {
        handleInput('=');
        return;
    }
    if (key === 'Backspace') {
        handleInput('⌫');
        return;
    }
    if (key === 'Escape' || key.toLowerCase() === 'c') {
        handleInput('C');
    }
}); // this does the same thing as buttons but it only refer into keyboard event meaning it gets the input from keyboard and the first one checks if 0-1 was press in keyboard using regex to detect or if it is from an array of operators then return true or false, the second, third, and fourth is checking if the event key is enter, =, backspace, or escape and c, then they will give a specific key for handleInput
function handleInput(value) {
    switch (value) {
        case 'C':
            clearDisplay();
            break;
        case '=':
            calculateResult();
            break;
        case '⌫':
            deleteLastCharacter();
            break;
        default:
            appendToDisplay(value);
            break;
    }
} // now this is the handle input function that checks what is the handleInput that was given to this function goes, it use switch for different cases, c for Cleardisplay, = for result, Del for delete one char, the default if 3 cases failed then append or add to the last in display value
function clearDisplay() {
    display.textContent = '0';
} // it clears the display to 0 when used
function appendToDisplay(value) {
    const currentDisplay = display.textContent || '0'; // checks the current display if it has some or 0
    const lastCharacter = currentDisplay[currentDisplay.length - 1]; // checks the last char in display by determining the length then minus 1 cause array display starts with 0 but length string method starts with 1
    if (operators.includes(value) && operators.includes(lastCharacter)) {
        display.textContent = currentDisplay.slice(0, -1) + value;
        return;
    } // this I dont understand the logic
    display.textContent = currentDisplay === '0' ? value : currentDisplay + value; // this uses a ternary, change the text content of the display and checks if display is 0 then it will put the value that the handleInput gets, but if not 0 then add the value to the current display
}
function deleteLastCharacter() {
    const currentDisplay = display.textContent || '0';
    display.textContent = currentDisplay.length <= 1 ? '0' : currentDisplay.slice(0, -1);
} // this it says if display text content is less than or equal to 1 then it gives zero as a display, but if not then -1 the display input but I dont know how slice works
function calculateResult() {
    const expression = display.textContent || '0';
    if (!/^[0-9+\-*/.]+$/.test(expression)) {
        display.textContent = 'Error';
        return;
    }
    try {
        const result = Function(`"use strict"; return (${expression})`)();
        display.textContent = Number.isFinite(result) ? String(result) : 'Error';
    }
    catch {
        display.textContent = 'Error';
    }
} // this I dont undertand how it works
console.log();
