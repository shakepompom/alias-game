import { auth } from './initFirebase';

export const signIn = ({ loggedInCallback = Function.prototype }): void => {
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
