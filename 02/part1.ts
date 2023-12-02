import * as fs from "fs";

const cubes: { [key: string]: number } = {
    red: 12,
    green: 13,
    blue: 14,
};

const sanitize = (str: string): string => {
    if (str[str.length - 1] === ",") return str.slice(0, -1);
    return str;
};

var sum = 0;
const filepath: string = "./02/input.txt";
const content = fs.readFileSync(filepath, "utf-8").split("\r\n");
content.forEach((line) => {
    var isValid = true;
    var gameId = 0;
    var parsedLine = line.split(";");
    parsedLine.forEach((l, index) => {
        const numbers = l.split(" ");
        var startIndex;
        if (index === 0) gameId = parseInt(numbers[1]);
        startIndex = index === 0 ? 3 : 2;
        for (var i = startIndex; i < numbers.length; i += 2) {
            if (parseInt(numbers[i - 1]) > cubes[sanitize(numbers[i])]) {
                isValid = false;
            }
        }
    });
    if (isValid) {
        sum += gameId;
    }
});
console.log(sum);
