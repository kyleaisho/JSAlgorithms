/**
 * @param {number} N
 * @param {number[][]} paths
 * @return {number[]}
 */
var gardenNoAdj = function(numOfGardens, paths) {
  const graph = constructGraph(numOfGardens, paths);
  // console.log(graph)
  plant(graph);

  return graph.map(({ plant }) => plant);
};

const plant = graph => {
  graph.forEach(node => {
    const currPlant = node.plant || 1;
    node.plant = currPlant;
    const usedPlants = new Set();
    usedPlants.add(currPlant);
    node.paths.forEach(({ plant }) => {
      if (plant) usedPlants.add(plant);
    });
    const plants = [1, 2, 3, 4].filter(plant => !usedPlants.has(plant));

    node.paths.forEach(garden => {
      if (!garden.plant) {
        const gardenPaths = garden.paths;
        const neighboringPlants = new Set();
        gardenPaths.forEach(({ plant }) => neighboringPlants.add(plant));
        const possible = plants.filter(p => !neighboringPlants.has(p));
        garden.plant = possible[0];
      }
    });
  });
};

function Node(num) {
  this.num = num;
  this.plant;
  this.paths = [];
}

const constructGraph = (numOfGardens, paths) => {
  const adjList = new Array(numOfGardens);
  for (let i = 0; i < adjList.length; i++) {
    // create a node for each of the gardens
    adjList[i] = new Node(i);
  }

  // draw the connections
  paths.forEach(path => {
    const [first, neighbor] = path;
    const startNode = adjList[first - 1];
    const endNode = adjList[neighbor - 1];

    // Draw the bidrectional path
    startNode.paths.push(endNode);
    endNode.paths.push(startNode);
  });

  return adjList;
};
