import { ActionFn } from 'unistore';
import { State } from './store';

export const setPomodoroDurationAction: ActionFn<State> = (
	{ settings },
	durationMins: number,
) => ({
	settings: {
		...settings,
		pomodoroDurationMins: durationMins,
	},
});

export const setBreakDurationAction: ActionFn<State> = (
	{ settings },
	durationMins: number,
) => ({
	settings: {
		...settings,
		breakDurationMins: durationMins,
	},
});

export const setIsSettingsOpenAction: ActionFn<State> = (
	{ isSettingsOpen },
	isOpen: boolean,
) => ({
	isSettingsOpen: isOpen,
});

export const setSoundVolumeAction: ActionFn<State> = ({ settings }, volume: number) => ({
	settings: {
		...settings,
		soundVolume: volume,
	},
});

export const setSoundAction: ActionFn<State> = ({ settings }, newSoundUrl: string) => ({
	settings: {
		...settings,
		soundUrl: newSoundUrl,
	},
});
