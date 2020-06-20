import { h } from 'preact';
import { styled } from 'goober';

export enum ButtonStyle {
	Large = 'large',
	Default = 'default',
}

interface ButtonProps extends h.JSX.HTMLAttributes<HTMLButtonElement> {
	style?: ButtonStyle;
}

export const Button = styled<ButtonProps>('button')`
	border: 0;
	border-radius: 0.25em;
	background: var(--secondary-color);
	color: #fff;
	font-size: ${(props) => (props.style === ButtonStyle.Large ? 1.5 : 1.2)}rem;
	white-space: nowrap;
	text-decoration: none;
	padding: ${(props) =>
		props.style === ButtonStyle.Large ? '1.5em 2.2em' : '0.5em 1em'};
	cursor: pointer;
	min-width: ${(props) => (props.style === ButtonStyle.Large ? 250 : 100)}px;

	@media screen and (max-width: 700px) {
		font-size: ${(props) => (props.style === ButtonStyle.Large ? 1.5 : 1.3)}rem;
		padding: ${(props) => (props.style === ButtonStyle.Large ? '1.5em 2.2em' : '1em')};
		min-width: ${(props) => (props.style === ButtonStyle.Large ? 300 : 200)}px;
	}
`;
