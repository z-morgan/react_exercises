"use strict";
/*
  add the ability to run this program using command line arguments

  When the program executes, check and see if there are additional arguments
  if so, varify that there are at least two
  if so, verify that all of them are numbers
    if anything fails, throw an exception
*/
var analyzeHours = function (average, success) {
    if (success) {
        return [3, "Great Job!"];
    }
    else {
        if (average === 0) {
            return [1, "Poor Showing."];
        }
        else {
            return [2, 'not too bad but could be better'];
        }
    }
};
var calculateExercises = function (hours, target) {
    var average = hours.reduce(function (acc, hrs) { return acc + hrs; }) / hours.length;
    var _a = analyzeHours(average, average >= target), rating = _a[0], ratingDescription = _a[1];
    return {
        periodLength: hours.length,
        trainingDays: hours.filter(function (n) { return n !== 0; }).length,
        success: average >= target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
};
if (process.argv.length > 2) {
    try {
        if (process.argv.length < 4) {
            throw new Error('Not enough arguments (need at least 2)');
        }
        var args = process.argv.slice(2).map(function (n) { return Number(n); });
        console.log(calculateExercises(args.slice(1), args[0]));
    }
    catch (e) {
        console.log("Error: " + e);
    }
}
else {
    console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
}
