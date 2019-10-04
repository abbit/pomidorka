import { h } from 'preact';

import { Layout } from './components/layout';
import { Timer } from './components/timer';

export function App(): h.JSX.Element {
	return (
		<Layout>
			<Timer />
		</Layout>
	);
}
