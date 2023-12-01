import * as fs from "fs";

const startTime = Date.now();

function readFile(filePath: string): string {
  try {
    return fs.readFileSync(filePath, "utf-8");
  } catch (error: any) {
    console.error(`Error reading file: ${error.message}`);
    process.exit(1);
  }
}

const filePath = "../input.txt";

let currentCalories: number = 0;
let array = [0, 0, 0];

const lines = readFile(filePath).split("\n");

lines.forEach((line, index) => {
  if (line != "\r") currentCalories += parseInt(line.split("\r")[0]);
  if (lines[index + 1] === "\r" || index + 1 === lines.length) {
    for (let i = 0; i < array.length; ++i) {
      if (currentCalories > array[i]) {
        for (let j = array.length - 1; j > i; j--) {
          array[j] = array[j - 1];
        }
        array[i] = currentCalories;
        break;
      }
    }
    currentCalories = 0;
  }
});

console.log(array.reduce((a, b) => a + b));

const endTime = Date.now();
const timePassed = endTime - startTime;
console.log(`${timePassed} ms`);
