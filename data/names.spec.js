// BEGIN: abpxx6d04wxr
const { test, expect } = require('@playwright/test');
const generateName = require('./names');

test('Verify the name generator function returns a valid name', async () => {
  // Generate sample data
  const testName = generateName();

  // Perform assertions to verify the generated data
  // should a name of format "firstName lastName"
  expect(testName).toMatch(/^[A-Z][a-z]+ [A-Z][a-z]+$/);
  // should not contain any numbers
  expect(testName).not.toMatch(/\d/);
  // should not contain any special characters
  expect(testName).not.toMatch(/[^a-zA-Z ]/);
});
