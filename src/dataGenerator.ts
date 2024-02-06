const { generateNames } = require('./data/names');
// this function generates sample data that can be helpful for dev purposes
// input parameters include the number of columns, number of rows,
// and the type of data for each column
const generateData = ({
  numRows,
  colTypes, //
}: {
  numRows: number;
  colTypes: any[];
}) => {
  const data: any[] = [];

  const columnArrays = colTypes.map((colType) => {
    return {
      column: colType.name,
      values: generateDataByType({ ...colType, numRows }),
    };
  });

  for (let i = 0; i < numRows; i++) {
    const row: { [key: string]: any } = {};

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

module.exports = generateData;

// Path: dataGenerator.js
// this function generates a single value of a given type
const generateDataByType = ({
  type,
  min,
  max,
  subType,
  numRows,
}: {
  type: string;
  min?: number;
  max?: number;
  subType?: string;
  numRows: number;
}) => {
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
const generateString = ({
  subType,
  numRows,
}: {
  subType: string;
  numRows: number;
}) => {
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
const generateBoolean = ({
  truthRatio,
  numRows,
}: {
  truthRatio: number;
  numRows: number;
}) => {
  return Array(numRows)
    .fill(undefined, 0, numRows)
    .map(() => Math.random() < truthRatio);
};

// this function generates a random integer within a specified range
const generateInteger = ({
  min = 0,
  max = 100,
  numRows,
}: {
  min?: number;
  max?: number;
  numRows: number;
}) => {
  return Array(numRows).fill(Math.floor(Math.random() * (max - min + 1)) + min);
};

// this function generates a random number within a specified range
const generateNumber = ({
  min = 0,
  max = 100,
  precision = 5,
  numRows,
}: {
  min?: number;
  max?: number;
  precision?: number;
  numRows: number;
}) => {
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
