import { appConfig } from './config';

export const sendNotification = (message: string): void => {
	if (Notification.permission === 'granted') {
		navigator.serviceWorker.getRegistration().then((reg) => {
			if (!reg) {
				return;
			}

			const options: NotificationOptions = {
				icon: appConfig.tomatoImg,
				vibrate: [500],
			};

			reg.showNotification(message, options);
		});
	}
};

export const playSound = (soundUrl: string, volume: number): void => {
	const sound = new Audio(soundUrl);
	sound.volume = volume / 100;
	sound.play();
};

export const isObjectsEqual = (a: object, b: object): boolean =>
	JSON.stringify(a) === JSON.stringify(b);
