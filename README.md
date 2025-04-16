# ui-test-dataframe-builder

This library builds dataframes that can be used to help build UI components.
Suitable to create data for:

- charts
- tables
- UIs

## Features

- Ability to specify column types and subtypes
- Support for relationships between tables
- Various data formats (ISO dates, local dates, etc.)
- Customizable ranges for numeric values

## Usage

### Basic Usage

```javascript
const { generateData } = require('./dataGenerator');

const sampleSchema = [
  { name: 'column1', type: 'string', subType: 'name' },
  { name: 'column2', type: 'number', min: 0, max: 100, precision: 2 },
  { name: 'columnA', type: 'boolean' },
  { name: 'columnB', type: 'integer', min: 0, max: 100 },
];

const testData = generateData({
  numRows: 5,
  colTypes: sampleSchema,
});

console.log('testData', testData);
```

Result:

```javascript
testData[
  ({
    column1: 'Amelia Lewis',
    column2: 52.6683,
    columnA: true,
    columnB: 52,
  },
  {
    column1: 'Jane Clarke',
    column2: 1.24444,
    columnA: false,
    columnB: 53,
  },
  {
    column1: 'Mohammed Khan',
    column2: 5.84364,
    columnA: true,
    columnB: 60,
  },
  {
    column1: 'Ava Garden',
    column2: 51.95044,
    columnA: true,
    columnB: 47,
  },
  {
    column1: 'Jacob Jackson',
    column2: 30.15283,
    columnA: true,
    columnB: 52,
  })
];
```

### Supported Data Types

#### String Types

- Basic string: `{ type: "string" }`
- Name: `{ type: "string", subType: "name" }`
- Email: `{ type: "string", subType: "email" }`
- Phone: `{ type: "string", subType: "phone" }`
- Address: `{ type: "string", subType: "address" }`
- Username: `{ type: "string", subType: "username" }`
- Password: `{ type: "string", subType: "password" }`

#### Numeric Types

- Integer: `{ type: "integer", min: 0, max: 100 }`
- Number: `{ type: "number", min: 0, max: 100, precision: 2 }`

#### Boolean

- `{ type: "boolean" }`

#### Date

- ISO format: `{ type: "date", format: "ISO" }`
- Local date format: `{ type: "date", format: "date" }`

### Relationships

You can create relationships between tables using foreign keys. Here's an example:

```javascript
const data = generateData({
  numRows: 5,
  colTypes: [
    {
      name: 'id',
      type: 'integer',
    },
    {
      name: 'user_id',
      type: 'integer',
      foreignKey: {
        table: 'users',
        column: 'id',
      },
    },
  ],
  relationships: {
    users: {
      table: 'users',
      column: 'id',
    },
  },
});
```

In this example:

- `user_id` is a foreign key that references the `id` column in the `users` table
- The `relationships` object defines the reference table and column
- The generator will ensure referential integrity by only using values that exist in the referenced table

### Error Handling

The generator will throw errors for:

- Invalid number of rows (must be > 0)
- Empty column types
- Unsupported data types
- Missing reference data for foreign keys

### Screenshot of sample usage

![Alt text](image.png)
