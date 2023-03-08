import React from 'react';

const Header = props => {
  return <h1>{props.title}</h1>;
};

const Part = props => {
  return <p key={props.i}>{props.part} {props.exerciseCount}</p>
};

const Content = props => {
  return props.contentList.map((section, idx) => {
    return <Part i={idx} part={section.part} exerciseCount={section.exerciseCount} />;
  });
};

const Total = props => {
  return <p>Number of exercises {props.count}</p>
};

const App = () => {
  const course = 'Half Stack application development';
  const content = [
    {part: 'Fundamentals of React', exerciseCount: 10},
    {part: 'Using props to pass data', exerciseCount: 7},
    {part: 'State of a component', exerciseCount: 14},
  ];

  return (
    <div>
      <Header title={course} />
      <Content contentList={content} />
      <Total count={content.reduce((acc, section) => {
        return section.exerciseCount + acc;
      }, 0)} />
    </div>
  )
}

export default App
