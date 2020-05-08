import * as firebase from 'firebase/app';
import 'firebase/messaging';
import 'firebase/analytics';

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

export const messaging = firebase.messaging();
export const analytics = firebase.analytics();
