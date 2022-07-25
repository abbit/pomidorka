import { useAction, useSelector } from '@preact-hooks/unistore';
import { styled } from 'goober';
import { FunctionalComponent } from 'preact';

import { Button } from '../components/button';
import { Input } from '../components/input';
import { Select, SelectOption } from '../components/select';
import { Slider } from '../components/slider';
import { appConfig } from '../config';
import {
	setBreakDurationAction,
	setIsSettingsOpenAction,
	setPomodoroDurationAction,
	setSoundAction,
	setSoundVolumeAction,
} from '../state/actions';
import { Settings, State } from '../state/store';
import { playSound } from '../utils';

const Overlay = styled('div')`
	position: fixed;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	background: rgba(0, 0, 0, 0.3);
`;

const Container = styled('div')`
	background: var(--bg-color);
	border-radius: 5px;
	padding: 24px 64px;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: 60vw;

	@media screen and (max-width: 1100px) {
		width: 70vw;
	}

	@media screen and (max-width: 970px) {
		width: 80vw;
		padding: 24px 32px;
	}

	@media screen and (max-width: 700px) {
		width: 100vw;
		height: 100vh;
		padding: 24px 16px;
		padding-bottom: 32px;
	}
`;

const Title = styled('h2')``;

const SettingTitle = styled('h3')`
	margin-bottom: 8px;

	@media screen and (max-width: 700px) {
		font-size: 1.15rem;
	}
`;

const SettingBody = styled('div')`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
`;

const Setting = styled('div')`
	width: 100%;
	padding: 16px;
	display: flex;
	flex-direction: column;

	&:first-child {
		padding-top: 32px;

		@media screen and (max-width: 360px) {
			padding-top: 16px;
		}
	}

	&:last-child {
		padding-bottom: 32px;

		@media screen and (max-width: 360px) {
			padding-bottom: 16px;
		}
	}

	@media screen and (max-width: 360px) {
		padding: 8px;
	}
`;

interface Selected {
	settings: Settings;
	isSettingsOpen: boolean;
}

const selector = ({ isSettingsOpen, settings }: State): Selected => ({
	isSettingsOpen,
	settings,
});

const { soundUrls } = appConfig;

export const SettingsModal: FunctionalComponent = () => {
	const { isSettingsOpen, settings } = useSelector<State, Selected>(selector);
	const setIsSettingsOpen = useAction(setIsSettingsOpenAction);
	const setSoundVolume = useAction(setSoundVolumeAction);
	const setPomodoroDuration = useAction(setPomodoroDurationAction);
	const setBreakDuration = useAction(setBreakDurationAction);
	const setSound = useAction(setSoundAction);

	const soundOptions: SelectOption[] = [
		{
			label: 'Complete Chime',
			value: soundUrls.default,
			default: soundUrls.default === settings.soundUrl,
		},
		{
			label: 'Microwave Bell',
			value: soundUrls.alternative,
			default: soundUrls.alternative === settings.soundUrl,
		},
		{
			label: 'Short Bell',
			value: soundUrls.alternative2,
			default: soundUrls.alternative2 === settings.soundUrl,
		},
		{
			label: 'Russian voice',
			value: soundUrls.rofl,
			default: soundUrls.rofl === settings.soundUrl,
		},
	];

	const closeSettings: JSX.GenericEventHandler<HTMLButtonElement> = (e) => {
		e.preventDefault();

		setIsSettingsOpen(false);
	};

	const closeSettingsByOverlay: JSX.GenericEventHandler<HTMLDivElement> = (e) => {
		e.preventDefault();

		if ((e.target as HTMLElement).id === 'overlay') {
			setIsSettingsOpen(false);
		}
	};

	const onVolumeChange: JSX.GenericEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();

		const newVolume = e.currentTarget.valueAsNumber;

		setSoundVolume(newVolume);
		playSound(settings.soundUrl, newVolume);
	};

	const onSoundChange: JSX.GenericEventHandler<HTMLSelectElement> = (e) => {
		e.preventDefault();

		const newSound = e.currentTarget.value;

		setSound(newSound);
		playSound(newSound, settings.soundVolume);
	};

	const onPomodoroDurationChange: JSX.GenericEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();

		setPomodoroDuration(e.currentTarget.valueAsNumber);
	};

	const onBreakDurationChange: JSX.GenericEventHandler<HTMLInputElement> = (e) => {
		e.preventDefault();

		setBreakDuration(e.currentTarget.valueAsNumber);
	};

	return isSettingsOpen ? (
		<Overlay onClick={closeSettingsByOverlay} id="overlay">
			<Container>
				<Title>Settings</Title>
				<SettingBody>
					<Setting>
						<SettingTitle>Sound Volume</SettingTitle>
						<Slider
							value={settings.soundVolume}
							onChange={onVolumeChange}
							min={0}
							max={100}
						/>
					</Setting>
					<Setting>
						<SettingTitle>Sound</SettingTitle>
						<Select onChange={onSoundChange} options={soundOptions} />
					</Setting>
					<Setting>
						<SettingTitle>Pomodoro duration (in minutes)</SettingTitle>
						<Input
							value={settings.pomodoroDurationMins}
							type="number"
							onChange={onPomodoroDurationChange}
						/>
					</Setting>
					<Setting>
						<SettingTitle>Break duration (in minutes)</SettingTitle>
						<Input
							value={settings.breakDurationMins}
							type="number"
							onChange={onBreakDurationChange}
						/>
					</Setting>
				</SettingBody>
				<Button onClick={closeSettings} id="closeSettingsButton">
					Close
				</Button>
			</Container>
		</Overlay>
	) : null;
};
