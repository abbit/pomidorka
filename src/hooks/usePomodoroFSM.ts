import { JSX } from 'preact';
import { useMachine } from 'preact-robot';
import { useSelector, useAction } from '@preact-hooks/unistore';
import { sendNotification } from '../utils/notifications';
import {
	pomodoroMachine,
	PomodoroMachineEvent,
	PomodoroMachineState,
} from '../state/pomodoroFSM';
import { analytics } from '../config/firebase';
import { State } from '../state/store';
import { incrementPomodoroCountAction } from '../state/actions';
import { useCompleteSound } from './useCompleteSound';

interface Selected {
	pomodoroDurationMins: number;
	breakDurationMins: number;
}

const selector = ({
	settings: { pomodoroDurationMins, breakDurationMins },
}: State): Selected => ({
	pomodoroDurationMins,
	breakDurationMins,
});

export function usePomodoroFSM() {
	const [currentMachine, sendMachineEvent] = useMachine(pomodoroMachine);

	const { pomodoroDurationMins, breakDurationMins } = useSelector<State, Selected>(
		selector,
	);

	const { playCompleteSound } = useCompleteSound();

	const incrementPomodoroCount = useAction(incrementPomodoroCountAction);

	const pomodoroMachineState: PomodoroMachineState = currentMachine.name;

	const pomodoroDurationSecs = pomodoroDurationMins * 60;
	const breakDurationSecs = breakDurationMins * 60;

	const sendEvent = (event: string) => {
		sendMachineEvent(event);
		analytics.logEvent(event);
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

	const getOnClickFunc = (
		state: PomodoroMachineState,
	): JSX.MouseEventHandler<HTMLButtonElement> => {
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

	return { pomodoroMachineState, getInitialSeconds, getCallback, getOnClickFunc };
}
