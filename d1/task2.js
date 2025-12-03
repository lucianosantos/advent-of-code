// import task1.json that contains the data
import data from './task.json' with { type: 'json' };

const initialPosition = 50;
let position = initialPosition;
let zeroCount = 0;

console.log(`Current position: ${position}`);
data.forEach(element => {
    const direction = element[0];
    // The distance can be 237, but the 200 would be 2 complete rounds in the circle, so we can ignore
    const fullDistance = parseInt(element.slice(1), 10);
    const completeRounds = Math.floor(fullDistance / 100);
    const distance = fullDistance - completeRounds * 100;

    const positionBefore = position;
    if (direction === 'L') {
        position -= distance;
        if (position === 0) {
            zeroCount++;
        } else if (position < 0) {
            if (positionBefore !== 0) zeroCount++;
            position += 100;
        }
    } else if (direction === 'R') {
        position += distance;
        if (position >= 100) {
            zeroCount++;
            position -= 100;
        }
    }

    zeroCount += completeRounds;
});

console.log(`The position was zero ${zeroCount} times.`);