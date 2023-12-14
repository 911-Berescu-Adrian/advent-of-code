import * as fs from "fs";

const filepath: string = "./11/input.txt";
const content = fs.readFileSync(filepath, "utf-8").split("\r\n");
