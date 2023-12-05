import * as fs from "fs";

const filepath: string = "./03/input.txt";
const content = fs.readFileSync(filepath, "utf-8").split("\r\n");

var sum = 0;

const getNeighbours = (
    lineIndex: number,
    index: number,
    maxLine: number,
    maxIndex: number
) => {
    var neighbours: [number, number][] = [];
    for (
        var i = Math.max(0, lineIndex - 1);
        i <= Math.min(maxLine - 1, lineIndex + 1);
        ++i
    ) {
        for (
            var j = Math.max(0, index - 1);
            j <= Math.min(maxIndex - 1, index + 1);
            ++j
        ) {
            neighbours.push([i, j]);
        }
    }
    return neighbours;
};

const isNumber = (line: number, index: number) => {
    return content[line][index] >= "0" && content[line][index] <= "9";
};

const getNumber = (lineIndex: number, index: number, maxIndex: number) => {
    var number = "";
    for (var i = index; i >= 0 && isNumber(lineIndex, i); --i) {
        number += content[lineIndex][i];
    }

    number = number.split("").reverse().join("");

    for (var i = index + 1; i < maxIndex && isNumber(lineIndex, i); ++i) {
        number += content[lineIndex][i];
    }

    return parseInt(number);
};

content.forEach((line, index) => {
    const regex = /\*/g;
    var match;
    while ((match = regex.exec(line)) !== null) {
        var numberSet = new Set<number>();

        const neighbours = getNeighbours(
            index,
            match.index,
            content.length,
            line.length
        );

        neighbours.forEach(([x, y]) => {
            if (isNumber(x, y)) {
                numberSet.add(getNumber(x, y, line.length));
            }
        });
        if (numberSet.size === 2) {
            var pow = 1;
            numberSet.forEach((value) => {
                pow *= value;
            });
            sum += pow;
        }
    }
    console.log(line, index);
});

console.log(sum);
