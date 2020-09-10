import createStore from 'unistore';
import devtools from 'unistore/devtools';
import { Persist, ExpiredPersist } from '../utils/persist';
import { isObjectsEqual } from '../utils';
import { appConfig } from '../config';

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

const getPomodoroCountExpiredTime = () => {
	const endOfDay = new Date();
	endOfDay.setHours(23, 59, 59, 999);

	return endOfDay.getTime();
};

const persistedSettings = new Persist<Settings>('settings', defaultSettings);

const pomodoroCountDefaultValue = 0;
const persistedPomodoroCount = new ExpiredPersist<number>(
	'pomodoroCount',
	getPomodoroCountExpiredTime(),
	pomodoroCountDefaultValue,
);

const settings = persistedSettings.get()!;
const pomodoroCount = persistedPomodoroCount.get()!;

const initialState: State = {
	settings,
	pomodoroCount,
	isSettingsOpen: false,
};

export const store =
	process.env.NODE_ENV === 'production'
		? createStore<State>(initialState)
		: devtools(createStore<State>(initialState));

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
