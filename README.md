# ui-test-dataframe-builder

This library builds dataframes that can be used to help build UI components, with a focus on mathematical and statistical data generation. It's particularly suitable for creating data for:

- charts and graphs
- tables and grids
- mathematical visualizations
- statistical analysis
- UI components requiring mathematical patterns
- scientific data simulation
- mathematical modeling and testing

## Features

- Mathematical series generation (linear, quadratic, logarithmic, exponential, trigonometric)
- Statistical data manipulation (noise, precision, standard deviation)
- Probability distributions (normal, uniform, poisson)
- Mathematical transformations and combinations
- Ability to specify column types and subtypes
- Support for relationships between tables
- Various data formats (ISO dates, local dates, etc.)
- Customizable ranges for numeric values
- Mathematical pattern generation for testing and visualization

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

### Mathematical Series Generation

The library provides a comprehensive set of functions for generating mathematical series and patterns, perfect for creating test data with specific mathematical properties.

#### Basic Series Types

##### Linear Series

Generates a series following the equation y = mx + b:

```javascript
const { generateLinearSeries } = require('./seriesGenerator');

// Simple linear series from 1 to 5
const series = generateLinearSeries({ start: 1, end: 5, step: 1 });
// Result: [1, 2, 3, 4, 5]

// Custom slope and y-intercept
const customSeries = generateLinearSeries({
  start: 0,
  end: 5,
  step: 1,
  slope: 2,
  yIntercept: 1,
});
// Result: [1, 3, 5, 7, 9, 11]
```

##### Quadratic Series

Generates a series following the equation y = ax² + bx + c:

```javascript
const { generateQuadraticSeries } = require('./seriesGenerator');

// Basic quadratic series
const series = generateQuadraticSeries({ start: 1, end: 5, step: 1 });
// Result: [1, 4, 9, 16, 25]

// Custom quadratic coefficients
const customSeries = generateQuadraticSeries({
  start: 1,
  end: 5,
  step: 1,
  a: 2,
  b: 1,
  c: 0,
});
// Result: [3, 11, 23, 39, 59]
```

##### Logarithmic Series

Generates a series following the equation y = a·log(x) + b:

```javascript
const { generateLogSeries } = require('./seriesGenerator');

// Basic logarithmic series
const series = generateLogSeries({ start: 1, end: 5, step: 1 });
// Result: [0, 0.693, 1.099, 1.386, 1.609]

// Custom logarithmic transformation
const customSeries = generateLogSeries({
  start: 1,
  end: 5,
  step: 1,
  a: 2,
  b: 1,
});
// Result: [1, 2.386, 3.198, 3.772, 4.218]
```

##### Exponential Series

Generates a series following the equation y = a·bˣ + c:

```javascript
const { generateExponentialSeries } = require('./seriesGenerator');

// Basic exponential series
const series = generateExponentialSeries({ start: 0, end: 4, step: 1 });
// Result: [1, 2, 4, 8, 16]

// Custom exponential growth
const customSeries = generateExponentialSeries({
  start: 0,
  end: 4,
  step: 1,
  a: 2,
  b: 3,
  c: 1,
});
// Result: [3, 7, 19, 55, 163]
```

##### Trigonometric Series

Generates series following trigonometric functions:

```javascript
const { generateTrigonometricSeries } = require('./seriesGenerator');

// Sine wave
const sineSeries = generateTrigonometricSeries({
  start: 0,
  end: 2 * Math.PI,
  step: Math.PI / 4,
  function: 'sin',
  amplitude: 2,
  frequency: 1,
  phase: 0,
});
// Result: [0, 1.414, 2, 1.414, 0, -1.414, -2, -1.414, 0]

// Cosine wave with custom parameters
const cosineSeries = generateTrigonometricSeries({
  start: 0,
  end: 2 * Math.PI,
  step: Math.PI / 4,
  function: 'cos',
  amplitude: 3,
  frequency: 2,
  phase: Math.PI / 2,
});
```

#### Advanced Features

##### Combining Series

You can combine multiple series to create complex patterns:

```javascript
const { combineSeries } = require('./seriesGenerator');

const linear = generateLinearSeries({ start: 0, end: 10, step: 1 });
const sine = generateTrigonometricSeries({
  start: 0,
  end: 10,
  step: 1,
  function: 'sin',
  amplitude: 2,
});

// Add series together
const combined = combineSeries([linear, sine], 'add');
// Result: Linear trend with sine wave oscillation

// Multiply series
const multiplied = combineSeries([linear, sine], 'multiply');
// Result: Amplitude-modulated signal
```

##### Statistical Properties

All series can include statistical properties:

```javascript
const series = generateLinearSeries({
  start: 0,
  end: 10,
  step: 1,
  standardDeviation: 0.5, // Add random noise
  precision: 2, // Round to 2 decimal places
  outlierProbability: 0.1, // 10% chance of outliers
  outlierMultiplier: 3, // Outliers are 3x the normal range
});
```

#### Series Options

All series generation functions accept the following options:

- `start`: Starting value of the series
- `end`: Ending value of the series
- `step`: Step size between values
- `standardDeviation`: Standard deviation for adding random noise (default: 0)
- `precision`: Number of decimal places to round to (default: 3)
- `outlierProbability`: Probability of generating outliers (default: 0)
- `outlierMultiplier`: Multiplier for outlier values (default: 3)

Additional options specific to each series type:

##### Linear Series

- `slope`: Slope of the line (default: 1)
- `yIntercept`: Y-intercept (default: 0)

##### Quadratic Series

- `a`: Quadratic coefficient (default: 1)
- `b`: Linear coefficient (default: 0)
- `c`: Constant term (default: 0)

##### Logarithmic Series

- `a`: Multiplier (default: 1)
- `b`: Constant term (default: 0)
- `base`: Logarithm base (default: Math.E)

##### Exponential Series

- `a`: Initial value multiplier (default: 1)
- `b`: Base of the exponential (default: 2)
- `c`: Constant term (default: 0)

##### Trigonometric Series

- `function`: Trigonometric function ('sin', 'cos', 'tan')
- `amplitude`: Wave amplitude (default: 1)
- `frequency`: Wave frequency (default: 1)
- `phase`: Phase shift in radians (default: 0)

These series can be combined with the data generator to create complex test data with mathematical patterns, perfect for:

- Testing charting libraries
- Creating mathematical visualizations
- Generating test data for scientific applications
- Simulating real-world mathematical phenomena

## Hierarchical Data Generation

The library now supports generating hierarchical data structures suitable for UI components like accordions, tree views, and nested lists.

### Basic Usage

```typescript
import {
  generateHierarchical,
  HierarchicalColumnType,
  HierarchicalType,
} from './dataGenerator';

// Define your hierarchical data structure
const accordionSchema: HierarchicalColumnType[] = [
  {
    name: 'title',
    type: 'string',
    subType: 'name',
  },
  {
    name: 'description',
    type: 'string',
  },
  {
    name: 'children',
    type: 'string',
    children: [
      {
        name: 'title',
        type: 'string',
        subType: 'name',
      },
      {
        name: 'content',
        type: 'string',
      },
    ],
  },
];

// Generate accordion data
const accordionData = generateHierarchical(accordionSchema, {
  type: 'accordion',
  maxDepth: 3,
  minChildren: 2,
  maxChildren: 4,
  expandable: true,
  expanded: false,
});

console.log(accordionData);
```

### Example Output

```javascript
[
  {
    title: 'Section 1',
    description: 'Description for section 1',
    expandable: true,
    expanded: false,
    children: [
      {
        title: 'Subsection 1.1',
        content: 'Content for subsection 1.1',
        expandable: true,
        expanded: false,
        children: [
          {
            title: 'Item 1.1.1',
            content: 'Content for item 1.1.1',
          },
          {
            title: 'Item 1.1.2',
            content: 'Content for item 1.1.2',
          },
        ],
      },
    ],
  },
  // ... more sections
];
```

### Supported Hierarchical Types

- `accordion`: For accordion-style UI components
- `tree`: For tree view components
- `nested-list`: For nested list components
- `menu`: For hierarchical menu structures

### Configuration Options

- `maxDepth`: Maximum nesting depth (default: 3)
- `minChildren`: Minimum number of children per node (default: 1)
- `maxChildren`: Maximum number of children per node (default: 5)
- `expandable`: Whether nodes can be expanded/collapsed (default: true)
- `expanded`: Initial expanded state (default: false)

### Additional Examples

#### Tree View Data

```typescript
const treeSchema: HierarchicalColumnType[] = [
  {
    name: 'label',
    type: 'string',
    subType: 'name',
  },
  {
    name: 'icon',
    type: 'string',
  },
  {
    name: 'children',
    type: 'string',
    children: [
      {
        name: 'label',
        type: 'string',
        subType: 'name',
      },
      {
        name: 'icon',
        type: 'string',
      },
    ],
  },
];

const treeData = generateHierarchical(treeSchema, {
  type: 'tree',
  maxDepth: 3,
  minChildren: 1,
  maxChildren: 3,
});
```

#### Nested Menu Data

```typescript
const menuSchema: HierarchicalColumnType[] = [
  {
    name: 'text',
    type: 'string',
    subType: 'name',
  },
  {
    name: 'link',
    type: 'string',
  },
  {
    name: 'children',
    type: 'string',
    children: [
      {
        name: 'text',
        type: 'string',
        subType: 'name',
      },
      {
        name: 'link',
        type: 'string',
      },
    ],
  },
];

const menuData = generateHierarchical(menuSchema, {
  type: 'menu',
  maxDepth: 2,
  minChildren: 2,
  maxChildren: 4,
});
```

#### Complex Nested List

```typescript
const nestedListSchema: HierarchicalColumnType[] = [
  {
    name: 'title',
    type: 'string',
    subType: 'name',
  },
  {
    name: 'items',
    type: 'string',
    children: [
      {
        name: 'title',
        type: 'string',
        subType: 'name',
      },
      {
        name: 'description',
        type: 'string',
      },
      {
        name: 'items',
        type: 'string',
        children: [
          {
            name: 'title',
            type: 'string',
            subType: 'name',
          },
          {
            name: 'description',
            type: 'string',
          },
        ],
      },
    ],
  },
];

const nestedListData = generateHierarchical(nestedListSchema, {
  type: 'nested-list',
  maxDepth: 3,
  minChildren: 2,
  maxChildren: 4,
});
```

### Best Practices

1. **Schema Design**:

   - Keep your schema structure consistent across levels
   - Use meaningful property names that match your UI components
   - Consider adding metadata properties like `icon`, `color`, or `status`

2. **Performance Considerations**:

   - Limit `maxDepth` to what's necessary for your UI
   - Use appropriate `minChildren` and `maxChildren` values
   - Consider generating data in chunks for large hierarchies

3. **UI Integration**:
   - The generated data structure is designed to work well with common UI components
   - Properties like `expandable` and `expanded` are automatically added for accordion and tree types
   - You can extend the schema to include UI-specific properties
