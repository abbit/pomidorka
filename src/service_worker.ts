import * as precaching from 'workbox-precaching';
import * as routing from 'workbox-routing';

declare let self: ServiceWorkerGlobalScope;

self.addEventListener('message', (event) => {
	if (event.data && event.data.type === 'SKIP_WAITING') {
		self.skipWaiting();
	}
});

// self.__WB_MANIFEST is default injection point
precaching.precacheAndRoute(self.__WB_MANIFEST);
// cleanup old assets
precaching.cleanupOutdatedCaches();
// to allow work offline
let denylist: undefined | RegExp[];
if (import.meta.env.DEV) denylist = [/^\/manifest.webmanifest$/];
routing.registerRoute(
	new routing.NavigationRoute(precaching.createHandlerBoundToURL('index.html'), {
		denylist,
	}),
);

self.addEventListener('notificationclick', function (event) {
	event.notification.close();
	// This looks to see if the current is already open and focuses if it is
	event.waitUntil(
		self.clients
			.matchAll({
				type: 'window',
				includeUncontrolled: true,
			})
			.then((windowClients) => {
				for (const windowClient of windowClients) {
					if (windowClient) return windowClient.focus();
				}
			}),
	);
});
