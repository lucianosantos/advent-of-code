import taskData from './task.js';

const lines = taskData
    // Data is a string organized by line break
    .split("\n")
    // Remove empty lines
    .filter(line => line);

const operationSignsIndexes = [];
const operations = [];
const operationsLine = lines.pop();

// First we need to know the char range each number use
for (let i = 0; i < operationsLine.length; i++) {
    const operation = operationsLine[i];

    if (operation.trim()) {
        operationSignsIndexes.push(i);
        operations.push(operation.trim());
    }
}

operationSignsIndexes.push(operationsLine.length + 1);

const invertedMatrix = new Array();

for (let i = 0; i < operationSignsIndexes.length - 1; i++) {
    const firstIndex = operationSignsIndexes[i];
    const lastIndex = operationSignsIndexes[i + 1] - 1;
    
    const numberStringsForThisOperation = new Array();
    for(let j = 0; j < lines.length; j++) {
        // The .fill() function uses the same param object, so we would the same reference Array in every position
        numberStringsForThisOperation.push(new Array(lastIndex - firstIndex));
    }
    invertedMatrix.push(numberStringsForThisOperation);
    
    lines.forEach((line, lineIndex) => {
        const value = line.substring(firstIndex, lastIndex);
        
        for (let valueIndex = 0; valueIndex < value.length; valueIndex++) {
            numberStringsForThisOperation[lineIndex][valueIndex] = value.charAt(valueIndex);
        }
    });

}

console.log(invertedMatrix)

const numbersArray = new Array();

for(let i = 0; i < invertedMatrix.length; i++) {
    // Nums to sum [['1', '2', '3'], [' ', '4', '5'], [' ', ' ', '6'], [' ', ' ', '7']]
    const numberAsCharArrays = invertedMatrix[i];
    const strangeMathNumberArrays = new Array(numberAsCharArrays[0].length);
    
    for(let j = 0; j < strangeMathNumberArrays.length; j++) {
        // The .fill() function uses the same param object, so we would the same reference Array in every position
        strangeMathNumberArrays[j] = new Array(numberAsCharArrays.length);
    }

    for(let j = 0; j < numberAsCharArrays.length; j++) {
        // Num as char array ['1', '2', '3']
        const numberAsCharArray = numberAsCharArrays[j];

        for(let k = 0; k < numberAsCharArray.length; k++) {
            // char '1'
            const numberAsChar = numberAsCharArray[k];

            strangeMathNumberArrays[k][j] = numberAsChar;
        }
    }

    numbersArray.push(strangeMathNumberArrays.map(numberAsCharArray => parseInt(numberAsCharArray.join(''))));
}

console.log(numbersArray)

let totalValue = 0;
numbersArray.forEach((arrayToDoMath, index) => {
    const operation = operations[index];

    const totalLineValue = arrayToDoMath.reduce((acc, value) => {
        if (!acc) return value;
        switch(operation) {
            case "+": return acc + parseInt(value);
            case "-": return acc - parseInt(value);
            case "*": return acc * parseInt(value);
            case "/": return acc / parseInt(value);
        }
    }, 0);

    totalValue += totalLineValue;
});

console.log(`Total value: ${totalValue}`);
