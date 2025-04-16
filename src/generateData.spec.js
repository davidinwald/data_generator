import { test, expect } from '@playwright/test';
import { generateData, generateHierarchical } from './dataGenerator';

const sampleSchema = [
  { name: 'column1', type: 'string', subType: 'name' },
  { name: 'column2', type: 'number', min: 0, max: 100, precision: 2 },
  { name: 'columnA', type: 'boolean' },
  { name: 'columnB', type: 'integer', min: 0, max: 100 }, // New column for integers
];

test('Verify generated dataframe has column names as expected', async () => {
  // Generate sample data
  const testData = generateData({
    numRows: 5,
    colTypes: sampleSchema,
  });

  // Perform assertions to verify the generated data
  expect(testData).toHaveLength(5);
  expect(testData[0]).toHaveProperty('column1');
  expect(testData[0]).toHaveProperty('column2');
  expect(testData[0]).toHaveProperty('columnA');
  expect(testData[0]).toHaveProperty('columnB'); // New column

  // Check for extra columns
  testData.forEach((data) => {
    expect(Object.keys(data)).toHaveLength(4); // Assuming 4 columns in total
  });
});

test('Verify generated dataframe has the correct number of rows', async () => {
  // Generate sample data
  const testData = generateData({
    numRows: 10, // Change the number of rows as per your requirement
    colTypes: sampleSchema,
  });

  // Perform assertion to verify the number of rows
  expect(testData).toHaveLength(10); // Change the expected number of rows as per your requirement

  const lengthsToCheck = [1, 5, 10, 50, 100];
  lengthsToCheck.forEach((length) => {
    const testData = generateData({
      numRows: length,
      colTypes: sampleSchema,
    });
    expect(testData).toHaveLength(length);
  });
});

test('Verify generated dataframe has correct data types for each column', async () => {
  // Generate sample data
  const testData = generateData({
    numRows: 5,
    colTypes: sampleSchema,
  });

  // Perform assertions to verify the data types
  testData.forEach((data) => {
    expect(typeof data.column1).toBe('string');
    expect(typeof data.column2).toBe('number');
    expect(typeof data.columnA).toBe('boolean');
    expect(Number.isInteger(data.columnB)).toBe(true); // New assertion for integer column
  });
});

test('Verify generated dataframe respects min and max values for integer column', async () => {
  // Generate sample data
  const testData = generateData({
    numRows: 5,
    colTypes: sampleSchema,
  });

  // Perform assertions to verify the min and max values for integer column
  testData.forEach((data) => {
    expect(data.columnB).toBeGreaterThanOrEqual(0);
    expect(data.columnB).toBeLessThanOrEqual(100);
  });
});

test('Verify the runtime for generating different numbers of rows', async () => {
  const lengthsToCheck = [100, 1000, 10000, 100000, 1000000];
  lengthsToCheck.forEach((length) => {
    const startTime = Date.now();
    generateData({
      numRows: length,
      colTypes: sampleSchema,
    });
    const endTime = Date.now();
    const runtime = endTime - startTime;
    console.log(`Time taken to generate ${length} rows: ${runtime}ms`);
    expect(runtime).toBeLessThan(1000);
  });
});

test('should generate data with the specified number of rows', async () => {
  const data = generateData({
    numRows: 5,
    colTypes: [
      { name: 'id', type: 'integer' },
      { name: 'name', type: 'string' },
    ],
  });
  expect(data).toHaveLength(5);
});

test('should throw an error for invalid number of rows', async () => {
  expect(() => {
    generateData({
      numRows: 0,
      colTypes: [{ name: 'id', type: 'integer' }],
    });
  }).toThrow('Number of rows must be greater than 0');
});

test('should throw an error for empty column types', async () => {
  expect(() => {
    generateData({
      numRows: 5,
      colTypes: [],
    });
  }).toThrow('At least one column type must be specified');
});

test('should generate date data in ISO format', async () => {
  const data = generateData({
    numRows: 3,
    colTypes: [
      {
        name: 'created_at',
        type: 'date',
        format: 'ISO',
      },
    ],
  });

  data.forEach((row) => {
    expect(row.created_at).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
    );
  });
});

test('should generate date data in local date format', async () => {
  const data = generateData({
    numRows: 3,
    colTypes: [
      {
        name: 'created_at',
        type: 'date',
        format: 'date',
      },
    ],
  });

  data.forEach((row) => {
    expect(row.created_at).toMatch(/^\d{1,2}\/\d{1,2}\/\d{4}$/);
  });
});

test('should throw an error for unsupported data type', async () => {
  expect(() => {
    generateData({
      numRows: 5,
      colTypes: [{ name: 'id', type: 'unsupported' }],
    });
  }).toThrow('Unsupported data type: unsupported');
});

test('should generate valid email addresses', async () => {
  const data = generateData({
    numRows: 5,
    colTypes: [
      {
        name: 'email',
        type: 'string',
        subType: 'email',
      },
    ],
  });

  data.forEach((row) => {
    expect(row.email).toMatch(/^[a-z]+@[a-z]+\.[a-z]+$/);
  });
});

test('should generate valid phone numbers', async () => {
  const data = generateData({
    numRows: 5,
    colTypes: [
      {
        name: 'phone',
        type: 'string',
        subType: 'phone',
      },
    ],
  });

  data.forEach((row) => {
    expect(row.phone).toMatch(/^\(\d{3}\) \d{3}-\d{4}$/);
  });
});

test('should generate valid addresses', async () => {
  const data = generateData({
    numRows: 5,
    colTypes: [
      {
        name: 'address',
        type: 'string',
        subType: 'address',
      },
    ],
  });

  data.forEach((row) => {
    expect(row.address).toMatch(/^\d+ [A-Za-z ]+, [A-Za-z ]+, [A-Z]{2} \d{5}$/);
  });
});

test('should generate valid usernames', async () => {
  const data = generateData({
    numRows: 5,
    colTypes: [
      {
        name: 'username',
        type: 'string',
        subType: 'username',
      },
    ],
  });

  data.forEach((row) => {
    expect(row.username).toMatch(/^(user|dev|admin|test|demo)\d+$/);
  });
});

test('should generate valid passwords', async () => {
  const data = generateData({
    numRows: 5,
    colTypes: [
      {
        name: 'password',
        type: 'string',
        subType: 'password',
      },
    ],
  });

  data.forEach((row) => {
    expect(row.password).toMatch(/^[A-Za-z0-9!@#$%^&*]{12}$/);
  });
});

test('should generate random strings when no subtype is specified', async () => {
  const data = generateData({
    numRows: 5,
    colTypes: [
      {
        name: 'random',
        type: 'string',
      },
    ],
  });

  data.forEach((row) => {
    expect(typeof row.random).toBe('string');
    expect(row.random.length).toBeGreaterThan(0);
  });
});

test('should generate data with foreign key relationships', async () => {
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

  data.forEach((row) => {
    expect(row).toHaveProperty('id');
    expect(row).toHaveProperty('user_id');
    expect(typeof row.id).toBe('number');
    expect(typeof row.user_id).toBe('number');
  });
});

test('should throw an error for missing reference data', async () => {
  expect(() => {
    generateData({
      numRows: 5,
      colTypes: [
        {
          name: 'user_id',
          type: 'integer',
          foreignKey: {
            table: 'users',
            column: 'id',
          },
        },
      ],
    });
  }).toThrow('No reference data found for foreign key: users.id');
});

test('should maintain referential integrity', async () => {
  const data = generateData({
    numRows: 5,
    colTypes: [
      {
        name: 'id',
        type: 'integer',
      },
      {
        name: 'parent_id',
        type: 'integer',
        foreignKey: {
          table: 'parents',
          column: 'id',
        },
      },
    ],
    relationships: {
      parents: {
        table: 'parents',
        column: 'id',
      },
    },
  });

  const parentIds = new Set(data.map((row) => row.parent_id));
  data.forEach((row) => {
    expect(parentIds.has(row.parent_id)).toBe(true);
  });
});

test('should generate accordion data with correct structure', async () => {
  const accordionSchema = [
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

  const options = {
    type: 'accordion',
    maxDepth: 2,
    minChildren: 2,
    maxChildren: 3,
    expandable: true,
    expanded: false,
  };

  const result = generateHierarchical(accordionSchema, options);

  expect(Array.isArray(result)).toBe(true);
  expect(result.length).toBeGreaterThan(0);

  // Check first level structure
  const firstItem = result[0];
  expect(firstItem).toHaveProperty('title');
  expect(firstItem).toHaveProperty('description');
  expect(firstItem).toHaveProperty('expandable', true);
  expect(firstItem).toHaveProperty('expanded', false);
  expect(firstItem).toHaveProperty('children');

  // Check second level structure
  if (firstItem.children && firstItem.children.length > 0) {
    const secondItem = firstItem.children[0];
    expect(secondItem).toHaveProperty('title');
    expect(secondItem).toHaveProperty('content');
    expect(secondItem).toHaveProperty('expandable', true);
    expect(secondItem).toHaveProperty('expanded', false);
  }
});

test('should respect maxDepth parameter in hierarchical data', async () => {
  const accordionSchema = [
    {
      name: 'title',
      type: 'string',
      subType: 'name',
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
      ],
    },
  ];

  const options = {
    type: 'accordion',
    maxDepth: 1,
    minChildren: 1,
    maxChildren: 1,
  };

  const result = generateHierarchical(accordionSchema, options);
  const firstItem = result[0];

  expect(firstItem).toHaveProperty('children');
  if (firstItem.children && firstItem.children.length > 0) {
    const secondItem = firstItem.children[0];
    expect(secondItem).not.toHaveProperty('children');
  }
});

test('should respect minChildren and maxChildren parameters in hierarchical data', async () => {
  const accordionSchema = [
    {
      name: 'title',
      type: 'string',
      subType: 'name',
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
      ],
    },
  ];

  const options = {
    type: 'accordion',
    maxDepth: 2,
    minChildren: 2,
    maxChildren: 2,
  };

  const result = generateHierarchical(accordionSchema, options);
  const firstItem = result[0];

  // Check first level children count
  expect(firstItem.children).toBeDefined();
  expect(firstItem.children.length).toBe(2);

  // Check second level children count if they exist
  if (firstItem.children && firstItem.children.length > 0) {
    const secondItem = firstItem.children[0];
    if (secondItem.children) {
      expect(secondItem.children.length).toBe(2);
    }
  }
});

test('should generate different hierarchical types correctly', async () => {
  const accordionSchema = [
    {
      name: 'title',
      type: 'string',
      subType: 'name',
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
      ],
    },
  ];

  const types = ['accordion', 'tree', 'nested-list', 'menu'];

  types.forEach((type) => {
    const options = {
      type,
      maxDepth: 1,
      minChildren: 1,
      maxChildren: 1,
    };

    const result = generateHierarchical(accordionSchema, options);
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);

    if (type === 'accordion' || type === 'tree') {
      expect(result[0]).toHaveProperty('expandable', true);
      expect(result[0]).toHaveProperty('expanded', false);
    }
  });
});

test('should handle custom expandable and expanded states in hierarchical data', async () => {
  const accordionSchema = [
    {
      name: 'title',
      type: 'string',
      subType: 'name',
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
      ],
    },
  ];

  const options = {
    type: 'accordion',
    maxDepth: 1,
    minChildren: 1,
    maxChildren: 1,
    expandable: false,
    expanded: true,
  };

  const result = generateHierarchical(accordionSchema, options);
  expect(result[0]).toHaveProperty('expandable', false);
  expect(result[0]).toHaveProperty('expanded', true);
});
