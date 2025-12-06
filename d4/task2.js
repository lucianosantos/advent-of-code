import taskData from './task.json' with { type: 'json' };

const data = sanitizeData(taskData);

let toBeRemoved;
let threshold = 4;
let removedPaperRollCount = 0;

do {
    toBeRemoved = new Array();
    data.forEach((paperRollRow, rowIndex) => {
        paperRollRow.forEach((paperRollElement, colIndex) => {
            const isPapelRoll = paperRollElement === "@";

            // if it's not a paper roll, don't need to count adjacent elements
            if (!isPapelRoll) return;

            const adjacentPaperRollCount = getAdjacentPaperRollCount(rowIndex, colIndex);
            if (adjacentPaperRollCount < threshold) {
                toBeRemoved.push({
                    rowIndex,
                    colIndex
                });
            }
        });
    });

    removedPaperRollCount += toBeRemoved.length;

    toBeRemoved.forEach(({ rowIndex, colIndex }) => {
        data[rowIndex][colIndex] = "x";
    })
} while(toBeRemoved.length);

console.log(`Total removed paper rolls: ${removedPaperRollCount}`);

function sanitizeData(data) {
    const output = [];

    data.forEach(paperRollRowString => {
        output.push(paperRollRowString.split(""));
    });

    return output;
}

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