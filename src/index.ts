import { render, h } from 'preact';
import { setPragma } from 'goober';
import { App } from './app';

declare interface NodeModule {
	hot: {
		accept(path?: string, callback?: () => void): void;
	};
}

function init(): void {
	const rootEl = document.getElementById('root');

	if (!rootEl) {
		return;
	}

	rootEl.innerHTML = '';

	Notification.requestPermission();
	setPragma(h);
	render(App(), rootEl);
}

init();

if (process.env.NODE_ENV === 'production') {
	// cache all assets if browser supports serviceworker
	if ('serviceWorker' in navigator) {
		window.addEventListener('load', () => {
			navigator.serviceWorker.register('./sw.js');
		});
	}
} else if (((module as unknown) as NodeModule).hot) {
	// use preact's devtools
	// eslint-disable-next-line global-require
	require('preact/debug');
	((module as unknown) as NodeModule).hot.accept('./app', init);
}
