import { render, h } from 'preact';
import { setPragma } from 'goober';
import * as firebase from 'firebase/app';
import 'firebase/messaging';
import { App } from './app';

setPragma(h);
declare interface NodeModule {
	hot: {
		accept(path?: string, callback?: () => void): void;
	};
}

function initializeFirebase() {
	const firebaseConfig = {
		apiKey: 'AIzaSyCGOlpW8vZzOeoD3C321Teo1ZOK26-6w1M',
		authDomain: 'pomidor-5b2ed.firebaseapp.com',
		databaseURL: 'https://pomidor-5b2ed.firebaseio.com',
		projectId: 'pomidor-5b2ed',
		storageBucket: 'pomidor-5b2ed.appspot.com',
		messagingSenderId: '1069791977456',
		appId: '1:1069791977456:web:e6b1bc402eab9974a24735',
		measurementId: 'G-VLTWQPBBZW',
	};

	firebase.initializeApp(firebaseConfig);
}

function initializeUI() {
	const rootEl = document.getElementById('root');

	if (!rootEl) {
		return;
	}

	rootEl.innerHTML = '';

	render(App(), rootEl);
}

function initializeApp() {
	initializeUI();
	initializeFirebase();

	window.addEventListener('load', () => {
		navigator.serviceWorker.register('./sw.js').then((registration) => {
			const messaging = firebase.messaging();
			messaging.useServiceWorker(registration);

			navigator.serviceWorker.ready.then(() => {
				messaging
					.requestPermission()
					.then(() => {
						return messaging.getToken();
					})
					.then((token) => {
						console.log('user token:', token);
					});
			});
		});
	});
}

initializeApp();

// For hot-reloading in dev mode
if (process.env.NODE_ENV !== 'production' && ((module as unknown) as NodeModule).hot) {
	// use preact's devtools
	// eslint-disable-next-line global-require
	require('preact/debug');
	((module as unknown) as NodeModule).hot.accept('./app', initializeApp);
}
