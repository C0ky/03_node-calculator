document.addEventListener('DOMContentLoaded', () => {
 

    const display = document.getElementById('display');
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.operator');
    const equalButton = document.querySelector('.equals');
    const clearButton = document.querySelector('.clear');
    const decimalButton = document.querySelector('.decimal');
    const historyList = document.getElementById('history-list');

    //Click event for number buttons
    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            display.value += button.textContent;
        })
    }
    );

    //Click event for operator buttons
    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            display.value = button.textContent;
        })
    })

    //Click event for decimal buttons
    decimalButton.addEventListener('click', () => {
        const lastNumber = display.value.split(/[\+\-\*\/]/).pop();
        if (!lastNumber.includes('.')){
            display.value += '.';
        }
    })
    

    clearButton.addEventListener('click', () => {
        display.value = '';
    })

    equalButton.addEventListener('click', () => {
        if (display.value){
            calculateResult(display.value);
        }
    })

    async function calculateResult(expression) {
        try {
            const response = await fetch('/calculate', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({expression})
            });

            const data = await response.json();

            if (data.error) {
                
            }
        }
    }
})