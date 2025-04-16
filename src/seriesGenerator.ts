/**
 * Options for generating mathematical series
 */
interface SeriesOptions {
  /** Starting value of the series */
  start: number;
  /** Ending value of the series */
  end: number;
  /** Step size between values */
  step: number;
  /** Standard deviation for adding random noise (default: 0) */
  standardDeviation?: number;
  /** Number of decimal places to round to (default: 3) */
  precision?: number;
  /** Outlier probability (default: 0) */
  outlierProbability?: number;
  /** Outlier multiplier (default: 3) */
  outlierMultiplier?: number;
}

interface LinearOptions extends SeriesOptions {
  /** Y-intercept for linear series (default: 0) */
  yIntercept?: number;
  /** Slope for linear series (default: 1) */
  slope?: number;
}

interface QuadraticOptions extends SeriesOptions {
  /** Coefficient for x² (default: 1) */
  a?: number;
  /** Coefficient for x (default: 0) */
  b?: number;
  /** Constant term (default: 0) */
  c?: number;
}

interface LogarithmicOptions extends SeriesOptions {
  /** Coefficient for log(x) (default: 1) */
  a?: number;
  /** Constant term for log(x) (default: 0) */
  b?: number;
  /** Base of the logarithm (default: e) */
  base?: number;
}

interface ExponentialOptions extends SeriesOptions {
  /** Coefficient for the exponential term (default: 1) */
  a?: number;
  /** Base of the exponential term (default: 2) */
  b?: number;
  /** Constant term (default: 0) */
  c?: number;
}

interface TrigonometricOptions extends SeriesOptions {
  /** Trigonometric function to generate ('sin', 'cos', 'tan') */
  function: 'sin' | 'cos' | 'tan';
  /** Amplitude of the trigonometric function (default: 1) */
  amplitude?: number;
  /** Frequency of the trigonometric function (default: 1) */
  frequency?: number;
  /** Phase of the trigonometric function (default: 0) */
  phase?: number;
}

function addNoise(
  value: number,
  standardDeviation: number,
  precision?: number,
): number {
  const noise = standardDeviation * (Math.random() * 2 - 1);
  const noisyValue = value + noise;
  return precision && Number.isInteger(precision) && precision > 0
    ? Number(noisyValue.toFixed(precision))
    : noisyValue;
}

function addOutlier(
  value: number,
  probability: number,
  multiplier: number,
): number {
  return Math.random() < probability ? value * multiplier : value;
}

/**
 * Generates a linear series of numbers following the equation y = mx + b
 * @param options - Configuration options for the series
 * @returns Array of numbers following a linear pattern
 * @example
 * // Generate a simple linear series from 1 to 5
 * const series = generateLinearSeries({ start: 1, end: 5, step: 1 });
 * // Result: [1, 2, 3, 4, 5]
 *
 * // Generate a linear series with custom slope and y-intercept
 * const series = generateLinearSeries({
 *   start: 0,
 *   end: 5,
 *   step: 1,
 *   slope: 2,
 *   yIntercept: 1
 * });
 * // Result: [1, 3, 5, 7, 9, 11]
 */
function generateLinearSeries({
  start,
  end,
  step,
  standardDeviation = 0,
  precision = 3,
  yIntercept = 0,
  slope = 1,
  outlierProbability = 0,
  outlierMultiplier = 3,
}: LinearOptions): number[] {
  const series: number[] = [];
  for (let i = start; i <= end; i += step) {
    let value = yIntercept + slope * i;
    value = addNoise(value, standardDeviation, precision);
    value = addOutlier(value, outlierProbability, outlierMultiplier);
    series.push(value);
  }
  return series;
}

/**
 * Generates a quadratic series of numbers following the equation y = x²
 * @param options - Configuration options for the series
 * @returns Array of numbers following a quadratic pattern
 * @example
 * // Generate a quadratic series from 1 to 5
 * const series = generateQuadraticSeries({ start: 1, end: 5, step: 1 });
 * // Result: [1, 4, 9, 16, 25]
 */
function generateQuadraticSeries({
  start,
  end,
  step,
  standardDeviation = 0,
  precision = 3,
  a = 1,
  b = 0,
  c = 0,
  outlierProbability = 0,
  outlierMultiplier = 3,
}: QuadraticOptions): number[] {
  const series: number[] = [];
  for (let i = start; i <= end; i += step) {
    let value = a * i * i + b * i + c;
    value = addNoise(value, standardDeviation, precision);
    value = addOutlier(value, outlierProbability, outlierMultiplier);
    series.push(value);
  }
  return series;
}

/**
 * Generates a logarithmic series of numbers following the equation y = log(x)
 * @param options - Configuration options for the series
 * @returns Array of numbers following a logarithmic pattern
 * @example
 * // Generate a logarithmic series from 1 to 5
 * const series = generateLogSeries({ start: 1, end: 5, step: 1 });
 * // Result: [0, 0.693, 1.099, 1.386, 1.609]
 */
function generateLogSeries({
  start,
  end,
  step,
  standardDeviation = 0,
  precision = 3,
  a = 1,
  b = 0,
  base = Math.E,
  outlierProbability = 0,
  outlierMultiplier = 3,
}: LogarithmicOptions): number[] {
  const series: number[] = [];
  for (let i = start; i <= end; i += step) {
    let value = (a * Math.log(i)) / Math.log(base) + b;
    value = addNoise(value, standardDeviation, precision);
    value = addOutlier(value, outlierProbability, outlierMultiplier);
    series.push(value);
  }
  return series;
}

function generateExponentialSeries({
  start,
  end,
  step,
  standardDeviation = 0,
  precision = 3,
  a = 1,
  b = 2,
  c = 0,
  outlierProbability = 0,
  outlierMultiplier = 3,
}: ExponentialOptions): number[] {
  const series: number[] = [];
  for (let i = start; i <= end; i += step) {
    let value = a * Math.pow(b, i) + c;
    value = addNoise(value, standardDeviation, precision);
    value = addOutlier(value, outlierProbability, outlierMultiplier);
    series.push(value);
  }
  return series;
}

function generateTrigonometricSeries({
  start,
  end,
  step,
  standardDeviation = 0,
  precision = 3,
  function: func,
  amplitude = 1,
  frequency = 1,
  phase = 0,
  outlierProbability = 0,
  outlierMultiplier = 3,
}: TrigonometricOptions): number[] {
  const series: number[] = [];
  for (let i = start; i <= end; i += step) {
    let value: number;
    const x = frequency * i + phase;

    switch (func) {
      case 'sin':
        value = amplitude * Math.sin(x);
        break;
      case 'cos':
        value = amplitude * Math.cos(x);
        break;
      case 'tan':
        value = amplitude * Math.tan(x);
        break;
      default:
        throw new Error(`Unsupported trigonometric function: ${func}`);
    }

    value = addNoise(value, standardDeviation, precision);
    value = addOutlier(value, outlierProbability, outlierMultiplier);
    series.push(value);
  }
  return series;
}

type CombineOperation = 'add' | 'subtract' | 'multiply' | 'divide';

function combineSeries(
  series: number[][],
  operation: CombineOperation,
): number[] {
  if (series.length === 0) return [];

  const maxLength = Math.max(...series.map((s) => s.length));
  const result: number[] = [];

  for (let i = 0; i < maxLength; i++) {
    let value = series[0][i] || 0;

    for (let j = 1; j < series.length; j++) {
      const nextValue = series[j][i] || 0;
      switch (operation) {
        case 'add':
          value += nextValue;
          break;
        case 'subtract':
          value -= nextValue;
          break;
        case 'multiply':
          value *= nextValue;
          break;
        case 'divide':
          value /= nextValue || 1; // Avoid division by zero
          break;
      }
    }

    result.push(value);
  }

  return result;
}

export {
  generateLinearSeries,
  generateQuadraticSeries,
  generateLogSeries,
  generateExponentialSeries,
  generateTrigonometricSeries,
  combineSeries,
  type SeriesOptions,
  type LinearOptions,
  type QuadraticOptions,
  type LogarithmicOptions,
  type ExponentialOptions,
  type TrigonometricOptions,
  type CombineOperation,
};
