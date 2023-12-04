import * as fs from "fs";

const filepath: string = "./04/input.txt";
const content = fs.readFileSync(filepath, "utf-8").split("\r\n");
var sum = 0;
var instances: number[] = [];
content.forEach((line) => {
    instances.push(1);
});
content.forEach((line, index) => {
    var matches = 0;
    const [_, numbers] = line.split(":");
    var [winningNumbersStr, elfNumbersStr] = numbers.split(" | ");
    const winningNumbers = winningNumbersStr.split(" ");
    const elfNumber = elfNumbersStr.split(" ");
    matches = winningNumbers.filter(
        (number) => number !== "" && elfNumber.includes(number)
    ).length;

    console.log(instances[index]);

    for (var i = instances[index]; i > 0; --i) {
        for (var j = 1; j <= matches && index + j < instances.length; ++j) {
            instances[index + j]++;
        }
    }
});
console.log(instances.reduce((acc, curr) => acc + curr));
