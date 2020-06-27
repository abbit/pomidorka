import { h, FunctionalComponent } from 'preact';
import { useSelector } from '@preact-hooks/unistore';
import { State } from '../state/store';

interface Selected {
	pomodoroCount: number;
}

const selector = ({ pomodoroCount }: State): Selected => ({
	pomodoroCount,
});

export const PomodorosCounter: FunctionalComponent = () => {
	const { pomodoroCount } = useSelector<State, Selected>(selector);

	return <span>Pomodoros done today: {pomodoroCount}</span>;
};
