import data from './task.json' with { type: 'json' };

const invalidIds = [];

data.forEach(element => {
    const [strInit, strEnd] = element.split('-');
    const init = parseInt(strInit, 10);
    const end = parseInt(strEnd, 10);

    for(let i = init; i <= end; i++) {
        const strValue = i.toString();

        if (strValue.length % 2 === 0) {
            const mid = strValue.length / 2;
            const firstHalf = strValue.slice(0, mid);
            const secondHalf = strValue.slice(mid);

            if (firstHalf === secondHalf) {
                invalidIds.push(i);
                console.log(`Invalid ID found: ${i}`);
            }
        }
    }
});

const sum = invalidIds.reduce((acc, curr) => acc + curr, 0);
console.log(`Sum of invalid IDs: ${sum}`);