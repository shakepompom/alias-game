import { auth } from './initFirebase';

type LoggedInCallback = (user: firebase.User | null) => void;

type SignInProps = {
  loggedInCallback: LoggedInCallback | Function;
};

export const signIn = ({
  loggedInCallback = Function.prototype,
}: SignInProps): void => {
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
