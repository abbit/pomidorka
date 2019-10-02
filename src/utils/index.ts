export function formatTimeDigits(num: number) {
	return `${num < 10 ? '0' : ''}${num}`;
}

export function formatTime(total: number) {
	const secs = total % 60;
	const mins = (total - secs) / 60;
	const hours = Math.floor(total / 3600);

	return `${formatTimeDigits(hours)}:${formatTimeDigits(mins)}:${formatTimeDigits(secs)}`;
}
