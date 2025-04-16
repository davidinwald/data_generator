"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHierarchicalData = exports.generateHierarchical = exports.generateData = void 0;
const { generateNames } = require('./data/names');
const generateData = ({ numRows, colTypes, relationships = {}, }) => {
    if (numRows <= 0) {
        throw new Error('Number of rows must be greater than 0');
    }
    if (!colTypes || colTypes.length === 0) {
        throw new Error('At least one column type must be specified');
    }
    const data = [];
    const referenceData = {};
    // First pass: Generate all non-foreign key columns
    const columnArrays = colTypes.map((colType) => {
        if (colType.foreignKey) {
            // Store the column name for later processing
            return {
                column: colType.name,
                isForeignKey: true,
                foreignKey: colType.foreignKey,
            };
        }
        return {
            column: colType.name,
            values: generateDataByType(Object.assign(Object.assign({}, colType), { numRows })),
        };
    });
    // Generate reference data for foreign keys
    Object.entries(relationships).forEach(([tableName, { column }]) => {
        const referenceColType = colTypes.find((col) => col.name === column);
        if (referenceColType) {
            referenceData[tableName] = generateDataByType(Object.assign(Object.assign({}, referenceColType), { numRows }));
        }
    });
    // Second pass: Generate rows with foreign key relationships
    for (let i = 0; i < numRows; i++) {
        const row = {};
        for (let j = 0; j < colTypes.length; j++) {
            const colName = colTypes[j].name;
            const columnArray = columnArrays[j];
            if (!row[colName]) {
                if (columnArray.isForeignKey && columnArray.foreignKey) {
                    const { table, column } = columnArray.foreignKey;
                    if (referenceData[table] && referenceData[table].length > 0) {
                        // Randomly select a value from the reference data
                        row[colName] =
                            referenceData[table][Math.floor(Math.random() * referenceData[table].length)];
                    }
                    else {
                        throw new Error(`No reference data found for foreign key: ${table}.${column}`);
                    }
                }
                else if (columnArray.values) {
                    row[colName] = columnArray.values[i];
                }
            }
        }
        data.push(row);
    }
    return data;
};
exports.generateData = generateData;
// Path: dataGenerator.js
// this function generates a single value of a given type
const generateDataByType = ({ type, min, max, subType, format, numRows, }) => {
    switch (type) {
        case 'string':
            return generateString({ subType: subType || '', numRows });
        case 'integer':
            return generateInteger({ min, max, numRows });
        case 'number':
            return generateNumber({ min, max, numRows });
        case 'boolean':
            return generateBoolean({ truthRatio: 0.9, numRows });
        case 'date':
            return generateDate({ format, numRows });
        default:
            throw new Error(`Unsupported data type: ${type}`);
    }
};
// this function generates a random string
const generateString = ({ subType, numRows }) => {
    switch (subType) {
        case 'name':
            return generateNames(numRows);
        case 'email':
            return generateEmails(numRows);
        case 'phone':
            return generatePhoneNumbers(numRows);
        case 'address':
            return generateAddresses(numRows);
        case 'username':
            return generateUsernames(numRows);
        case 'password':
            return generatePasswords(numRows);
        default:
            return generateRandomStrings(numRows);
    }
};
// Helper functions for string generation
const generateRandomStrings = (numRows) => {
    return Array(numRows)
        .fill(undefined)
        .map(() => {
        const length = Math.floor(Math.random() * 10) + 1;
        let str = '';
        for (let i = 0; i < length; i++) {
            const charCode = Math.floor(Math.random() * 26) + 97;
            str += String.fromCharCode(charCode);
        }
        return str;
    });
};
const generateEmails = (numRows) => {
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com'];
    return Array(numRows)
        .fill(undefined)
        .map(() => {
        const username = generateRandomStrings(1)[0];
        const domain = domains[Math.floor(Math.random() * domains.length)];
        return `${username}@${domain}`;
    });
};
const generatePhoneNumbers = (numRows) => {
    return Array(numRows)
        .fill(undefined)
        .map(() => {
        const areaCode = Math.floor(Math.random() * 900) + 100;
        const prefix = Math.floor(Math.random() * 900) + 100;
        const lineNumber = Math.floor(Math.random() * 9000) + 1000;
        return `(${areaCode}) ${prefix}-${lineNumber}`;
    });
};
const generateAddresses = (numRows) => {
    const streets = ['Main St', 'Oak Ave', 'Pine St', 'Maple Dr', 'Cedar Ln'];
    const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];
    const states = ['NY', 'CA', 'IL', 'TX', 'AZ'];
    return Array(numRows)
        .fill(undefined)
        .map(() => {
        const streetNum = Math.floor(Math.random() * 9999) + 1;
        const street = streets[Math.floor(Math.random() * streets.length)];
        const city = cities[Math.floor(Math.random() * cities.length)];
        const state = states[Math.floor(Math.random() * states.length)];
        const zip = Math.floor(Math.random() * 90000) + 10000;
        return `${streetNum} ${street}, ${city}, ${state} ${zip}`;
    });
};
const generateUsernames = (numRows) => {
    const prefixes = ['user', 'dev', 'admin', 'test', 'demo'];
    return Array(numRows)
        .fill(undefined)
        .map(() => {
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = Math.floor(Math.random() * 9999);
        return `${prefix}${suffix}`;
    });
};
const generatePasswords = (numRows) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    return Array(numRows)
        .fill(undefined)
        .map(() => {
        let password = '';
        for (let i = 0; i < 12; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    });
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
// this function generates a random date
const generateDate = ({ startDate = new Date(2000, 0, 1), endDate = new Date(), format = 'ISO', numRows, }) => {
    const startTime = startDate.getTime();
    const endTime = endDate.getTime();
    const timeRange = endTime - startTime;
    return Array(numRows)
        .fill(undefined, 0, numRows)
        .map(() => {
        const randomTime = startTime + Math.random() * timeRange;
        const date = new Date(randomTime);
        switch (format.toLowerCase()) {
            case 'iso':
                return date.toISOString();
            case 'date':
                return date.toLocaleDateString();
            case 'datetime':
                return date.toLocaleString();
            case 'timestamp':
                return date.getTime();
            default:
                return date.toISOString();
        }
    });
};
const generateHierarchicalData = (colTypes, options, depth = 0) => {
    var _a, _b;
    if (depth >= (options.maxDepth || 3)) {
        return [];
    }
    const numChildren = Math.floor(Math.random() *
        ((options.maxChildren || 5) - (options.minChildren || 1) + 1) +
        (options.minChildren || 1));
    const result = [];
    for (let i = 0; i < numChildren; i++) {
        const item = {};
        // Generate data for each column
        colTypes.forEach((colType) => {
            if (colType.name !== 'children') {
                item[colType.name] = generateDataByType(Object.assign(Object.assign({}, colType), { numRows: 1 }))[0];
            }
        });
        // Add hierarchical properties
        if (options.type === 'accordion' || options.type === 'tree') {
            item.expandable = (_a = options.expandable) !== null && _a !== void 0 ? _a : true;
            item.expanded = (_b = options.expanded) !== null && _b !== void 0 ? _b : false;
        }
        // Generate children if there are child columns defined
        const childColumns = colTypes.find((col) => col.name === 'children');
        if ((childColumns === null || childColumns === void 0 ? void 0 : childColumns.children) && depth < (options.maxDepth || 3)) {
            item.children = generateHierarchicalData(childColumns.children, options, depth + 1);
        }
        result.push(item);
    }
    return result;
};
exports.generateHierarchicalData = generateHierarchicalData;
const generateHierarchical = (colTypes, options) => {
    return generateHierarchicalData(colTypes, options);
};
exports.generateHierarchical = generateHierarchical;
