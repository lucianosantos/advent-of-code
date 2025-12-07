import diagram from './task.js';

const diagramLines = diagram.split("\n");
const startX = diagramLines[0].indexOf("S");
let splitterHits = 0;
let tachyonPositions = new Set();
tachyonPositions.add(startX);

// We skip 0 where the tachyon originates
for (let i = 1; i < diagramLines.length; i++) {
    const line = diagramLines[i];
    const newTachyonPositions = new Set();

    tachyonPositions.forEach(x => {
        if (line.at(x) === '.') {
            newTachyonPositions.add(x);
        } else if (line.at(x) === '^') {
            splitterHits++;

            if (x > 0) newTachyonPositions.add(x - 1);
            if (x < line.length - 1) newTachyonPositions.add(x + 1);
        }
    });

    tachyonPositions = newTachyonPositions;
}

console.log(`Splitter hits: ${splitterHits}`)