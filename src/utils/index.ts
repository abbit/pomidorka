export const isObjectsEqual = (a: object, b: object): boolean =>
	JSON.stringify(a) === JSON.stringify(b);

export const playSound = (soundUrl: string, volume: number): void => {
	const sound = new Audio(soundUrl);
	sound.volume = volume / 100;
	sound.play();
};
