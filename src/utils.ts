export const sendNotification = (message: string) => {
	if (Notification.permission == 'granted') {
		navigator.serviceWorker.getRegistration().then((reg) => {
			if (!reg) {
				return;
			}

			const options: NotificationOptions = {
				icon: 'img/tomato.png',
				vibrate: [500],
			};

			reg.showNotification(message, options);
		});
	}
};

export const playCompleteSound = () => {
	const sound = new Audio('sounds/4.mp3');
	sound.play();
};
