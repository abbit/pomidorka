import { h } from 'preact';
import { styled } from 'goober';

export const Button = styled<h.JSX.HTMLAttributes<HTMLButtonElement>>('button')`
	border: 0;
	border-radius: 0.25em;
	background: var(--secondary-color);
	color: #fff;
	font-size: 1.5rem;
	white-space: nowrap;
	text-decoration: none;
	padding: 1.5em 2.2em;
	cursor: pointer;
	min-width: 250px;
`;
