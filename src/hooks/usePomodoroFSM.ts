import { useAction, useSelector } from '@preact-hooks/unistore';
import { JSX } from 'preact';
import { useMachine } from 'preact-robot';

import { incrementPomodoroCountAction } from '../state/actions';
import {
	pomodoroMachine,
	PomodoroMachineEvent,
	PomodoroMachineState,
} from '../state/pomodoroFSM';
import { State } from '../state/store';
import { sendNotification } from '../utils/notifications';
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
		}
	};

	const getCallback = (state: PomodoroMachineState): VoidFunction => {
		switch (state) {
			case PomodoroMachineState.ActivePomodoro:
				return finishPomodoro;

			case PomodoroMachineState.ActiveBreak:
				return finishBreak;

			default:
				return () => {
					console.error('unexpected state value in getCallback');
				};
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
