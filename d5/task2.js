import data from './task.json' with { type: 'json' };

const idRanges = [];
let index = 0;

for (let element = data[index];
    index < data.length && element;
    ++index, element = data[index]) {
    const strIdRanges = element.split('-');
    const minId = parseInt(strIdRanges[0]);
    const maxId = parseInt(strIdRanges[1]);

    idRanges.push({
        minId,
        maxId
    })
};

for (let i = 0; i < idRanges.length;) {
    const { minId, maxId } = idRanges[i];
    const { action, index: indexToRemove, range: newRange } = undupeRange(idRanges, i, minId, maxId);

    switch(action) {
        case "keep":
            i++;
            break;
        case "replace":
            idRanges.splice(i, 1, newRange)
            break;
        case "remove":
            idRanges.splice(indexToRemove, 1);
            if (indexToRemove !== i) i--;
            break;
    }
}

const totalFreshIds = idRanges.reduce((acc, { minId, maxId }) => acc + maxId - minId + 1, 0)
console.log(`Total fresh ids: ${totalFreshIds}`)

function undupeRange(ranges, currentRangeIndex, currentMinId, currentMaxId) {
    for(let i = 0; i < currentRangeIndex; i++) {
        const { minId, maxId } = ranges[i];
        const isMinIn = currentMinId >= minId && currentMinId <= maxId;
        const isMaxIn = currentMaxId >= minId && currentMaxId <= maxId;

        // Current item is within the prior range. Remove the current range
        // Prior:       ------------
        // Current:        ------
        if (currentMinId >= minId && currentMaxId <= maxId) {
            return {
                action: "remove",
                index: currentRangeIndex
            };
        }
        // Current item does not have any intersection with the prior range. Keep the range
        // Prior:       ------------
        // Current:                   ----------------
        // Return:                    ----------------
        else if (currentMinId > maxId || currentMaxId < minId) continue;
        // Current item starts within the prior range, but finishes after. Crop the range
        // Prior:       ------------
        // Current:          ------------
        // Return:                  -----
        else if (isMinIn) {
            return {
                action: "replace",
                range: { minId: maxId + 1, maxId: currentMaxId }
            };
        }
        // Current item ends within the prior range, but starts before. Crop the range
        // Prior:         ------------
        // Current:  ----------
        // Return:   -----
        else if (isMaxIn) {
            return {
                action: "replace",
                range: { minId: currentMinId, maxId: minId - 1 }
            };
        }
        // Prior item is within the current range. Remove the prior range
        // Prior:          ------
        // Current:     ------------
        else {
            return {
                action: "remove",
                index: i
            };
        }
    }

    return { action: "keep" };
}