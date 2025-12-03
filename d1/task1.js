// import task1.json that contains the data
import data from './task.json' with { type: 'json' };

const initialPosition = 50;
let position = initialPosition;
let zeroCount = 0;

data.forEach(element => {
    const direction = element[0];
    const distance = parseInt(element.slice(1), 10);

    if (direction === 'L') {
        position -= distance;
    } else if (direction === 'R') {
        position += distance;
    }

    if (Math.abs(position % 100) === 0) {
        zeroCount++;
    }
});

console.log(`The position was zero ${zeroCount} times.`);