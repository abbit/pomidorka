import { h } from 'preact';
import { styled } from 'goober';

const Container = styled('div')`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const MessageBubble = styled('div')`
	position: relative;
	font-size: 20px;
	padding: 30px 15px 30px 15px;
	margin-top: 30px;
	margin-left: 100px;
	background: #fff;
	border: 2px dashed #c5010a;
	border-radius: 50px;
	background: #fff;

	&::before {
		content: '';
		position: absolute;
		bottom: -30px;
		right: 80px;
		border-width: 0 0 30px 50px;
		border-style: solid;
		border-color: transparent #c5010a;
		display: block;
		width: 0;
	}

	&::after {
		content: '';
		position: absolute;
		bottom: -32px;
		right: 110px;
		border-width: 0 0 30px 20px;
		border-style: solid;
		border-color: transparent var(--bg-color);
		display: block;
		width: 0;
	}
`;

const Img = styled<h.JSX.HTMLAttributes<HTMLImageElement>>('img')`
	min-width: 150px;
	width: 20%;
	max-width: 250px;
	height: auto;
`;

interface MascotProps {
	message: string;
}

export function Mascot({ message }: MascotProps) {
	return (
		<Container>
			<MessageBubble>{message}</MessageBubble>
			<Img src="/img/tomato.png" alt="cute tomato" />
		</Container>
	);
}
