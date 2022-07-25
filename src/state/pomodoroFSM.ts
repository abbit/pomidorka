import { createMachine, state, transition } from 'robot3';

export enum PomodoroMachineEvent {
	StartPomodoro = 'START_POMODORO',
	CancelPomodoro = 'CANCEL_POMODORO',
	DonePomodoro = 'DONE_POMODORO',
	StartBreak = 'START_BREAK',
	CancelBreak = 'CANCEL_BREAK',
	DoneBreak = 'DONE_BREAK',
}

export enum PomodoroMachineState {
	StartPomodoro = 'StartPomodoro',
	ActivePomodoro = 'ActivePomodoro',
	StartBreak = 'StartBreak',
	ActiveBreak = 'ActiveBreak',
}

export const pomodoroMachine = createMachine<typeof PomodoroMachineState>({
	StartPomodoro: state(
		transition(PomodoroMachineEvent.StartPomodoro, PomodoroMachineState.ActivePomodoro),
	),
	ActivePomodoro: state(
		transition(PomodoroMachineEvent.CancelPomodoro, PomodoroMachineState.StartPomodoro),
		transition(PomodoroMachineEvent.DonePomodoro, PomodoroMachineState.StartBreak),
	),
	StartBreak: state(
		transition(PomodoroMachineEvent.StartBreak, PomodoroMachineState.ActiveBreak),
	),
	ActiveBreak: state(
		transition(PomodoroMachineEvent.CancelBreak, PomodoroMachineState.StartPomodoro),
		transition(PomodoroMachineEvent.DoneBreak, PomodoroMachineState.StartPomodoro),
	),
});
