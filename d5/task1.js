import data from './task.json' with { type: 'json' };

const idRanges = [];
const freshIngredients = new Set();
let index = 0;

for (let element = data[index];
    index < data.length && element;
    ++index, element = data[index]) {
    const strIdRanges = element.split('-');
    idRanges.push({
        min: parseInt(strIdRanges[0]),
        max: parseInt(strIdRanges[1])
    });
};

// index stopped at the blank line
index++;

for (let element = parseInt(data[index]);
    index < data.length;
    ++index, element = parseInt(data[index])) {
    for (let idRangesIndex = 0; idRangesIndex < idRanges.length; idRangesIndex++) {
        const idRange = idRanges[idRangesIndex];
        if (element >= idRange.min &&
            element <= idRange.max) {
            freshIngredients.add(element);
        }
    };
}

console.log(`Total fresh ingredients: ${freshIngredients.size}`)