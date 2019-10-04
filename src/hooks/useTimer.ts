import { useState, useEffect } from 'preact/hooks';
import { startTimer } from '../utils';

export function useTimer(
	initialSeconds = 0,
): {
	seconds: number;
	start: () => void;
	stop: () => void;
} {
	const [seconds, setSeconds] = useState(initialSeconds);
	const [timerId, setTimerId] = useState<number | undefined>(undefined);

	useEffect(() => {
		const totalTime = localStorage.getItem('totalTime');

		if (!totalTime) {
			return;
		}

		setSeconds(() => parseInt(totalTime, 10));
	}, []);

	function updateSeconds(newSeconds: number): void {
		setSeconds(() => newSeconds);
		localStorage.setItem('totalTime', seconds.toString());
	}

	function start(): void {
		const id = startTimer(seconds, updateSeconds);
		setTimerId(() => id);
	}

	function stop(): void {
		clearInterval(timerId);
	}

	return { seconds, start, stop };
}
