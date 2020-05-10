import { h, FunctionalComponent } from 'preact';
import { glob as injectGlobal } from 'goober';
import { StoreProvider } from '@preact-hooks/unistore';
import { Layout } from './components/layout';
import { Timer } from './components/timer';
import { SettingsModal } from './components/settingsModal';
import { store } from './store';

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

export const App: FunctionalComponent = () => {
	return (
		<StoreProvider value={store}>
			<Layout>
				<Timer />
			</Layout>
			<SettingsModal />
		</StoreProvider>
	);
};
