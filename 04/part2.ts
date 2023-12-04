import * as fs from "fs";

const filepath: string = "./04/input.txt";
const content = fs.readFileSync(filepath, "utf-8").split("\r\n");
var sum = 0;
var instances: number[] = [];
const start = Date.now();
content.forEach((line) => {
    instances.push(1);
});
content.forEach((line, index) => {
    var matches = 0;
    const [_, numbers] = line.split(":");
    var [winningNumbersStr, elfNumbersStr] = numbers.split(" | ");
    const winningNumbers = winningNumbersStr.split(" ");
    const elfNumbers = elfNumbersStr.split(" ");
    matches = winningNumbers.filter(
        (number) => number !== "" && elfNumbers.includes(number)
    ).length;

    console.log(instances[index]);

    for (var j = 1; j <= matches && index + j < instances.length; ++j) {
        instances[index + j] += instances[index];
    }
});
console.log(instances.reduce((acc, curr) => acc + curr));
console.log(Date.now() - start, "ms");
