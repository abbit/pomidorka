import { h } from 'preact';
import { useState, useCallback } from 'preact/hooks';
import { formatTime } from '../utils';

// const startTimer = (state: any, setState: any) => {
// 	const timer = setInterval(() => {
// 		setState({ seconds: state.seconds + 1 });

// 		localStorage.setItem('totalTime', state.seconds);
// 	}, 1000);
// };

// const stopTimer = (timer: NodeJS.Timeout) => {
// 	clearInterval(timer);
// };

export function Timer() {
	let initialStateSeconds = 0;

	const totalTime = localStorage.getItem('totalTime');

	if (totalTime) {
		initialStateSeconds = parseInt(totalTime);
	}

	const [seconds, setSeconds] = useState(initialStateSeconds);

	const onClick = () => {
		console.log('lol');
	};

	return (
		<div class="timer-container">
			<div class="timer">{formatTime(seconds)}</div>
			<div class="btn-set">
				<button class="button" onClick={onClick}>
					Start
				</button>
				<button class="button" onClick={onClick}>
					Stop
				</button>
			</div>
		</div>
	);
}
