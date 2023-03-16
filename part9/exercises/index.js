"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express = require('express');
var app = express();
var bmiCalculator_1 = __importDefault(require("./bmiCalculator"));
app.get('/hello', function (_req, res) {
    res.send('Hello Full Stack!');
});
app.get('/bmi', function (_req, _res) {
    var height = _req.query.height;
    var weight = _req.query.weight;
    var bmi = (0, bmiCalculator_1["default"])(height, weight);
    console.log(bmi);
});
var PORT = 3003;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
