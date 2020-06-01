/* eslint-disable import/no-extraneous-dependencies */
import * as core from 'workbox-core';
import * as precaching from 'workbox-precaching';

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

self.addEventListener('notificationclick', function (event) {
	event.notification.close();

	// This looks to see if the current is already open and
	// focuses if it is
	event.waitUntil(
		self.clients
			.matchAll({
				type: 'window',
				includeUncontrolled: true,
			})
			.then((windowClients) => {
				let matchingClient: WindowClient | undefined = undefined;

				for (let i = 0; i < windowClients.length; i++) {
					const windowClient = windowClients[i];
					matchingClient = windowClient as WindowClient;
					break;
				}

				if (matchingClient) {
					return matchingClient.focus();
				}
			}),
	);
});
