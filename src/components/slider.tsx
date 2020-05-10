import { h, FunctionalComponent } from 'preact';
import { styled } from 'goober';

const thumbHeight = 16;
const thumbWidth = 16;
const thumbBorderRadius = 15;

const trackHeight = 8;
const trackBorderRadius = 25;

const InputRange = styled<h.JSX.HTMLAttributes<HTMLInputElement>>('input')`
	-webkit-appearance: none;
	width: 100%;
	margin: ${trackHeight / 2}px 0;

	&:focus {
		outline: none;
	}

	&::-webkit-slider-runnable-track {
		width: 100%;
		height: ${trackHeight}px;
		cursor: pointer;
		box-shadow: none;
		background: var(--secondary-color);
		border-radius: ${trackBorderRadius}px;
		border: none;
	}

	&::-webkit-slider-thumb {
		box-shadow: none;
		border: none;
		height: ${thumbHeight}px;
		width: ${thumbWidth}px;
		border-radius: ${thumbBorderRadius}px;
		background: var(--black);
		cursor: pointer;
		-webkit-appearance: none;
		margin-top: ${-trackHeight / 2}px;
	}

	&:focus::-webkit-slider-runnable-track {
		background: var(--secondary-color);
	}

	&::-moz-range-track {
		width: 100%;
		height: ${trackHeight}px;
		cursor: pointer;
		box-shadow: none;
		background: var(--secondary-color);
		border-radius: ${trackBorderRadius}px;
		border: none;
	}

	&::-moz-range-thumb {
		box-shadow: none;
		border: none;
		height: ${thumbHeight}px;
		width: ${thumbWidth}px;
		border-radius: ${thumbBorderRadius}px;
		background: var(--black);
		cursor: pointer;
	}

	&::-ms-track {
		width: 100%;
		height: ${trackHeight}px;
		cursor: pointer;
		background: transparent;
		border-color: transparent;
		color: transparent;
	}

	&::-ms-fill-lower {
		background: var(--secondary-color);
		border: none;
		border-radius: ${trackBorderRadius * 2}px;
		box-shadow: none;
	}

	&::-ms-fill-upper {
		background: var(--secondary-color);
		border: none;
		border-radius: ${trackBorderRadius * 2}px;
		box-shadow: none;
	}

	&::-ms-thumb {
		box-shadow: none;
		border: none;
		height: ${thumbHeight}px;
		width: ${thumbWidth}px;
		border-radius: ${thumbBorderRadius}px;
		background: var(--black);
		cursor: pointer;
		height: ${trackHeight}px;
	}

	&:focus::-ms-fill-lower {
		background: var(--secondary-color);
	}

	&:focus::-ms-fill-upper {
		background: var(--secondary-color);
	}
`;

interface SliderProps extends h.JSX.HTMLAttributes<HTMLInputElement> {}

export const Slider: FunctionalComponent<SliderProps> = ({ type, ...props }) => {
	return <InputRange type="range" {...props} />;
};
