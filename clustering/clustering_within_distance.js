module.exports = {
    clusterWithinDistance
}

/**
 * this function will accept a list of position { x, y } and a distance, and then
 *  cluster the position within the given distance.
 * 
 * @param {{x: number, y: number}[]} positions
 * @param {number} distance
 * 
 * @returns {{ x: number, y: number, positions: { x: number, y: number }[]}[]} 
 *  x, y is the centroid of this cluster, it could be same as the first item in
 *      positions, if only one item in the positions
 */
function clusterWithinDistance(positions, distance) {
    let clusters = [];

    generateKey(positions);

    // record all calculated positions' distance
    //  { position1: { position2: distance, position3: distance } }
    // const distances = {};
    // map position to its belonged clusters
    const clusters_obj = {};

    positions.forEach(position => {
        const positionNDistance = getClosestPositionNDistance(position, positions);
        // if (!distances[position.key])
        //     distances[position.key] = {};
        // distances[position.key][positionNDistance.closestPosition.key] = positionNDistance.distance;
        // if (!distances[positionNDistance.closestPosition.key])
        //     distances[positionNDistance.closestPosition.key] = {};
        // distances[positionNDistance.closestPosition.key][position.key] = positionNDistance.distance;

        // check if the closet position's distance is less than the given distance
        //  if so, need to check if either this position or its closest position is already in a cluster
        //      if so, need to check either this cluster or a new cluster this position need to join
        //      if not, create a new cluster with its closest position
        //  if not, this position will not be clustered with any other positions
        if (positionNDistance.distance <= distance) {
            let needToCreateNewCluster = true;
            if (clusters_obj[position.key] || clusters_obj[positionNDistance.closestPosition.key]) {
                // this position is already in another cluster
                if (clusters_obj[position.key]) {
                    // curr position has a cluster,
                    //  we check if its closest position is already in its cluster
                    //  then we check if its closest position is able to join
                    if (clusters_obj[position.key].positions.includes(positionNDistance.closestPosition)) {
                        // already have its closest position in the cluster, no need to check could join or 
                        //  create new cluster
                        needToCreateNewCluster = false;
                    } else if (isPositionAbleToJoinCluster(positionNDistance.closestPosition, clusters_obj[position.key], distance)) {
                        // its closest position is able to join
                        //  then we join its closest position to curr position's cluster
                        clusters_obj[position.key].positions.push(positionNDistance.closestPosition);
                        const centroid = getCentroid(clusters_obj[position.key].positions);
                        clusters_obj[position.key].x = centroid.x;
                        clusters_obj[position.key].y = centroid.y;

                        clusters_obj[positionNDistance.closestPosition.key] = clusters_obj[position.key];
``
                        needToCreateNewCluster = false;
                    } else {
                        // its closed position is unable to join
                        //  curr position will leave its cluster and create a new one with its closed position
                        clusters_obj[position.key].positions.splice(
                            clusters_obj[position.key].positions.indexOf(position),
                            1
                        );
                    }
                } else if (clusters_obj[positionNDistance.closestPosition.key]) {
                    //  its closest position has a cluster,
                    //      we check if curr position is already in its closest position's cluster
                    //      the we check if curr position is able to join
                    if (clusters_obj[positionNDistance.closestPosition.key].positions.includes(position)) {
                        // already have curr position in the cluster, no need to check could join or 
                        //  create new cluster
                        needToCreateNewCluster = false;
                    } else if (isPositionAbleToJoinCluster(position, clusters_obj[positionNDistance.closestPosition.key], distance)) {
                        // curr position is able to join
                        //  join it into its closest position's cluster
                        clusters_obj[positionNDistance.closestPosition.key].positions.push(position);
                        const centroid = getCentroid(clusters_obj[positionNDistance.closestPosition.key].positions);
                        clusters_obj[positionNDistance.closestPosition.key].x = centroid.x;
                        clusters_obj[positionNDistance.closestPosition.key].y = centroid.y;

                        clusters_obj[position.key] = clusters_obj[positionNDistance.closestPosition.key];

                        needToCreateNewCluster = false;
                    } else {
                        // curr position is unable to join
                        // it will create a new cluster and it's the only position in this cluster
                        const cluster = {
                            x: position.x,
                            y: position.y,
                            positions: [position]
                        };
                        clusters_obj[position.key] = cluster;
            
                        clusters.push(cluster);

                        needToCreateNewCluster = false;
                    }
                }
            } 

            if (needToCreateNewCluster) {
                // this position curr is not belonging to any cluster
                const cluster = {
                    positions: [ position, positionNDistance.closestPosition ]
                };
                const centroid = getCentroid(cluster.positions);
                cluster.x = centroid.x;
                cluster.y = centroid.y;

                clusters_obj[position.key] = cluster;

                clusters_obj[positionNDistance.closestPosition.key] = cluster;

                clusters.push(cluster);
            }
        } else {
            const cluster = {
                x: position.x,
                y: position.y,
                positions: [position]
            };
            clusters_obj[position.key] = cluster;

            clusters.push(cluster);
        }

    });

    return clusters;
}

/**
 * 
 * @param {{ x: number, y: number, key: any }} targetPosition 
 * @param {{ x: number, y: number, key: any }[]} positions
 */
function getClosestPositionNDistance(targetPosition, positions) {
    let closestPosition = null;
    let distance = Number.MAX_VALUE;

    positions.forEach(position => {
        // no need to compare the same position as targetPosition
        if (position.key === targetPosition.key)
            return;

        const currDistance = getDistance(targetPosition, position);
        if (currDistance < distance) {
            distance = currDistance;
            closestPosition = position;
        }
    });

    return {
        closestPosition,
        distance
    }
}

function getDistance(position1, position2) {
    return Math.sqrt(Math.pow((position1.x - position2.x), 2) + Math.pow((position1.y - position2.y), 2))
}

/**
 * 
 * @param {{ x: number, y: number }[]} positions 
 * @param {{ x: number, y: number }} position 
 */
function removeItem(positions, position) {
    let index = positions.indexOf(position);
    let newPositions = positions.slice();
    newPositions.splice(index, 1);
    return newPositions;
}

/**
 * this function generate a unique key for each position
 * 
 * @param {{ x: number, y: number }[]} positions 
 */
function generateKey(positions) {
    positions.forEach((position, index) => {
        position.key = index;
    })
}

function getCentroid(positions) {
    let minX = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;
    let minY = Number.MAX_VALUE;
    let maxY = Number.MIN_VALUE;
    positions.forEach(position => {
        if (position.x < minX)
            minX = position.x;
        
        if (position.x > maxX)
            maxX = position.x;

        if (position.y < minY)
            minY = position.y;
    
        if (position.y > maxY)
            maxY = position.y;
    });

    return {
        x: (maxX - minX) / 2 + minX,
        y: (maxY - minY) / 2 + minY
    }
}

function isPositionAbleToJoinCluster(position, cluster, distance) {
    let res = true;

    for (let i = 0; i < cluster.positions.length; i++) {
        if (getDistance(position, cluster.positions[i]) > distance) {
            res = false;
            break;
        }
    }

    return res;
}
