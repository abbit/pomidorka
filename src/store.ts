import createStore from 'unistore';
import devtools from 'unistore/devtools';
import { createPersistence } from './persistence';
import { isObjectsEqual } from './utils';
import { appConfig } from './config';

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

const savedSettings = createPersistence<Settings>('settings');

if (!savedSettings.has()) {
	savedSettings.set(defaultSettings);
}

let settings = savedSettings.get();

if (!settings) {
	settings = defaultSettings;
}

const initialState: State = {
	settings,
	isSettingsOpen: false,
};

export const store =
	process.env.NODE_ENV === 'production'
		? createStore<State>(initialState)
		: devtools(createStore<State>(initialState));

store.subscribe(({ settings }) => {
	const saved = savedSettings.get();

	if (!saved) {
		return;
	}

	if (!isObjectsEqual(settings, saved)) {
		savedSettings.set(settings);
	}
});
