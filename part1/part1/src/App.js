import React, {useState} from 'react';

const SayName = props => {
	return <p>My name is {props.name}, my age is {props.age}</p>;
};

const App = () => {
	const msg = 'Hello World';
	const age = 25;
	return (
		<div>
			<p>{msg}</p>
			<SayName name='Zach' age={age} />
		</div>
	);
}

export default App