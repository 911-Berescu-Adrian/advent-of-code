import * as fs from "fs";

const filepath: string = "./08/input.txt";
const [directions, input] = fs.readFileSync(filepath, "utf-8").split("\r\n\r\n");

type Node = {
    Left: string;
    Right: string;
};

type NodeParsing = {
    Start: string;
    Current: string;
};

function GCD(a: number, b: number): number {
    return b === 0 ? a : GCD(b, a % b);
}

function LCM(a: number, b: number): number {
    return Math.abs(a * b) / GCD(a, b);
}

const getStepsToEnd = (startNode: NodeParsing) => {
    let steps = 0;
    while (startNode.Current[startNode.Current.length - 1] !== "Z") {
        if (directions[steps % directions.length] === "L") startNode.Current = nodes[startNode.Current].Left;
        else startNode.Current = nodes[startNode.Current].Right;
        steps++;
    }
    console.log(startNode);
    return steps;
};

var nodes: { [key: string]: Node } = {};
var startNodes: NodeParsing[] = [];

input.split("\r\n").forEach((node) => {
    let current = node.split("=")[0].trim();
    let [left, right] = node.split("=")[1].trim().split(",");
    left = left.slice(1, left.length).trim();
    right = right.slice(0, right.length - 1).trim();
    nodes[current] = { Left: left, Right: right };

    if (current[current.length - 1] === "A") startNodes.push({ Start: current, Current: current });
});

let stepsArray: number[] = [];

startNodes.forEach((node) => {
    stepsArray.push(getStepsToEnd(node));
});

const steps = stepsArray.reduce((acc, curr) => LCM(acc, curr), 1);
console.log(steps);
