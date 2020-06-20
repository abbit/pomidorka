import { h, FunctionalComponent } from 'preact';
import { useAction } from '@preact-hooks/unistore';
import { styled } from 'goober';
import { setIsSettingsOpenAction } from '../store/actions';
import { icons } from '../icons';

const Icon = styled<h.JSX.HTMLAttributes<HTMLImageElement>>('img')`
	width: 32px;
	height: 32px;
	filter: invert(1);
	cursor: pointer;
`;

export const SettingsButton: FunctionalComponent = () => {
	const setIsSettingsOpen = useAction(setIsSettingsOpenAction);

	const openSettings = () => setIsSettingsOpen(true);

	return (
		<Icon src={icons.settingsIcon} alt="settings button icon" onClick={openSettings} />
	);
};
