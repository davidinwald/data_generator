interface SeriesOptions {
  start: number;
  end: number;
  step: number;
  standardDeviation?: number;
  precision?: number;
  yIntercept?: number;
  slope?: number;
}

function generateLinearSeries({
  start,
  end,
  step,
  standardDeviation = 0,
  precision = 3,
  yIntercept = 0,
  slope = 1,
}: SeriesOptions): number[] {
  const series: number[] = [];
  for (let i = start; i <= end; i += step) {
    const noise = standardDeviation * Math.random();
    const value = yIntercept + slope * i + noise;
    const roundedValue =
      precision && Number.isInteger(precision) && precision > 0
        ? Number(value.toFixed(precision))
        : value;
    series.push(roundedValue);
  }
  return series;
}

function generateQuadraticSeries({
  start,
  end,
  step,
  standardDeviation = 0,
}: SeriesOptions): number[] {
  const series: number[] = [];
  for (let i = start; i <= end; i += step) {
    const noise = standardDeviation * Math.random();
    series.push(i * i + noise);
  }
  return series;
}

function generateLogSeries({
  start,
  end,
  step,
  standardDeviation = 0,
}: SeriesOptions): number[] {
  const series: number[] = [];
  for (let i: number = start; i <= end; i += step) {
    const noise = standardDeviation * Math.random();
    series.push(Math.log(i) + noise);
  }
  return series;
}

export { generateLinearSeries, generateQuadraticSeries, generateLogSeries };
