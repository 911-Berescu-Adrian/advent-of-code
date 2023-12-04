import * as fs from "fs";

const filepath: string = "./04/input.txt";
const content = fs.readFileSync(filepath, "utf-8").split("\r\n");
var sum = 0;
content.forEach((line, index) => {
    var matches = 0;
    const [id, numbers] = line.split(":");
    var [winningNumbersStr, elfNumbersStr] = numbers.split(" | ");
    const winningNumbers = winningNumbersStr.split(" ");
    const elfNumber = elfNumbersStr.split(" ");
    matches = winningNumbers.filter(
        (number) => number !== "" && elfNumber.includes(number)
    ).length;
    sum += matches > 0 ? Math.pow(2, matches - 1) : 0;
});
console.log(sum);
