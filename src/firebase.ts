import { appConfig } from './config';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/performance';

firebase.initializeApp(appConfig.firebaseConfig);

export const analytics = firebase.analytics();
const perf = firebase.performance();
