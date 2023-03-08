import React, { useState } from 'react'

const Button = ({ handleClick, text }) => {
  console.log(handleClick, text);
  return <button onClick={handleClick}>
    {text}
  </button>
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return (
    <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
    );
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={good} />
          <StatisticLine text='neutral' value={neutral} />
          <StatisticLine text='bad' value={bad} />
          <StatisticLine text='all' value={all} />
          <StatisticLine text='average' value={average} />
          <StatisticLine text='positive' value={positive} />
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1);
  const incrementNeutral = () => setNeutral(neutral + 1);
  const incrementBad = () => setBad(bad + 1);

  const all = good + neutral + bad;
  const average = ((good - bad) / all) || 0;
  const positive = (good / all) * 100 || 0;

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={incrementGood} text='good' />
      <Button handleClick={incrementNeutral} text='neutral' />
      <Button handleClick={incrementBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad}
                  all={all} average={average} positive={positive} />
    </div>
  )
}

export default App


/*
use conditional rendering to show a message until initial feedback is given


*/