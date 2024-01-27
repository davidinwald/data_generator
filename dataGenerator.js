const generateName = require("./data/names");
// this function generates sample data that can be helpful for dev purposes
// input parameters include the number of columns, number of rows, and the type of data for each column
const generateData = ({ numRows, colTypes }) => {
  const data = [];

  for (let i = 0; i < numRows; i++) {
    const row = {};

    for (let j = 0; j < colTypes.length; j++) {
      const colType = colTypes[j].type;
      const colName = colTypes[j].name;
      row[colName] = generateDataByType({ ...colTypes[j] });
    }

    data.push(row);
  }

  return data;
};

module.exports = generateData;

// Path: dataGenerator.js
// this function generates a single value of a given type
const generateDataByType = ({ type, min, max, subType }) => {
  switch (type) {
    case "string":
      return generateString({ subType });
    case "integer":
      return generateInteger({ min, max });
    case "number":
      return generateNumber({ min, max });
    case "boolean":
      return generateBoolean();
    case "date":
      return generateDate();
    default:
      return generateString();
  }
};

// Path: dataGenerator.js
// this function generates a random string
const generateString = ({ subType }) => {
  if (subType === "name") {
    return generateName();
  }

  const length = Math.floor(Math.random() * 10) + 1;
  let str = "";

  for (let i = 0; i < length; i++) {
    const charCode = Math.floor(Math.random() * 26) + 97;
    str += String.fromCharCode(charCode);
  }

  return str;
};

// Path: dataGenerator.js
// this function generates a random boolean
const generateBoolean = () => {
  return Math.random() < 0.5;
};

// Path: dataGenerator.js
// this function generates a random date
const generateDate = () => {
  const year = Math.floor(Math.random() * 100) + 1920;
  const month = Math.floor(Math.random() * 12);
  const day = Math.floor(Math.random() * 28);

  return new Date(year, month, day);
};

// Path: dataGenerator.js
// this function generates a random array
const generateArray = () => {
  const length = Math.floor(Math.random() * 10) + 1;
  const arr = [];

  for (let i = 0; i < length; i++) {
    arr.push(generateString());
  }

  return arr;
};

// Path: dataGenerator.js
// this function generates a random object

const generateObject = () => {
  const length = Math.floor(Math.random() * 10) + 1;
  const obj = {};

  for (let i = 0; i < length; i++) {
    obj[generateString()] = generateString();
  }

  return obj;
};

// Path: dataGenerator.js
// this function generates a random integer within a specified range
const generateInteger = ({ min = 0, max = 100 }) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Path: dataGenerator.js
// this function generates a random number within a specified range
const generateNumber = ({ min = 0, max = 100, precision = 5 }) => {
  const range = max - min;
  const randomValue = Math.random() * range + min;
  const multiplier = Math.pow(10, precision);
  const roundedValue = Math.round(randomValue * multiplier) / multiplier;
  return roundedValue;
};
