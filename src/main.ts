import { setup } from 'goober';
import { h, render } from 'preact';

import { App } from './app';

setup(h);

function initializeUI() {
	const rootEl = document.getElementById('root');
	if (!rootEl) {
		return;
	}

	rootEl.innerHTML = '';
	render(App({}), rootEl);
}

function initializeApp() {
	initializeUI();
	Notification.requestPermission();
}

initializeApp();
