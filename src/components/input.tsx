import { styled } from 'goober';
import { FunctionalComponent } from 'preact';

const StyledInput = styled('input')`
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

interface InputProps extends JSX.HTMLAttributes<HTMLInputElement> {
	value: number;
}

export const Input: FunctionalComponent<InputProps> = ({ value, onChange, ...props }) => {
	return <StyledInput value={value} onChange={onChange} {...props} />;
};
