import diagram from './task.js';

const diagramLines = diagram.split("\n");
const startX = diagramLines[0].indexOf("S");
const positionLimit = diagramLines[0].length - 1;
let tachyonPositions = { [startX]: 1 };

// We skip 0 where the tachyon originates
for (let i = 1; i < diagramLines.length; i++) {
    const line = diagramLines[i];
    
    if (!line.trim()) break;

    const newTachyonPositions = {};

    Object.keys(tachyonPositions).forEach(position => {
        const numPos = parseInt(position);
        const qtyOnPos = tachyonPositions[position];

        if (line.at(position) === '.') {
            addOrCreate(newTachyonPositions, numPos, qtyOnPos, positionLimit);
        } else if (line.at(position) === '^') {
            addOrCreate(newTachyonPositions, numPos - 1, qtyOnPos, positionLimit);
            addOrCreate(newTachyonPositions, numPos + 1, qtyOnPos, positionLimit);
        }
    });

    tachyonPositions = newTachyonPositions;
}

function addOrCreate(tachyonPositions, position, qtyOnPos, positionLimit) {
    if (position < 0 || position > positionLimit) return;
    tachyonPositions[position] = (tachyonPositions[position] || 0) + qtyOnPos;
}

const possibilities = Object.values(tachyonPositions).reduce((acc, curr) => acc + curr, 0);
console.log(`Possible realities: ${possibilities}`);