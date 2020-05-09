import { h } from 'preact';
import { glob as injectGlobal } from 'goober';
import { Layout } from './components/layout';
import { Timer } from './components/timer';

injectGlobal`
	:root {
		--black: #2b2024;
		--bg-color: #fbf9fa;
		--primary-color: #a30f0f;
		--secondary-color: #dd6666;
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
		width: 100vw;
		min-height: 100vh;
		overflow-x: hidden;
		font-weight: 400;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		text-rendering: optimizeLegibility;
	}
`;

export function App() {
	return (
		<Layout>
			<Timer />
		</Layout>
	);
}
