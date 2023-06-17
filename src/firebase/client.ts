import {initializeApp } from "firebase/app";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';

import { firebaseConfig } from '@env';

export const app = initializeApp(firebaseConfig);
export var auth = getAuth(app);
  
export var user = undefined;
export function SetUser(u) {
    console.log("SET user " + user);
    user = u;
}
