import {initializeApp } from "firebase/app";
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { firebaseConfig } from '@env';
import { getFirestore } from "firebase/firestore";

export const app = initializeApp(firebaseConfig);
export var auth = getAuth(app);
export const db = getFirestore();

var user;
export function SetUser(u) {
    console.log("SET user " + u);
    user = u;
}
export function GetUser() {
    return user;
}
