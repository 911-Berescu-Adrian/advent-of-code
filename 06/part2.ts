import * as fs from "fs";
const startTime = performance.now();

const filepath: string = "./06/input.txt";
var time = 0;
var distance = 0;
const content = fs
    .readFileSync(filepath, "utf-8")
    .split("\r\n")
    .forEach((line, index) => {
        if (index === 0) time = parseInt(line.split(":")[1].split(" ").join(""));
        else distance = parseInt(line.split(":")[1].split(" ").join(""));
    });

var solutions = 0;
// O(n) - 91ms
// for (var i = 1; i < time; ++i) {
//     let dist = (time - i) * i;
//     if (dist > distance) solutions++;
// }

// O(n/2) - 53ms
// for (var i = 1; i <= time / 2; ++i) {
//     let dist = (time - i) * i;
//     if (dist > distance) solutions += 2;
// }
// if (time % 2 === 0) solutions--;

// O(logn??) - 21ms
// for (var i = 1; i <= time / 2; ++i) {
//     let dist = (time - i) * i;
//     if (dist > distance) {
//         solutions = time - i - i + 1;
//         break;
//     }
// }

//O(1) 🤓 akshually - 1.6ms

// a = -1
// b = time
// c = -distance

// b^2-4ac = time^2 - 4*record
// (-b +- sqrt(delta)) /2

var delta = time * time - 4 * distance;
solutions = Math.floor((-time - Math.sqrt(delta)) / -2) - Math.ceil((-time + Math.sqrt(delta)) / -2) + 1;

console.log(solutions);

const endTime = performance.now();
console.log(endTime - startTime, "ms");
