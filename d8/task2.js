import data from './task.js';

let found = false;
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

connectJunctionsBoxes(distances);

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

function connectJunctionsBoxes(distances) {
    for (let i = 0; i < distances.length; i++) {
        const { junctionBox1, junctionBox2 } = distances[i];

        const { x: x1, y: y1, z: z1 } = junctionBox1;
        const { x: x2, y: y2, z: z2 } = junctionBox2;
        
        junctionBox1.connections[`${x2}-${y2}-${z2}`] = junctionBox2;
        junctionBox2.connections[`${x1}-${y1}-${z1}`] = junctionBox1;

        const connectedPositions = getConnectedJunctionBoxes(junctionBox1);
        const size = Object.keys(connectedPositions).length;

        if (size === junctionBoxes.length && !found) {
            found = !found;
            console.log(junctionBoxes.length, junctionBox1.x, junctionBox2.x);
            console.log(junctionBox1.x * junctionBox2.x);
            return;
        }
    };
}

function getConnectedJunctionBoxes(junctionBox, connectedPositions = {}) {
    const { x, y, z } = junctionBox;

    if (!connectedPositions[`${x}-${y}-${z}`]) {
        connectedPositions[`${x}-${y}-${z}`] = junctionBox;
        const connections = Object.values(junctionBox.connections);
        connections.forEach(childJunctionBox => getConnectedJunctionBoxes(childJunctionBox, connectedPositions));
    }

    return connectedPositions;
}