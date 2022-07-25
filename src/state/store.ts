import createStore from 'unistore';

import { appConfig } from '../config';
import { isObjectsEqual } from '../utils';
import { ExpiredPersist, Persist } from '../utils/persist';

export interface Settings {
	soundVolume: number;
	soundUrl: string;
	pomodoroDurationMins: number; // in minutes
	breakDurationMins: number; // in minutes
}

export interface State {
	pomodoroCount: number;
	settings: Settings;
	isSettingsOpen: boolean;
}

const mins25 = 25;
const mins5 = 5;

const defaultSettings: Settings = {
	soundVolume: 100,
	soundUrl: appConfig.soundUrls.default,
	pomodoroDurationMins: mins25,
	breakDurationMins: mins5,
};
const persistedSettings = new Persist<Settings>('settings', defaultSettings);

const getPomodoroCountExpiredTime = () => {
	const endOfDay = new Date();
	endOfDay.setHours(23, 59, 59, 999);
	return endOfDay.getTime();
};

const pomodoroCountDefaultValue = 0;
const persistedPomodoroCount = new ExpiredPersist<number>(
	'pomodoroCount',
	getPomodoroCountExpiredTime(),
	pomodoroCountDefaultValue,
);

const settings = persistedSettings.get()!; // couldn't be undefined because default value is set
const pomodoroCount = persistedPomodoroCount.get()!; // couldn't be undefined because default value is set;

const initialState: State = {
	settings,
	pomodoroCount,
	isSettingsOpen: false,
};

export const store = createStore<State>(initialState);

const persistSettings = ({ settings }: State) => {
	const settingsSaved = persistedSettings.get();
	if (!settingsSaved) {
		return;
	}

	if (!isObjectsEqual(settings, settingsSaved)) {
		persistedSettings.set(settings);
	}
};
store.subscribe(persistSettings);

const persistPomodoroCount = ({ pomodoroCount }: State) => {
	const pomodoroCountSaved = persistedPomodoroCount.get();
	if (pomodoroCountSaved === undefined) {
		return;
	}

	if (pomodoroCount !== pomodoroCountSaved) {
		if (persistedPomodoroCount.isExpired()) {
			const updatedDefaultValue = pomodoroCountDefaultValue + 1;

			persistedPomodoroCount.updateExpireTime(getPomodoroCountExpiredTime());
			persistedPomodoroCount.set(updatedDefaultValue);
			store.setState({ pomodoroCount: updatedDefaultValue });
		} else {
			persistedPomodoroCount.set(pomodoroCount);
		}
	}
};
store.subscribe(persistPomodoroCount);
