import { test, expect } from '@playwright/test';
import {
  generateLinearSeries,
  generateQuadraticSeries,
  generateLogSeries,
  generateExponentialSeries,
  generateTrigonometricSeries,
  combineSeries,
} from './seriesGenerator';

test.describe('Series Generator Tests', () => {
  test.describe('Linear Series', () => {
    test('should generate a basic linear series', () => {
      const series = generateLinearSeries({ start: 1, end: 5, step: 1 });
      expect(series).toEqual([1, 2, 3, 4, 5]);
    });

    test('should generate a linear series with custom slope and y-intercept', () => {
      const series = generateLinearSeries({
        start: 0,
        end: 5,
        step: 1,
        slope: 2,
        yIntercept: 1,
      });
      expect(series).toEqual([1, 3, 5, 7, 9, 11]);
    });

    test('should add noise to linear series', () => {
      const series = generateLinearSeries({
        start: 1,
        end: 5,
        step: 1,
        standardDeviation: 0.1,
        precision: 2,
      });
      expect(series.length).toBe(5);
      series.forEach((value, i) => {
        expect(value).toBeCloseTo(i + 1, 0);
      });
    });

    test('should handle outliers in linear series', () => {
      const series = generateLinearSeries({
        start: 1,
        end: 5,
        step: 1,
        outlierProbability: 1,
        outlierMultiplier: 2,
      });
      expect(series).toEqual([2, 4, 6, 8, 10]);
    });
  });

  test.describe('Quadratic Series', () => {
    test('should generate a basic quadratic series', () => {
      const series = generateQuadraticSeries({ start: 1, end: 5, step: 1 });
      expect(series).toEqual([1, 4, 9, 16, 25]);
    });

    test('should generate a quadratic series with custom coefficients', () => {
      const series = generateQuadraticSeries({
        start: 1,
        end: 5,
        step: 1,
        a: 2,
        b: 1,
        c: 0,
      });
      const expected = [1, 2, 3, 4, 5].map((x) => 2 * x * x + x);
      expect(series).toEqual(expected);
    });

    test('should add noise to quadratic series', () => {
      const series = generateQuadraticSeries({
        start: 1,
        end: 5,
        step: 1,
        standardDeviation: 0.1,
        precision: 2,
      });
      expect(series.length).toBe(5);
      series.forEach((value, i) => {
        expect(value).toBeCloseTo(Math.pow(i + 1, 2), 0);
      });
    });
  });

  test.describe('Logarithmic Series', () => {
    test('should generate a basic logarithmic series', () => {
      const series = generateLogSeries({ start: 1, end: 5, step: 1 });
      expect(series[0]).toBeCloseTo(0, 3);
      expect(series[1]).toBeCloseTo(0.693, 3);
      expect(series[2]).toBeCloseTo(1.099, 3);
      expect(series[3]).toBeCloseTo(1.386, 3);
      expect(series[4]).toBeCloseTo(1.609, 3);
    });

    test('should generate a logarithmic series with custom parameters', () => {
      const series = generateLogSeries({
        start: 1,
        end: 5,
        step: 1,
        a: 2,
        b: 1,
        base: 2,
      });
      expect(series[0]).toBeCloseTo(1, 3);
      expect(series[1]).toBeCloseTo(3, 3);
      expect(series[2]).toBeCloseTo(4.17, 3);
      expect(series[3]).toBeCloseTo(5, 3);
      expect(series[4]).toBeCloseTo(5.644, 3);
    });
  });

  test.describe('Exponential Series', () => {
    test('should generate a basic exponential series', () => {
      const series = generateExponentialSeries({ start: 0, end: 4, step: 1 });
      expect(series).toEqual([1, 2, 4, 8, 16]);
    });

    test('should generate an exponential series with custom parameters', () => {
      const series = generateExponentialSeries({
        start: 0,
        end: 4,
        step: 1,
        a: 2,
        b: 3,
        c: 1,
      });
      expect(series).toEqual([3, 7, 19, 55, 163]);
    });
  });

  test.describe('Trigonometric Series', () => {
    test('should generate a sine wave', () => {
      const series = generateTrigonometricSeries({
        start: 0,
        end: 2 * Math.PI,
        step: Math.PI / 4,
        function: 'sin',
        amplitude: 2,
        frequency: 1,
        phase: 0,
      });
      expect(series[0]).toBeCloseTo(0, 3);
      expect(series[1]).toBeCloseTo(1.414, 3);
      expect(series[2]).toBeCloseTo(2, 3);
      expect(series[3]).toBeCloseTo(1.414, 3);
      expect(series[4]).toBeCloseTo(0, 3);
      expect(series[5]).toBeCloseTo(-1.414, 3);
      expect(series[6]).toBeCloseTo(-2, 3);
      expect(series[7]).toBeCloseTo(-1.414, 3);
      expect(series[8]).toBeCloseTo(0, 3);
    });

    test('should generate a cosine wave with phase shift', () => {
      const series = generateTrigonometricSeries({
        start: 0,
        end: 2 * Math.PI,
        step: Math.PI / 2,
        function: 'cos',
        amplitude: 3,
        frequency: 1,
        phase: Math.PI / 2,
      });
      expect(series[0]).toBeCloseTo(0, 3);
      expect(series[1]).toBeCloseTo(-3, 3);
      expect(series[2]).toBeCloseTo(0, 3);
      expect(series[3]).toBeCloseTo(3, 3);
      expect(series[4]).toBeCloseTo(0, 3);
    });

    test('should throw error for unsupported trigonometric function', () => {
      expect(() => {
        generateTrigonometricSeries({
          start: 0,
          end: 2 * Math.PI,
          step: Math.PI / 4,
          function: 'invalid' as any,
          amplitude: 1,
        });
      }).toThrow('Unsupported trigonometric function: invalid');
    });
  });

  test.describe('Series Combination', () => {
    test('should add two series together', () => {
      const series1 = [1, 2, 3];
      const series2 = [4, 5, 6];
      const result = combineSeries([series1, series2], 'add');
      expect(result).toEqual([5, 7, 9]);
    });

    test('should subtract two series', () => {
      const series1 = [5, 6, 7];
      const series2 = [1, 2, 3];
      const result = combineSeries([series1, series2], 'subtract');
      expect(result).toEqual([4, 4, 4]);
    });

    test('should multiply two series', () => {
      const series1 = [2, 3, 4];
      const series2 = [5, 6, 7];
      const result = combineSeries([series1, series2], 'multiply');
      expect(result).toEqual([10, 18, 28]);
    });

    test('should handle division with zero protection', () => {
      const series1 = [10, 20, 30];
      const series2 = [2, 0, 5];
      const result = combineSeries([series1, series2], 'divide');
      expect(result[0]).toBe(5);
      expect(result[1]).toBe(20); // Should not divide by zero
      expect(result[2]).toBe(6);
    });

    test('should handle series of different lengths', () => {
      const series1 = [1, 2, 3, 4];
      const series2 = [5, 6];
      const result = combineSeries([series1, series2], 'add');
      expect(result).toEqual([6, 8, 3, 4]);
    });
  });
});
