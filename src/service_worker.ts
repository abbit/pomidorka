/* eslint-disable import/no-extraneous-dependencies */
import * as precaching from 'workbox-precaching';
import * as core from 'workbox-core';

declare let self: WorkboxServiceWorker;

interface WorkboxServiceWorker extends ServiceWorkerGlobalScope {
	__WB_MANIFEST: {
		url: string;
		integrity?: string;
		revision?: string;
	}[];
}

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
