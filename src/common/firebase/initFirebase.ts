import * as firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';
import 'firebase/auth';
import { Config } from './types';

const config: Config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DB_URL,
};

firebase.initializeApp(config);

export const database = firebase.database();

export const auth = firebase.auth();
