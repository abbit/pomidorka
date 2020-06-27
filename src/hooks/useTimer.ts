import { useState } from 'preact/hooks';

function startTimer(initialSeconds: number, callback: (seconds: number) => void): number {
	const startTime = Date.now();

	const timer = window.setInterval(() => {
		const now = Date.now();
		const ms = now - startTime;
		const secs = Math.floor(ms / 1000);

		callback(initialSeconds - secs);
	}, 1000);

	return timer;
}

export function useTimer(): {
	seconds: number;
	start: (initialSeconds: number) => () => void;
} {
	const [seconds, setSeconds] = useState(1);
	// const [timerId, setTimerId] = useState<number | undefined>(undefined);

	const updateSeconds = (newSeconds: number): void => {
		setSeconds(newSeconds);
	};

	const start = (initialSeconds: number): (() => void) => {
		updateSeconds(initialSeconds);
		const timerId = startTimer(initialSeconds, updateSeconds);

		const stop = () => {
			clearInterval(timerId);
			updateSeconds(0);
		};

		return stop;
	};

	return { seconds, start };
}
