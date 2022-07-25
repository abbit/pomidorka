import { styled } from 'goober';
import { FunctionalComponent } from 'preact';

import { usePomodoroFSM } from '../hooks/usePomodoroFSM';
import { PomodoroMachineState } from '../state/pomodoroFSM';
import { Button, ButtonStyle } from './button';
import { Mascot } from './mascot';
import { PomodorosCounter } from './pomodorosCounter';
import { Timer } from './timer';

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

export const Content: FunctionalComponent = () => {
	const { pomodoroMachineState, getInitialSeconds, getCallback, getOnClickFunc } =
		usePomodoroFSM();

	const mascotMessage =
		pomodoroMachineState === PomodoroMachineState.StartPomodoro
			? "It's time to work!"
			: "It's time to take a break!";

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
