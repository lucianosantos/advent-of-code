import data from './task.json' with { type: 'json' };

const joltages = [];

data.forEach(powerBank => {
    let batteryIndex = -1;
    const powerBankJoltage = [];

    for (let i = 12; i > 0; i--) {
        const { outputJoltage, batteryIndex: foundBatteryIndex } = 
            get(powerBank, batteryIndex + 1, i - 1);

        batteryIndex = foundBatteryIndex;
        powerBankJoltage.push(outputJoltage);

    }

    joltages.push(parseInt(powerBankJoltage.join('')));
});

function get(powerBank, batteryStartIndex, batteriesToFind) {
    let outputJoltage = 0;
    let batteryIndex;
    
    // As there are x batteries, we need to test all values but the batteries still to be found
    for(let i = batteryStartIndex; i < powerBank.length - batteriesToFind; i++) {
        const batteryJoltage = powerBank[i];

        if (batteryJoltage > outputJoltage) {
            outputJoltage = batteryJoltage;
            batteryIndex = i;

            // The largest battery possible is 9 joltages, do we don't need to continue looking for a bigger joltage
            if (outputJoltage == '9') break;
        }
    }

    return { outputJoltage, batteryIndex };
}

// Testing specific outputs
console.log(joltages[22]) // Many 7s and 7 is the highest
console.log(joltages[25]) // Many 9s
console.log(joltages[199])

console.log(joltages);
console.log(joltages.reduce((acc, curr) => acc + curr, 0));