const { test, expect } = require("@playwright/test");

const generateData = require("./dataGenerator");

const sampleSchema = [
  { name: "column1", type: "string", subType: "name" },
  { name: "column2", type: "number", min: 0, max: 100, precision: 2 },
  { name: "columnA", type: "boolean" },
  { name: "columnB", type: "integer", min: 0, max: 100 }, // New column for integers
];

test("Verify generated dataframe has column names as expected", async () => {
  // Generate sample data
  const testData = generateData({
    numRows: 5,
    colTypes: sampleSchema,
  });

  console.log("testData", testData);

  // Perform assertions to verify the generated data
  expect(testData).toHaveLength(5);
  expect(testData[0]).toHaveProperty("column1");
  expect(testData[0]).toHaveProperty("column2");
  expect(testData[0]).toHaveProperty("columnA");
  expect(testData[0]).toHaveProperty("columnB"); // New column

  // Check for extra columns
  testData.forEach((data) => {
    expect(Object.keys(data)).toHaveLength(4); // Assuming 4 columns in total
  });
});

test("Verify generated dataframe has the correct number of rows", async () => {
  // Generate sample data
  const testData = generateData({
    numRows: 10, // Change the number of rows as per your requirement
    colTypes: sampleSchema,
  });

  // Perform assertion to verify the number of rows
  expect(testData).toHaveLength(10); // Change the expected number of rows as per your requirement

  const lengthsToCheck = [0, 1, 5, 10, 50, 100];
  lengthsToCheck.forEach((length) => {
    const testData = generateData({
      numRows: length,
      colTypes: sampleSchema,
    });
    expect(testData).toHaveLength(length);
  });
});

test("Verify generated dataframe has correct data types for each column", async () => {
  // Generate sample data
  const testData = generateData({
    numRows: 5,
    colTypes: sampleSchema,
  });

  // Perform assertions to verify the data types
  testData.forEach((data) => {
    expect(typeof data.column1).toBe("string");
    expect(typeof data.column2).toBe("number");
    expect(typeof data.columnA).toBe("boolean");
    expect(Number.isInteger(data.columnB)).toBe(true); // New assertion for integer column
  });
});

test("Verify generated dataframe respects min and max values for integer column", async () => {
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
