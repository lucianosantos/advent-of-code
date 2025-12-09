import data from './task.js';
const connections = 1000;

const junctionBoxes = data
    .split("\n")
    .map(strPoints => {
        const [x, y, z] = strPoints.split(',');
        return {
            x, y, z,
            connections: {}
        }
    });

const distances = getDistances();

// Arrange by shortest distances
distances.sort(({distance: d1}, {distance: d2}) => d1 - d2);

const circuits = getCircuits(distances);
const uniqueCircuitBoxesSizes = getUniqueCircuitBoxesSizes(circuits);

uniqueCircuitBoxesSizes.sort((s1, s2) => s1 - s2);

const largestCircuits = [
    uniqueCircuitBoxesSizes.at(-1),
    uniqueCircuitBoxesSizes.at(-2),
    uniqueCircuitBoxesSizes.at(-3),
];

const mult = largestCircuits.reduce((acc, current) => (acc || 1) * current, 0)

console.log(largestCircuits)
console.log(mult)

function getDistances() {
    const distances = [];

    junctionBoxes.forEach((junctionBox1, index) => {
        // We start from the current box, to avoid comparing Box1 and Box2 + Box2 and Box1
        for(let nextBoxIndex = index + 1; nextBoxIndex < junctionBoxes.length; nextBoxIndex++) {
            const junctionBox2 = junctionBoxes[nextBoxIndex];
            const distance = calculate3DDistance(junctionBox1, junctionBox2);

            distances.push({distance, junctionBox1, junctionBox2});
        }
    });

    return distances;
}

function calculate3DDistance({x: x1, y: y1, z: z1}, {x: x2, y: y2, z: z2}) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dz = z2 - z1;

  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

function getCircuits(distances) {
    const slicedDistances = distances.slice(0, connections);

    // Connects the junctions boxes
    slicedDistances.forEach(({junctionBox1, junctionBox2}) => {
        const { x: x1, y: y1, z: z1 } = junctionBox1;
        const { x: x2, y: y2, z: z2 } = junctionBox2;

        junctionBox1.connections[`${x2}-${y2}-${z2}`] = junctionBox2;
        junctionBox2.connections[`${x1}-${y1}-${z1}`] = junctionBox1;
    });

    return slicedDistances.map(({junctionBox1}) => getCircuit(junctionBox1));
}

function getCircuit(junctionBox, circuit = {}) {
    const { x, y, z } = junctionBox;

    if (!circuit[`${x}-${y}-${z}`]) {
        circuit[`${x}-${y}-${z}`] = junctionBox;
        Object.values(junctionBox.connections).forEach(childJunctionBox => getCircuit(childJunctionBox, circuit));
    }

    return circuit;
}

function getUniqueCircuitBoxesSizes(circuits) {
    const uniqueCircuitBoxes = [];
    const uniqueCircuitBoxesSizes = [];

    circuits.forEach(circuit => {
        const circuitboxesPositions = new Set(Object.keys(circuit));
        const isInList = uniqueCircuitBoxes.some(uniqueCircuit => uniqueCircuit.intersection(circuitboxesPositions).size === uniqueCircuit.size)

        if (!isInList) {
            uniqueCircuitBoxes.push(circuitboxesPositions);
            uniqueCircuitBoxesSizes.push(circuitboxesPositions.size);
        }
    });

    return uniqueCircuitBoxesSizes;
}