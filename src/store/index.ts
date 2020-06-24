import createStore from 'unistore';
import devtools from 'unistore/devtools';
import { Persist } from '../utils/persist';
import { isObjectsEqual } from '../utils';
import { appConfig } from '../config';

export interface Settings {
	soundVolume: number;
	soundUrl: string;
	pomodoroDurationMins: number; // in minutes
	breakDurationMins: number; // in minutes
}

export interface State {
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

const settings = persistedSettings.get()!;

const initialState: State = {
	settings,
	isSettingsOpen: false,
};

export const store =
	process.env.NODE_ENV === 'production'
		? createStore<State>(initialState)
		: devtools(createStore<State>(initialState));

store.subscribe(({ settings }) => {
	const settingsSaved = persistedSettings.get();
	if (!settingsSaved) {
		return;
	}

	if (!isObjectsEqual(settings, settingsSaved)) {
		persistedSettings.set(settings);
	}
});
