import * as fs from "fs";

const filepath: string = "./08/input.txt";
const [directions, input] = fs.readFileSync(filepath, "utf-8").split("\r\n\r\n");

type Node = {
    Left: string;
    Right: string;
};

var nodes: { [key: string]: Node } = {};

input.split("\r\n").forEach((node) => {
    let current = node.split("=")[0].trim();
    let [left, right] = node.split("=")[1].trim().split(",");
    left = left.slice(1, left.length).trim();
    right = right.slice(0, right.length - 1).trim();
    nodes[current] = { Left: left, Right: right };
});

let current = "AAA";
let steps = 0;
while (current !== "ZZZ") {
    if (directions[steps % directions.length] === "L") {
        current = nodes[current].Left;
    } else current = nodes[current].Right;
    steps++;
}

console.log(steps);
