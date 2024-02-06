"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const names_1 = require("./names");
const { test, expect } = require('@playwright/test');
test('Verify the name generator function returns a valid name', () => __awaiter(void 0, void 0, void 0, function* () {
    // Generate sample data
    const testNames = (0, names_1.generateNames)(1);
    const testName = testNames[0];
    // Perform assertions to verify the generated data
    // should a name of format "firstName lastName"
    expect(testName).toMatch(/^[A-Z][a-z]+ [A-Z][a-z]+$/);
    // should not contain any numbers
    expect(testName).not.toMatch(/\d/);
    // should not contain any special characters
    expect(testName).not.toMatch(/[^a-zA-Z ]/);
}));
