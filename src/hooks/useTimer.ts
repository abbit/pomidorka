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
	start: (initialSeconds: number) => void;
	stop: () => void;
} {
	const [seconds, setSeconds] = useState(0);
	const [timerId, setTimerId] = useState<number | undefined>(undefined);

	function updateSeconds(newSeconds: number): void {
		setSeconds(() => newSeconds);
	}

	function start(initialSeconds: number): void {
		updateSeconds(initialSeconds);
		const id = startTimer(initialSeconds, updateSeconds);
		setTimerId(() => id);
	}

	function stop(): void {
		clearInterval(timerId);
		updateSeconds(0);
	}

	return { seconds, start, stop };
}
