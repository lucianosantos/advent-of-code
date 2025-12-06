import taskData from './task.js';

const lines = taskData
    // Data may have different spaces between elements
    .replaceAll(/ {2,}/g, ' ')
    // Data is a string organized by line break
    .split("\n")
    .map(line => line.trim())
    // Remove empty lines
    .filter(line => line)
    // Transform each line into an Array;
    .map(line => line.split(" "));

const invertedMatrix = new Array(lines[0].length);
for(let i = 0; i < invertedMatrix.length; i++) {
    // The .fill() function uses the same param object, so we would the same reference Array in every position
    invertedMatrix[i] = new Array();
}

// Invert the [x, y] matrix, so each subarray contains the values and its operation
for(let x = 0; x < lines.length; x++) {
    const line = lines[x];
    for (let y = 0; y < line.length; y++) {
        invertedMatrix[y][x] = line[y];
    }
}

let totalValue = 0;
invertedMatrix.forEach(arrayToDoMath => {
    const operation = arrayToDoMath.pop();

    const totalLineValue = arrayToDoMath.reduce((acc, value) => {
        if (!acc) return parseInt(value);
        switch(operation) {
            case "+": return acc + parseInt(value);
            case "-": return acc - parseInt(value);
            case "*": return acc * parseInt(value);
            case "/": return acc / parseInt(value);
        }
    }, 0);

    totalValue += totalLineValue;
});

console.log(totalValue)