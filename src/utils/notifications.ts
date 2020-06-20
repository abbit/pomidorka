import { appConfig } from '../config';

export const sendNotification = (message: string): void => {
	if (Notification.permission === 'granted') {
		navigator.serviceWorker.getRegistration().then((reg) => {
			if (!reg) {
				return;
			}

			const options: NotificationOptions = {
				icon: appConfig.tomatoImg,
				vibrate: [500],
				badge: appConfig.appIcon,
			};

			reg.showNotification(message, options);
		});
	}
};
