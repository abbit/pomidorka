export function formatTimeDigits(num: number): string {
	return `${num < 10 ? '0' : ''}${num}`;
}

export function formatTime(total: number): string {
	const secs = total % 60;
	const mins = (total - secs) / 60;
	const hours = Math.floor(total / 3600);

	return `${formatTimeDigits(hours)}:${formatTimeDigits(mins)}:${formatTimeDigits(secs)}`;
}

export function startTimer(
	initialSeconds: number,
	callback: (seconds: number) => void,
): number {
	const startTime = Date.now();

	const timer = window.setInterval(() => {
		const now = Date.now();

		const ms = now - startTime;

		const secs = Math.floor(ms / 1000);

		callback(initialSeconds + secs);
	}, 1000);

	return timer;
}
