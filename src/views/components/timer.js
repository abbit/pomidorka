import { h, Component } from 'preact';
import { formatTime } from '../../utils';

export default class Timer extends Component {
	state = {
		seconds: parseInt(localStorage.getItem('totalTime')) | 0
	};

	startTimer = () => {
		this.timer = setInterval(() => {
			this.setState({ seconds: this.state.seconds + 1 });
			localStorage.setItem('totalTime', this.state.seconds);
		}, 1000);
	};

	stopTimer = () => {
		clearInterval(this.timer);
	};

	render(props, { seconds }) {
		return (
			<div class="timer-container">
				<div class="timer">{formatTime(seconds)}</div>
				<div class="btn-set">
					<button class="button" onClick={this.startTimer}>
						Start
					</button>
					<button class="button" onClick={this.stopTimer}>
						Stop
					</button>
				</div>
			</div>
		);
	}
}
