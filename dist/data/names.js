"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateNames = exports.lastNames = exports.firstNames = void 0;
exports.firstNames = [
    'John',
    'Jane',
    'Jack',
    'Jill',
    'James',
    'Jenny',
    'Joe',
    'Jade',
    'Jasper',
    'Jade',
    'Jared',
    'Jasmine',
    'Jared',
    'Mohammed',
    'Sophia',
    'Liam',
    'Olivia',
    'Noah',
    'Emma',
    'Oliver',
    'Ava',
    'Elijah',
    'Isabella',
    'Yusuf',
    'Emily',
    'Jacob',
    'Sophie',
    'Michael',
    'Grace',
    'Daniel',
    'Chloe',
    'Matthew',
    'Lily',
    'Mia',
    'Lucas',
    'Amelia',
    'Alexander',
    'Evie',
    'Jacob',
    'Ella',
    'Sruthi',
];
exports.lastNames = [
    'Smith',
    'Jones',
    'Taylor',
    'Brown',
    'Williams',
    'Wilson',
    'Johnson',
    'Davies',
    'Robinson',
    'Wright',
    'Thompson',
    'Evans',
    'Walker',
    'White',
    'Roberts',
    'Green',
    'Hall',
    'Wood',
    'Jackson',
    'Clarke',
    'Patel',
    'Khan',
    'Lewis',
    'James',
    'Phillips',
    'Mason',
    'Mitchell',
    'Rose',
    'Davis',
    'Rodriguez',
    'Cox',
    'Alexander',
    'Garden',
    'Campbell',
    'Johnston',
    'Moore',
    'Smyth',
    "O'Neill",
    'Anderson',
    'Scott',
];
const generateName = () => {
    const firstName = exports.firstNames[Math.floor(Math.random() * exports.firstNames.length)];
    const lastName = exports.lastNames[Math.floor(Math.random() * exports.lastNames.length)];
    return `${firstName} ${lastName}`;
};
const generateNames = (numNames = 1) => {
    const names = [];
    for (let i = 0; i < numNames; i++) {
        names.push(generateName());
    }
    return names;
};
exports.generateNames = generateNames;
