import * as fs from "fs";

const filepath: string = "./03/input.txt";
const content = fs.readFileSync(filepath, "utf-8").split("\r\n");
var sum = 0;

const GearNeighbours = (line: number, lineLength: number, index: number) => {
    const startLine = Math.max(0, line - 1);
    const endLine = Math.min(content.length - 1, line + 1);

    const startIndex = Math.max(0, index - 1);
    const endIndex = Math.min(lineLength - 1, index + 1);

    var neighbours: [number, number][] = [];
    for (var i = startLine; i <= endLine; ++i)
        for (var j = startIndex; j <= endIndex; ++j) neighbours.push([i, j]);
    return neighbours;
};

const isPartNumber = (
    parsedIndex: number,
    line: string | any[],
    index: number,
    number: string
) => {
    const numberStart =
        line.slice(parsedIndex, line.length).indexOf(number) + parsedIndex;
    const numberEnd = numberStart + number.length;

    parsedIndex = numberEnd;

    const startLine = Math.max(0, index - 1);
    const endLine = Math.min(content.length - 1, index + 1);

    const startIndex = Math.max(0, numberStart - 1);
    const endIndex = Math.min(line.length, numberEnd + 1);

    if (
        content[startLine].slice(startIndex, endIndex).match(/[^.\d]/) ||
        content[index].slice(startIndex, endIndex).match(/[^.\d]/) ||
        content[endLine].slice(startIndex, endIndex).match(/[^.\d]/)
    )
        return true;
    return false;
};

const lines = content.forEach((line, index) => {
    const gears = line.match(/\*/g);

    if (gears) {
        gears.forEach((gear) => {
            const startLine = Math.max(0, index - 1);
            const endLine = Math.min(content.length - 1, index + 1);
            var power = 0;
            var partialNumbers = 0;
            for (var i = startLine; i <= endLine; ++i) {
                const numbers = content[i].match(/\d+/g);
                var parsedIndex = 0;
                var parIndex = 0;
                if (numbers) {
                    numbers.forEach((number) => {
                        if (isPartNumber(parsedIndex, content[i], i, number)) {
                            const neighbours = GearNeighbours(
                                index,
                                line.length,
                                line.indexOf(gear)
                            );

                            const numberStart =
                                content[i]
                                    .slice(parIndex, content[i].length)
                                    .indexOf(number) + parIndex;
                            const numberEnd = numberStart + number.length;

                            parIndex = numberEnd;
                            for (var j = numberStart; j < numberEnd; ++j) {
                                const numberCoords = [i, j];
                                if (
                                    neighbours.some((arr) =>
                                        arr.every(
                                            (val, index) =>
                                                val === numberCoords[index]
                                        )
                                    )
                                ) {
                                    if (power === 0) power++;
                                    console.log(number);
                                    power *= parseInt(number);
                                    partialNumbers++;
                                    break;
                                }
                            }
                        }
                    });
                }
            }
            if (partialNumbers === 2) sum += power;
        });
    }
});
console.log(sum);
