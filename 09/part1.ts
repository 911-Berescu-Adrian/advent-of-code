import * as fs from "fs";

const filepath: string = "./09/input.txt";
const histories = fs.readFileSync(filepath, "utf-8").split("\r\n");

const nextSequenceOfHistory = (history: number[]) => {
    var array: number[] = [];
    for (let i = 1; i < history.length; ++i) {
        array.push(history[i] - history[i - 1]);
    }
    return array;
};

const extrapolateSequences = (sequences: number[][]) => {
    sequences[sequences.length - 1].push(sequences[sequences.length - 1][0]);

    for (let i = sequences.length - 2; i >= 0; --i) {
        let previous = sequences[i + 1];
        let current = sequences[i];
        let value = current[0] - previous[0];
        sequences[i].unshift(value);
    }
    let first = sequences[0];
    return first[0];
};

const getNextValue = (history: number[]) => {
    var sequences: number[][] = [];
    sequences.push(history);
    var next = nextSequenceOfHistory(history);
    while (!next.every((num) => num === 0)) {
        sequences.push(next);
        next = nextSequenceOfHistory(next);
    }
    return extrapolateSequences(sequences);
};
var sum = 0;

histories.forEach((history) => {
    const numbers = history.split(" ").map(Number);
    sum += getNextValue(numbers);
});

console.log(sum);
