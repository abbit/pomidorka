/* eslint-disable import/no-extraneous-dependencies */
import * as precaching from 'workbox-precaching';
import * as core from 'workbox-core';
import * as firebase from 'firebase/app';
import 'firebase/messaging';

declare let self: WorkboxServiceWorker;

interface WorkboxServiceWorker extends ServiceWorkerGlobalScope {
	__WB_MANIFEST: {
		url: string;
		integrity?: string;
		revision?: string;
	}[];
}

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

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
	const notification = JSON.parse(payload.data.notification);
	const notificationTitle = notification.title;
	const notificationOptions: NotificationOptions = {
		vibrate: [500],
	};

	return self.registration.showNotification(notificationTitle, notificationOptions);
});

core.skipWaiting();
core.clientsClaim();

// eslint-disable-next-line no-underscore-dangle
precaching.precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		}),
	);
});
