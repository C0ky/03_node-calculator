document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const equalsButton = document.querySelector('.equals');
    const clearButton = document.querySelector('.clear');
    const decimalButton = document.querySelector('.decimal');
    const historyList = document.getElementById('history-list');
    
    // Add click event for number buttons
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            display.value += button.textContent;
        });
    });
    
    // Add click event for operator buttons
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            display.value += button.textContent;
        });
    });
    
    // Add click event for decimal button
    decimalButton.addEventListener('click', () => {
        // Prevent multiple decimals in a number
        const lastNumber = display.value.split(/[\+\-\*\/]/).pop();
        if (!lastNumber.includes('.')) {
            display.value += '.';
        }
    });
    
    // Add click event for clear button
    clearButton.addEventListener('click', () => {
        display.value = '';
    });
    
    // Add click event for equals button
    equalsButton.addEventListener('click', () => {
        if (display.value) {
            calculateResult(display.value);
        }
    });
    
    // Function to calculate result using the Node.js backend
    async function calculateResult(expression) {
        try {
            const response = await fetch('/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ expression })
            });
            
            const data = await response.json();
            
            if (data.error) {
                alert('Error: ' + data.error);
                return;
            }
            
            // Add to history
            addToHistory(`${expression} = ${data.result}`);
            
            // Update display with result
            display.value = data.result;
            
        } catch (error) {
            console.error('Error calculating result:', error);
            alert('Error calculating result. Check console for details.');
        }
    }
    
    // Function to add calculation to history
    function addToHistory(calculation) {
        const listItem = document.createElement('li');
        listItem.textContent = calculation;
        historyList.prepend(listItem);
        
        // Limit history to 10 items
        if (historyList.children.length > 10) {
            historyList.removeChild(historyList.lastChild);
        }
    }
    
    // Add keyboard support
    document.addEventListener('keydown', (event) => {
        // Numbers and operators
        if (/^[0-9+\-*/.()]$/.test(event.key)) {
            display.value += event.key;
        }
        // Equals and Enter
        else if (event.key === '=' || event.key === 'Enter') {
            if (display.value) {
                calculateResult(display.value);
            }
            event.preventDefault();
        }
        // Backspace
        else if (event.key === 'Backspace') {
            display.value = display.value.slice(0, -1);
        }
        // Escape/Clear
        else if (event.key === 'Escape') {
            display.value = '';
        }
    });
});