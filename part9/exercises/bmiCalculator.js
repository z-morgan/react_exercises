"use strict";
exports.__esModule = true;
var calculateBmi = function (height, weight) {
    var bmi = (weight * 100000) / (height * height);
    if (bmi < 185) {
        return "Underweight";
    }
    else if (bmi >= 185 && bmi < 250) {
        return "Normal weight";
    }
    else if (bmi >= 250 && bmi < 300) {
        return "Overweight";
    }
    else {
        return "Obese";
    }
};
exports["default"] = calculateBmi;
