import { render } from 'preact';
import { App } from './app';

import './index.scss';

let root;

function init() {
	const rootEl = document.getElementById('root');

	if (!rootEl) {
		console.error('root element is not found!');
		return;
	}

	root = render(App(), rootEl);
}

init();

if (process.env.NODE_ENV === 'production') {
	// cache all assets if browser supports serviceworker
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker
				.register('./sw.js')
				.then((registration) => {
					console.log('SW registered: ', registration);
				})
				.catch((registrationError) => {
					console.error('SW registration failed: ', registrationError);
				});
		});
	}
} else {
	// listen for HMR
	if ((module as any).hot) {
		// use preact's devtools
		require('preact/debug');

		(module as any).hot.accept('./app', init);
	}
}
