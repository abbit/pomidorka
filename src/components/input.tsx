import { h, FunctionalComponent } from 'preact';
import { styled } from 'goober';

const StyledInput = styled<h.JSX.HTMLAttributes<HTMLInputElement>>('input')`
	border: 2px solid var(--black);
	box-shadow: none;
	margin: 0;
	padding: 16px;
	background: #fff;
	border-radius: 0.5em;
	font-size: 1rem;

	@media screen and (max-width: 360px) {
		padding: 10px;
	}

	&:focus {
		border-color: var(--gray);
		outline: none;
	}

	&:hover {
		border-color: var(--gray);
	}
`;

interface InputProps extends h.JSX.HTMLAttributes<HTMLInputElement> {
	value: number;
	onChange: h.JSX.GenericEventHandler<HTMLInputElement>;
}

export const Input: FunctionalComponent<InputProps> = ({ value, onChange, ...props }) => {
	return <StyledInput value={value} onChange={onChange} {...props} />;
};
