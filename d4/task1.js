import data from './task.json' with { type: 'json' };

let threshold = 4;
let accessiblePaperRollCount = 0;
data.forEach((paperRollRow, rowIndex) => {
    paperRollRow.split("").forEach((paperRollElement, colIndex) => {
        const isPapelRoll = paperRollElement === "@";

        // if it's not a paper roll, don't need to count adjacent elements
        if (!isPapelRoll) return;

        const adjacentPaperRollCount = getAdjacentPaperRollCount(rowIndex, colIndex);
        if (adjacentPaperRollCount < threshold) accessiblePaperRollCount++;
    });
});

console.log(`Total accessible paper rolls: ${accessiblePaperRollCount}`);

function getAdjacentPaperRollCount(row, col) {
    let paperRollCount = 0;
    
    for (let i = 0; i < 3; i++) {
        const searchX = col - 1 + i;

        for (let j = 0; j < 3; j++) {
            const searchY = row - 1 + j;

            // if both are 1, it's the element itself and should not count
            if (i === 1 && j === 1) continue;
            
            const isPositionAPaperRoll = doesPositionHavePaperRoll(searchX, searchY);
            if (isPositionAPaperRoll) {
                paperRollCount++;
            }
        }
    }

    return paperRollCount;
}

function doesPositionHavePaperRoll(x, y) {
    return x >= 0 &&
      y >= 0 &&
      x < data[0].length &&
      y < data.length &&
      data[y][x] == "@";
}