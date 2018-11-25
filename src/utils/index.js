export const minTwoDigits = num => (num < 10 ? '0' : '') + num;

export const formatTime = total => {
	const secs = total % 60;
	const mins = (total - secs) / 60;
	const hours = Math.floor(total / 3600);

	return `${minTwoDigits(hours)}:${minTwoDigits(mins)}:${minTwoDigits(secs)}`;
};
