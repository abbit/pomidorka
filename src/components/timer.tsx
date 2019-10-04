import { h } from 'preact';
import { formatTime } from '../utils';
import { useTimer } from '../hooks/useTimer';

export function Timer(): h.JSX.Element {
	const { seconds, start: startTimer, stop: stopTimer } = useTimer();

	return (
		<div className="timer-container">
			<div className="timer">{formatTime(seconds)}</div>
			<div className="btn-set">
				<button type="button" className="button" onClick={startTimer}>
					Start
				</button>
				<button type="button" className="button" onClick={stopTimer}>
					Stop
				</button>
			</div>
		</div>
	);
}
