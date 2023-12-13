import * as fs from "fs";

const filepath: string = "./11/input.txt";
const content = fs.readFileSync(filepath, "utf-8").split("\r\n");

var emptyLines: number[] = [];
var emptyColumns: number[] = [];

const expand = (emptyLines: number[], emptyColumns: number[]) => {
    let expanded: string[] = [];
    let expLineIndex = 0;
    content.forEach((line, index) => {
        if (emptyLines.includes(index)) {
            expanded[expLineIndex++] = line;
        }
        expanded[expLineIndex++] = line;
    });

    //duplicate columns
    for(var i = 0; i < content.length; ++i) {
        if(emptyColumns.includes(i)) {
            for (var j = i+2; j < ; ++j) {
                expanded[i]
            }
            for (var j = 0; j < expanded[0].length; ++j) {
                expanded[i+1][j] = expanded[i][j];
            }
        }
    }

    return expanded;
};

content.forEach((line, index) => {
    if (/^\.+$/g.test(line)) {
        emptyLines.push(index);
    }
});

for (let i = 0; i < content[0].length; ++i) {
    let isEmpty = true;
    for (let j = 0; j < content.length; ++j) {
        if (content[j][i] !== ".") isEmpty = false;
    }
    if (isEmpty) emptyColumns.push(i);
}

var expandedUniverse = expand(emptyLines, emptyColumns);
console.log(expandedUniverse.join("\n"));
