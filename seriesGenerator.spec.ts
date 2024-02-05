const { test, expect } = require('@playwright/test');

import { generateLinearSeries } from './seriesGenerator';

test('generateLinearSeries - should generate a linear series', async () => {
  const options = { start: 1, end: 5, step: 1 };
  const series = generateLinearSeries(options);
  expect(series).toEqual([1, 2, 3, 4, 5]);
});

test('generateLinearSeries - should generate a linear series with noise', async () => {
  const options = {
    start: 1,
    end: 5,
    step: 1,
    standardDeviation: 0.5,
    precision: 2,
  };
  const series = generateLinearSeries(options);
  expect(series).not.toEqual([1, 2, 3, 4, 5]);
});

test('generateLinearSeries - should generate a longer linear series', async () => {
  const options = { start: 1, end: 10, step: 1 };
  const series = generateLinearSeries(options);
  expect(series.length).toEqual(10);
});

test('generateLinearSeries - should generate a linear series with custom slope', async () => {
  const options = { start: 0, end: 5, step: 1, slope: 2 };
  const series = generateLinearSeries(options);
  expect(series).toEqual([0, 2, 4, 6, 8, 10]);
});

test('generateLinearSeries - should generate a linear series with custom y-intercept', async () => {
  const options = { start: 1, end: 5, step: 1, yIntercept: 2 };
  const series = generateLinearSeries(options);
  expect(series).toEqual([3, 4, 5, 6, 7]);
});
