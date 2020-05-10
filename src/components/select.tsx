import { h, FunctionalComponent } from 'preact';
import { styled } from 'goober';
import { icons } from '../icons';

export interface SelectOption {
	value: string;
	label: string;
	default?: boolean;
	disabled?: boolean;
}

interface SelectProps extends h.JSX.HTMLAttributes<HTMLSelectElement> {
	options: SelectOption[];
}

const StyledSelect = styled<h.JSX.HTMLAttributes<HTMLSelectElement>>('select')`
	display: block;
	width: 100%;
	max-width: 100%;
	font-size: 1rem;
	font-weight: 600;
	color: var(--black);
	line-height: 1.3;
	border: 2px solid var(--black);
	box-shadow: none;
	padding: 16px;
	border-radius: 0.5em;
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	background-color: #fff;
	background-image: url("data:image/svg+xml,${icons.arrowDownIcon}");
	background-repeat: no-repeat, repeat;
	background-position: right 0.7em top 50%, 0 0;
	background-size: 0.65em auto, 100%;

	&::-ms-expand {
		display: none;
	}

	&:hover {
		border-color: var(--gray);
	}

	&:focus {
		border-color: var(--gray);
		box-shadow: 0 0 1px 3px rgba(59, 153, 252, 0.7);
		box-shadow: 0 0 0 3px -moz-mac-focusring;
		outline: none;
	}

	& option {
		font-weight: normal;
	}
`;

const renderOption = (option: SelectOption) => (
	<option
		key={option.value}
		value={option.value}
		disabled={option.disabled}
		selected={option.default}>
		{option.label}
	</option>
);

const renderOptions = (options: SelectOption[], placeholder?: string) => {
	const children = options.map((item) => renderOption(item));

	if (placeholder) {
		children.unshift(renderOption({ label: placeholder, value: '', disabled: true }));
	}

	return children;
};

export const Select: FunctionalComponent<SelectProps> = ({
	value,
	options,
	placeholder,
	onChange,
	...props
}) => (
	<StyledSelect onChange={onChange} {...props}>
		{renderOptions(options, placeholder)}
	</StyledSelect>
);
