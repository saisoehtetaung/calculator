const numberButtons = document.querySelectorAll('.number'); 
const operationButtons = document.querySelectorAll('.operation');
const equalButton = document.querySelectorAll('.equal');
const deleteButton = document.querySelectorAll('.delete');
const allClearButton = document.querySelectorAll('.allClear');
const previousResultTextElement = document.querySelector('#previous-result');
const currentResultTextElement = document.querySelector('#current-result');
let currentResult, previousResult;

class Calculator{

    constructor(previousResultTextElement, currentResultTextElement, currentResult ,previousResult){
        this.previousResultTextElement= previousResultTextElement;
        this.currentResultTextElement = currentResultTextElement;
         
        this.currentResult = '';
        this.previousResult = '';
        this.operation = undefined;
    }

    clear(){
        this.currentResult = '';
        this.previousResult = '';
        this.operation = undefined;
    }

    delete(){
        this.currentResult = this.currentResult.toString().slice(0,-1);
    }

    appendNumber(number) {
        if(number === '.' && this.currentResult.includes('.')) return;
        
        this.currentResult = this.currentResult + number.toString();                 
    }

    chooseOperation(operation){
        if(this.currentResult === '') return;
        if(this.previousResult !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousResult = this.currentResult;
        this.currentResult = '';
    }

    compute(){
        let computation;
        let prev = parseFloat(this.previousResult);
        let current = parseFloat(this.currentResult);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation){
            case'+':
                computation = prev + current;
                break;
            case'-':
                computation = prev - current;
                break;
            case'*':
                computation = prev * current;
                break;
            case'/':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentResult = computation;
        this.operation = undefined;
        this.previousResult = '';
    }

    updateDisplay() {
        this.currentResultTextElement.innerHTML = this.currentResult;
        if(this.operation != null){
            this.previousResultTextElement.innerText = `${this.previousResult} ${this.operation}`;
        }else{
            this.previousResultTextElement.innerText = this.previousResult;
        }
    }
}

const calculator = new Calculator(previousResultTextElement,currentResultTextElement,currentResult, previousResult);

numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
});

operationButtons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

equalButton[0].addEventListener('click',button => {
    calculator.compute();
    calculator.updateDisplay()
})

allClearButton[0].addEventListener('click',button => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton[0].addEventListener('click',button => {
    calculator.delete();
    calculator.updateDisplay();
})