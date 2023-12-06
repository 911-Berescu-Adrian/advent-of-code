import * as fs from "fs";

const filepath: string = "./06/input.txt";
var timeArray: number[] = [];
var distanceArray: number[] = [];
const content = fs
    .readFileSync(filepath, "utf-8")
    .split("\r\n")
    .forEach((line, index) => {
        line.split(":")[1]
            .split(" ")
            .forEach((number) => {
                const parsedValue = parseInt(number);
                if (!isNaN(parsedValue)) {
                    if (index === 0) timeArray.push(parsedValue);
                    else distanceArray.push(parsedValue);
                }
            });
    });

var power = 1;
timeArray.forEach((time, index) => {
    var solutions = 0;
    for (var i = 1; i < time; ++i) {
        var distance = (time - i) * i;
        if (distance > distanceArray[index]) {
            solutions++;
        }
    }
    if (solutions > 0) power *= solutions;
});
console.log(power);
