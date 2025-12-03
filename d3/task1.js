import data from './task.json' with { type: 'json' };

const joltages = [];

data.forEach(powerBank => {
    let firstBatteryIndex;
    let firstBatteryJoltage = 0;
    let secondBatteryJoltage = 0;

    // As there are 2 batteries, we need to test all values but the last
    for(let i = 0; i < powerBank.length - 1; i++) {
        const batteryJoltage = powerBank[i];

        if (batteryJoltage > firstBatteryJoltage) {
            firstBatteryJoltage = batteryJoltage;
            firstBatteryIndex = i;

            // The largest battery possible is 9 joltages, do we don't need to continue looking for a bigger joltage
            if (firstBatteryJoltage == '9') break;
        }
    }

    // As there are 2 batteries, we need to test all values but the last
    for(let i = firstBatteryIndex + 1; i < powerBank.length; i++) {
        const batteryJoltage = powerBank[i];

        if (batteryJoltage > secondBatteryJoltage) {
            secondBatteryJoltage = batteryJoltage;

            if (secondBatteryJoltage == '9') break;
        }
    }

    joltages.push(parseInt(firstBatteryJoltage + secondBatteryJoltage));
});

// Testing specific outputs
console.log(joltages[44])
console.log(joltages[171])
console.log(joltages[199])

console.log(joltages);
console.log(joltages.reduce((acc, curr) => acc + curr, 0));