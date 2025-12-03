import data from './task.json' with { type: 'json' };

const invalidIds = [];

data.forEach(element => {
    const [strInit, strEnd] = element.split('-');
    const init = parseInt(strInit, 10);
    const end = parseInt(strEnd, 10);

    for(let i = init; i <= end; i++) {
        const strValue = i.toString();

        for (let j = 1; j <= strValue.length / 2; j++) {
            if (strValue.length % j !== 0) {
                continue;
            }
            
            const regex = new RegExp(`(${'.'.repeat(j)})`, "g");
            const uniqueValues = new Set(strValue.split(regex).filter(char => char !== ''));
            
            if (uniqueValues.size === 1) {
                invalidIds.push(i);
                console.log(strValue, j, regex, uniqueValues)
                break;
            }
        }
    }
});

const sum = invalidIds.reduce((acc, curr) => acc + curr, 0);
console.log(`Sum of invalid IDs: ${sum}`);