"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const startTime = Date.now();
function readFile(filePath) {
    try {
        return fs.readFileSync(filePath, "utf-8");
    }
    catch (error) {
        console.error(`Error reading file: ${error.message}`);
        process.exit(1);
    }
}
const filePath = "../input.txt";
let currentCalories = 0;
let array = [0, 0, 0];
const lines = readFile(filePath).split("\n");
lines.forEach((line, index) => {
    if (line != "\r")
        currentCalories += parseInt(line.split("\r")[0]);
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
