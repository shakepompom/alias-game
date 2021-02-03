import { auth } from './initFirebase';
import firebase from 'firebase';

type LoggedInCallback = (user: firebase.User) => void;

type SignInProps = {
  loggedInCallback: LoggedInCallback;
};

export const signIn = ({ loggedInCallback }: SignInProps): void => {
  auth.signInAnonymously().catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
  });

  auth.onAuthStateChanged((user) => {
    if (user) {
      loggedInCallback(user);
    } else {
      // No user is signed in.
    }
  });
};

export const signOut = (): void => {
  auth.signOut();
};
