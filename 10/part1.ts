import * as fs from "fs";

const filepath: string = "./10/input.txt";
const content = fs.readFileSync(filepath, "utf-8").split("\r\n");

type Pipe = "|" | "-" | "L" | "J" | "7" | "F";

type Direction = "north" | "east" | "south" | "west";

type Neighbours = {
    [element in Pipe]: Record<Direction, Pipe[]>;
};

const neighbours: Neighbours = {
    "|": {
        north: ["F", "7"],
        east: [],
        south: ["L", "J"],
        west: [],
    },
    "-": {
        north: [],
        east: ["7", "J"],
        south: [],
        west: ["L", "F"],
    },
    F: {
        north: [],
        east: ["-"],
        south: ["|"],
        west: [],
    },
    "7": {
        north: [],
        east: [],
        south: ["|"],
        west: ["-"],
    },
    L: {
        north: ["|"],
        east: ["-"],
        south: [],
        west: [],
    },
    J: {
        north: ["|"],
        east: [],
        south: [],
        west: ["-"],
    },
};

type PipeCoords = {
    Pipe: Pipe | "S";
    X: number;
    Y: number;
};

const isPipe = (input: string) => {
    return (
        input === "|" ||
        input === "-" ||
        input === "L" ||
        input === "J" ||
        input === "7" ||
        input === "F" ||
        input === "S"
    );
};

const toPipe = (input: string) => {
    return input as Pipe;
};

// N, E, S, W
var directionsX = [-1, 0, 1, 0];
var directionsY = [0, 1, 0, -1];

var pipes: Map<PipeCoords, number> = new Map();

console.log(neighbours["-"]);

var globalSteps = 0;

const isNeighbour = (current: PipeCoords, next: PipeCoords) => {};

const findLoopMaxDistance = (startingPoint: PipeCoords, previousPoint: PipeCoords, steps: number) => {
    if (startingPoint.Pipe === "S" && steps > 0) return steps;
    globalSteps = steps;
    for (let i = 0; i < directionsX.length; ++i) {
        let x = startingPoint.X + directionsX[i];
        let y = startingPoint.Y + directionsY[i];
        if (x === previousPoint.X && y === previousPoint.Y) continue;
        if (isPipe(content[x][y])) {
            // check if is neighbour
            let nextPoint: PipeCoords = { Pipe: toPipe(content[x][y]), X: x, Y: y };
            console.log(nextPoint, startingPoint);
            if (pipes.has(startingPoint)) {
                let val = Math.min(pipes.get(startingPoint) || 0, steps);
                pipes.set(startingPoint, val);
            } else {
                pipes.set(startingPoint, steps);
            }
            findLoopMaxDistance(nextPoint, startingPoint, steps + 1);

            break; // maybe shouldnt break to check all neighbours in case of dead ends
        }
    }
};

content.forEach((line, index) => {
    if (line.includes("S")) {
        findLoopMaxDistance({ Pipe: "S", X: index, Y: line.indexOf("S") }, { Pipe: "-", X: -1, Y: -1 }, 0);
    }
});

// pipes.clear();
let test: PipeCoords = { Pipe: "|", X: 2, Y: 1 };
// pipes.set(test, 4);
// let val = Math.min(pipes.get(test) || 0, 5);
// pipes.set(test, val);

type Coords = {
    X: number;
    Y: number;
};

var coords: Map<Coords, number> = new Map();

// pipes.forEach((value, key) => {
//     console.log("(", key.X, key.Y, ")", value);
// });

// console.log(coords);
//console.log(pipes);
console.log((globalSteps + 1) / 2);
