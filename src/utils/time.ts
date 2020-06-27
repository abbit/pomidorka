const formatTimeDigits = (num: number): string => {
	return `${num < 10 ? '0' : ''}${num}`;
};

export const formatTime = (total: number): string => {
	const secs = total % 60;
	const mins = (total - secs) / 60;
	const hours = Math.floor(total / 3600);

	return `${formatTimeDigits(hours)}:${formatTimeDigits(mins)}:${formatTimeDigits(secs)}`;
};
