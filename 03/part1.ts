import * as fs from "fs";

const filepath: string = "./03/input.txt";
const content = fs.readFileSync(filepath, "utf-8").split("\r\n");
var sum = 0;
const lines = content.forEach((line, index) => {
    const numbers = line.match(/\d+/g);

    var parsedIndex = 0;

    if (numbers) {
        numbers.forEach((number) => {
            const numberStart =
                line.slice(parsedIndex, line.length).indexOf(number) +
                parsedIndex;
            const numberEnd = numberStart + number.length; // excluding

            parsedIndex = numberEnd;

            const startLine = Math.max(0, index - 1);
            const endLine = Math.min(content.length - 1, index + 1);

            const startIndex = Math.max(0, numberStart - 1);
            const endIndex = Math.min(line.length, numberEnd + 1);

            if (
                content[startLine]
                    .slice(startIndex, endIndex)
                    .match(/[^.\d]/) ||
                content[index].slice(startIndex, endIndex).match(/[^.\d]/) ||
                content[endLine].slice(startIndex, endIndex).match(/[^.\d]/)
            )
                sum += parseInt(number);
        });
    }
});
console.log(sum);
