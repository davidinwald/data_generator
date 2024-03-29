"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateData = void 0;
const { generateNames } = require('./data/names');
// this function generates sample data that can be helpful for dev purposes
// input parameters include the number of columns, number of rows,
// and the type of data for each column
const generateData = ({ numRows, colTypes, //
 }) => {
    const data = [];
    const columnArrays = colTypes.map((colType) => {
        return {
            column: colType.name,
            values: generateDataByType(Object.assign(Object.assign({}, colType), { numRows })),
        };
    });
    for (let i = 0; i < numRows; i++) {
        const row = {};
        for (let j = 0; j < colTypes.length; j++) {
            const colName = colTypes[j].name;
            if (!row[colName]) {
                row[colName] = columnArrays[j].values[i];
            }
        }
        data.push(row);
    }
    return data;
};
exports.generateData = generateData;
// Path: dataGenerator.js
// this function generates a single value of a given type
const generateDataByType = ({ type, min, max, subType, numRows, }) => {
    switch (type) {
        case 'string':
            return generateString({ subType: subType || '', numRows });
        case 'integer':
            return generateInteger({ min, max, numRows });
        case 'number':
            return generateNumber({ min, max, numRows });
        case 'boolean':
            return generateBoolean({ truthRatio: 0.9, numRows });
        // case 'date':
        //   return generateDate({ numRows });
        default:
            return generateString({ subType: subType || '', numRows });
    }
};
// this function generates a random string
const generateString = ({ subType, numRows, }) => {
    if (subType === 'name') {
        return generateNames(numRows);
    }
    const length = Math.floor(Math.random() * 10) + 1;
    let str = '';
    for (let i = 0; i < length; i++) {
        const charCode = Math.floor(Math.random() * 26) + 97;
        str += String.fromCharCode(charCode);
    }
    return str.repeat(numRows);
};
// this function generates a random boolean
const generateBoolean = ({ truthRatio, numRows, }) => {
    return Array(numRows)
        .fill(undefined, 0, numRows)
        .map(() => Math.random() < truthRatio);
};
// this function generates a random integer within a specified range
const generateInteger = ({ min = 0, max = 100, numRows, }) => {
    return Array(numRows).fill(Math.floor(Math.random() * (max - min + 1)) + min);
};
// this function generates a random number within a specified range
const generateNumber = ({ min = 0, max = 100, precision = 5, numRows, }) => {
    const range = max - min;
    const randomValues = Array(numRows)
        .fill(undefined, 0, numRows)
        .map(() => {
        const randomValue = Math.random() * range + min;
        const multiplier = Math.pow(10, precision);
        const roundedValue = Math.round(randomValue * multiplier) / multiplier;
        return roundedValue;
    });
    return randomValues;
};
