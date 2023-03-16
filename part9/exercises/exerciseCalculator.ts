/*
  add the ability to run this program using command line arguments

  When the program executes, check and see if there are additional arguments
  if so, varify that there are at least two
  if so, verify that all of them are numbers
    if anything fails, throw an exception
*/

interface TrainingDetails {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number,
}

const analyzeHours = (average: number, success: boolean): [number, string] => {
  if (success) {
    return [3, "Great Job!"];
  } else {
    if (average === 0) {
      return [1, "Poor Showing."];
    } else {
      return [2, 'not too bad but could be better'];
    }
  }
};

const calculateExercises = (hours: number[], target: number): TrainingDetails => {
  const average = hours.reduce((acc, hrs) => acc + hrs) / hours.length;
  
  const [ rating, ratingDescription ] = analyzeHours(average, average >= target);

  return {
    periodLength: hours.length,
    trainingDays: hours.filter(n => n !== 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

if (process.argv.length > 2) {
  try {
    if (process.argv.length < 4) {
      throw new Error('Not enough arguments (need at least 2)');
    }
    const args = process.argv.slice(2).map(n => Number(n));
    console.log(calculateExercises(args.slice(1), args[0]));
  } catch (e) {
    console.log("Error: " + e);
  }
} else {
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
}