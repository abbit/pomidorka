import { h, FunctionalComponent } from 'preact';
import { styled } from 'goober';
import { useTimer } from '../hooks/useTimer';
import { formatTime } from '../utils/time';
import { useEffect, useState } from 'preact/hooks';

const TimerText = styled('div')`
	font-size: 5rem;
	font-weight: 500;
`;

interface TimerProps {
	initialSeconds: number;
	callback?: Function;
}

export const Timer: FunctionalComponent<TimerProps> = ({ initialSeconds, callback }) => {
	const { seconds: currentSeconds, start: startTimer } = useTimer();
	const [isTimerStarted, setIsTimerStarted] = useState(false);

	useEffect(() => {
		const stopTimer = startTimer(initialSeconds);
		setIsTimerStarted(true);

		return () => {
			stopTimer();
		};
	}, []);

	if (isTimerStarted && currentSeconds <= 0) {
		if (callback !== undefined) {
			callback();
		}
	}

	return <TimerText>{formatTime(currentSeconds)}</TimerText>;
};
