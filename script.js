/**
 * Creating the Calculator Class that carries all the basic functions of a calculator
 */
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    /**
     * the All Clear function
     */
    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    /**
     * The Delete function
     */
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    /**
     * The function to append and concatenate the numbers on the UI
     * @param {*} number 
     * @returns 
     */
    appendNumber(number) {
        if(number === "." && this.currentOperand.includes(".")) {
            return;
        }
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    /**
     * Function to choose operation
     * @param {*} operation 
     * @returns 
     */
    chooseOperation(operation) {
        if(this.currentOperand === "") {
            return;
        }
        if(this.previousOperand !== "") {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    /**
     * Function to compute based on the operation chosen. It uses the Switch statement
     * @returns 
     */
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);

        if(isNaN(prev) || isNaN(current)) {
            return;
        }
        switch(this.operation) {
            case "+" :
                computation = prev + current;
                break;
            case "-" :
                computation = prev - current;
                break;
            case "*" :
                computation = prev * current;
                break;
            case "÷" :
                computation = prev / current;
                break;
            default:
                return;
        }

        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    /**
     * This function deals with decimal numbers in order to compute properly
     * @param {*} number 
     * @returns 
     */
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay = ""
        }
        else {
            integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0})
        }

        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }
        else {
            return integerDisplay;
        }
    }

    /**
     * This function works on updating the display whenever any number or operation is clicked
     */
    updateDisplay() {
        this.currentOperandTextElement.textContent = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null) {
            this.previousOperandTextElement.textContent = `${this.previousOperand} ${this.operation}`;
        }
        else {
            this.previousOperandTextElement.textContent = "";
        }
    }
}

/**
 * Selecting elements for use
 */
const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

/**
 * Assigning a variable to the calculator class created above
 */
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

/**
 * A forEach loop that adds the click eventListener to each of the number buttons.
 */
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    });
});

/**
 * A forEach loop that adds the click eventListener to each of the operation buttons.
 */
operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.textContent);
        calculator.updateDisplay();
    });
});

/**
 * An eventListener for the equals button
 */
equalsButton.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
});

/**
 * An eventListener for the All Clear button
 */
allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
});

/**
 * An eventListener for the Delete button
 */
deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
});