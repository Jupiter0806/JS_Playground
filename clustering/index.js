const { clusterWithinDistance } = require('./clustering_within_distance');

const _positions = [
    { x: 1, y: 0 },
    { x: 2, y: 0 },
    { x: 3, y: 0 },
    { x: 4, y: 0 },
    { x: 5, y: 0 },
    { x: 6, y: 0 },
];

console.log(JSON.stringify(clusterWithinDistance(_positions, 1), null, 4));
