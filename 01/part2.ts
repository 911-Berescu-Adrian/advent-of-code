import * as fs from "fs";

const wordMap: { [key: string]: number } = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};
const wordToNumber = (key: string): number => {
    return wordMap[key] || 0;
};

const filepath: string = "./01/input.txt";
const content = fs.readFileSync(filepath, "utf-8").split("\r\n");
const lines = content.map((line) => {
    console.log(line);
    Object.keys(wordMap).forEach((key) => {
        line = line.replaceAll(
            key,
            key[0] + wordMap[key].toString() + key[key.length - 1]
        );
    });
    console.log(line);
    line = line.replace(/[a-zA-Z]/g, "");
    console.log(line);
    console.log(line[0] + line[line.length - 1]);
    return line[0] + line[line.length - 1];
});
const sum = lines.map((number) => parseInt(number)).reduce((a, b) => a + b);
console.log(sum);
