"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLogSeries = exports.generateQuadraticSeries = exports.generateLinearSeries = void 0;
function generateLinearSeries({ start, end, step, standardDeviation = 0, precision = 3, yIntercept = 0, slope = 1, }) {
    const series = [];
    for (let i = start; i <= end; i += step) {
        const noise = standardDeviation * Math.random();
        const value = yIntercept + slope * i + noise;
        const roundedValue = precision && Number.isInteger(precision) && precision > 0
            ? Number(value.toFixed(precision))
            : value;
        series.push(roundedValue);
    }
    return series;
}
exports.generateLinearSeries = generateLinearSeries;
function generateQuadraticSeries({ start, end, step, standardDeviation = 0, }) {
    const series = [];
    for (let i = start; i <= end; i += step) {
        const noise = standardDeviation * Math.random();
        series.push(i * i + noise);
    }
    return series;
}
exports.generateQuadraticSeries = generateQuadraticSeries;
function generateLogSeries({ start, end, step, standardDeviation = 0, }) {
    const series = [];
    for (let i = start; i <= end; i += step) {
        const noise = standardDeviation * Math.random();
        series.push(Math.log(i) + noise);
    }
    return series;
}
exports.generateLogSeries = generateLogSeries;
