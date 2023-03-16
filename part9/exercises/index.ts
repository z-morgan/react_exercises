const express = require('express');
const app = express();
import calculateBmi from './bmiCalculator';

app.get('/hello', (_req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req: any, _res: any) => {
  const height = _req.query.height;
  const weight = _req.query.weight;
  const digitsPattern = /^\d+$/;
  
  if (digitsPattern.test(height) && digitsPattern.test(weight)) {
    const bmi = calculateBmi(height, weight);
    _res.json({ weight, height, bmi });
  } else {
    _res.json({error: "malformatted parameters"});
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});