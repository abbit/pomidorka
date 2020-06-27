import { h, FunctionalComponent } from 'preact';
import { styled } from 'goober';
import { useMachine } from 'preact-robot';
import { useSelector, useAction } from '@preact-hooks/unistore';
import { playSound } from '../utils';
import { sendNotification } from '../utils/notifications';
import {
	pomodoroMachine,
	PomodoroMachineEvent,
	PomodoroMachineState,
} from '../state/pomodoroFSM';
import { analytics } from '../config/firebase';
import { Mascot } from './mascot';
import { Timer } from './timer';
import { Button, ButtonStyle } from './button';
import { State } from '../state/store';
import { incrementPomodoroCountAction } from '../state/actions';
import { PomodorosCounter } from './pomodorosCounter';

const Container = styled('div')`
	display: grid;
	height: 100%;
	width: 100%;
	grid-template-columns: 20% 1fr 20%;
	grid-template-rows: 1fr 25%;
	grid-template-areas:
		'left center right'
		'leftBottom centerBottom rightBottom';
`;

const CenterAreaContainer = styled('div')`
	grid-area: center;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const LeftAreaContainer = styled('div')`
	grid-area: left;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CenterBottomAreaContainer = styled('div')`
	grid-area: centerBottom;
	display: flex;
	justify-content: center;
	align-items: center;
`;

interface Selected {
	pomodoroDurationMins: number;
	breakDurationMins: number;
	soundVolume: number;
	soundUrl: string;
}

const selector = ({ settings }: State): Selected => ({
	...settings,
});

export const Content: FunctionalComponent = () => {
	const [currentMachine, sendMachineEvent] = useMachine(pomodoroMachine);

	const { pomodoroDurationMins, breakDurationMins, soundUrl, soundVolume } = useSelector<
		State,
		Selected
	>(selector);

	const incrementPomodoroCount = useAction(incrementPomodoroCountAction);

	const pomodoroMachineState: PomodoroMachineState = currentMachine.name;

	const pomodoroDurationSecs = pomodoroDurationMins * 60;
	const breakDurationSecs = breakDurationMins * 60;

	const mascotMessage =
		pomodoroMachineState === PomodoroMachineState.StartPomodoro
			? "It's time to work!"
			: "It's time to take a break!";

	const sendEvent = (event: string) => {
		sendMachineEvent(event);
		analytics.logEvent(event);
	};

	const playCompleteSound = () => {
		playSound(soundUrl, soundVolume);
	};

	const finishPomodoro = () => {
		sendEvent(PomodoroMachineEvent.DonePomodoro);
		incrementPomodoroCount();
		playCompleteSound();
		sendNotification('Done! Its time to take a break!');
	};

	const finishBreak = () => {
		sendEvent(PomodoroMachineEvent.DoneBreak);
		playCompleteSound();
		sendNotification('Its time to work!');
	};

	const startPomodoro = () => {
		sendEvent(PomodoroMachineEvent.StartPomodoro);
	};

	const cancelPomodoro = () => {
		sendEvent(PomodoroMachineEvent.CancelPomodoro);
	};

	const startBreak = () => {
		sendEvent(PomodoroMachineEvent.StartBreak);
	};

	const cancelBreak = () => {
		sendEvent(PomodoroMachineEvent.CancelBreak);
	};

	const getButtonText = (state: PomodoroMachineState): string => {
		switch (state) {
			case PomodoroMachineState.ActiveBreak:
				return 'Skip Break';

			case PomodoroMachineState.ActivePomodoro:
				return 'Cancel Pomodoro';

			case PomodoroMachineState.StartBreak:
				return 'Start Break';

			case PomodoroMachineState.StartPomodoro:
				return 'Start Pomodoro';

			default:
				return 'Error';
		}
	};

	const getOnClickFunc = (
		state: PomodoroMachineState,
	): h.JSX.MouseEventHandler<HTMLButtonElement> => {
		switch (state) {
			case PomodoroMachineState.ActiveBreak:
				return cancelBreak;

			case PomodoroMachineState.ActivePomodoro:
				return cancelPomodoro;

			case PomodoroMachineState.StartBreak:
				return startBreak;

			case PomodoroMachineState.StartPomodoro:
				return startPomodoro;

			default:
				return () => {};
		}
	};

	const getCallback = (state: PomodoroMachineState): Function => {
		switch (state) {
			case PomodoroMachineState.ActivePomodoro:
				return finishPomodoro;

			case PomodoroMachineState.ActiveBreak:
				return finishBreak;

			default:
				return () => {};
		}
	};

	const getInitialSeconds = (state: PomodoroMachineState): number => {
		switch (state) {
			case PomodoroMachineState.ActivePomodoro:
				return pomodoroDurationSecs;

			case PomodoroMachineState.ActiveBreak:
				return breakDurationSecs;

			default:
				return 0;
		}
	};

	return (
		<Container>
			<LeftAreaContainer>
				<PomodorosCounter />
			</LeftAreaContainer>
			<CenterAreaContainer>
				{pomodoroMachineState === PomodoroMachineState.ActivePomodoro ||
				pomodoroMachineState === PomodoroMachineState.ActiveBreak ? (
					<Timer
						initialSeconds={getInitialSeconds(pomodoroMachineState)}
						callback={getCallback(pomodoroMachineState)}
					/>
				) : (
					<Mascot message={mascotMessage} />
				)}
			</CenterAreaContainer>
			<CenterBottomAreaContainer>
				<Button
					style={ButtonStyle.Large}
					type="button"
					onClick={getOnClickFunc(pomodoroMachineState)}>
					{getButtonText(pomodoroMachineState)}
				</Button>
			</CenterBottomAreaContainer>
		</Container>
	);
};
