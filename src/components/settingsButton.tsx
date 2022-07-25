import { useAction } from '@preact-hooks/unistore';
import { styled } from 'goober';
import { FunctionalComponent } from 'preact';

import { icons } from '../icons';
import { setIsSettingsOpenAction } from '../state/actions';

const Icon = styled('img')`
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
