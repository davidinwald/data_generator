'use strict';
const __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
const { test, expect } = require('@playwright/test');
const seriesGenerator_1 = require('./seriesGenerator');
test('generateLinearSeries - should generate a linear series', () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const options = { start: 1, end: 5, step: 1 };
    const series = (0, seriesGenerator_1.generateLinearSeries)(options);
    expect(series).toEqual([1, 2, 3, 4, 5]);
  }));
test('generateLinearSeries - should generate a linear series with noise', () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const options = {
      start: 1,
      end: 5,
      step: 1,
      standardDeviation: 0.5,
      precision: 2,
    };
    const series = (0, seriesGenerator_1.generateLinearSeries)(options);
    expect(series).not.toEqual([1, 2, 3, 4, 5]);
  }));
test('generateLinearSeries - should generate a longer linear series', () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const options = { start: 1, end: 10, step: 1 };
    const series = (0, seriesGenerator_1.generateLinearSeries)(options);
    expect(series.length).toEqual(10);
  }));
test('generateLinearSeries - should generate a linear series with custom slope', () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const options = { start: 0, end: 5, step: 1, slope: 2 };
    const series = (0, seriesGenerator_1.generateLinearSeries)(options);
    expect(series).toEqual([0, 2, 4, 6, 8, 10]);
  }));
test('generateLinearSeries - should generate a linear series with custom y-intercept', () =>
  __awaiter(void 0, void 0, void 0, function* () {
    const options = { start: 1, end: 5, step: 1, yIntercept: 2 };
    const series = (0, seriesGenerator_1.generateLinearSeries)(options);
    expect(series).toEqual([3, 4, 5, 6, 7]);
  }));
