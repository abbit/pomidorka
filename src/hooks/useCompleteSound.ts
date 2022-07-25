import { useSelector } from '@preact-hooks/unistore';

import { State } from '../state/store';
import { playSound } from '../utils';

interface Selected {
	soundVolume: number;
	soundUrl: string;
}

const selector = ({ settings: { soundUrl, soundVolume } }: State): Selected => ({
	soundUrl,
	soundVolume,
});

export function useCompleteSound() {
	const { soundUrl, soundVolume } = useSelector<State, Selected>(selector);

	const playCompleteSound = () => {
		playSound(soundUrl, soundVolume);
	};

	return { playCompleteSound };
}
