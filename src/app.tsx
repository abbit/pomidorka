import { StoreProvider } from '@preact-hooks/unistore';
import { glob as injectGlobal } from 'goober';
import { FunctionalComponent } from 'preact';

import { Layout } from './components/layout';
import { ReloadPrompt } from './components/reloadPrompt';
import { SettingsModal } from './components/settingsModal';
import { store } from './state/store';

injectGlobal`
	:root {
		--black: #010202;
		--gray: #777;
		--bg-color: #fbf9fa;
		--primary-color: #a30f0f;
		--secondary-color: #ed3d3d;
		--accent-color: #ffd700;
	}

	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		color: var(--black);
		background: var(--bg-color);
		font-family: 'Helvetica Neue', Arial, Helvetica, sans-serif;
		font-size: 1.2rem;
		width: 100vw;
		min-height: 100vh;
		overflow-x: hidden;
		font-weight: 400;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		text-rendering: optimizeLegibility;
	}
`;

export const App: FunctionalComponent = () => (
	<StoreProvider value={store}>
		<Layout />
		<SettingsModal />
		<ReloadPrompt />
	</StoreProvider>
);
