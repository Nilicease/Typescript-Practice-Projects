const buttons = document.querySelectorAll<HTMLButtonElement>('.btn');
const displayElement = document.querySelector<HTMLDivElement>('#display')
const operators = ['+', '-', '*', '/']; 

if (!displayElement) {
    throw new Error('Display element was not found.');
} 

const display = displayElement;

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        handleInput(button.textContent || '');
    });
}); 

document.addEventListener('keydown', (event: KeyboardEvent) => {
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
});

function handleInput(value: string): void {
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
} 

function clearDisplay(): void {
    display.textContent = '0';
} 

function appendToDisplay(value: string): void {
    const currentDisplay = display.textContent || '0';
    const lastCharacter = currentDisplay[currentDisplay.length - 1];

    if (operators.includes(value) && operators.includes(lastCharacter)) {
        display.textContent = currentDisplay.slice(0, -1) + value;
        return;
    } 

    display.textContent = currentDisplay === '0' ? value : currentDisplay + value;
}

function deleteLastCharacter(): void {
    const currentDisplay = display.textContent || '0';

    display.textContent = currentDisplay.length <= 1 ? '0' : currentDisplay.slice(0, -1);
} 

function calculateResult(): void {
    const expression = display.textContent || '0';

    if (!/^[0-9+\-*/.]+$/.test(expression)) {
        display.textContent = 'Error';
        return;
    }

    try {
        const result = Function(`"use strict"; return (${expression})`)();
        display.textContent = Number.isFinite(result) ? String(result) : 'Error';
    } catch {
        display.textContent = 'Error';
    }
}
