import * as fs from "fs";

const filepath: string = "./01/input.txt";
const content = fs.readFileSync(filepath, "utf-8").split("\r\n");
const lines = content.map((line) => {
    const numbers = line.replace(/[a-zA-Z]/g, "");
    return numbers[0] + numbers[numbers.length - 1];
});
const sum = lines.map((number) => parseInt(number)).reduce((a, b) => a + b);
console.log(sum);
