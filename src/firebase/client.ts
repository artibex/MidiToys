import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence } from 'firebase/auth';
import { firebaseConfig } from '@env';
import { getFirestore, persistentLocalCache } from "firebase/firestore";

export const app = initializeApp(firebaseConfig);
export var auth = getAuth(app);
export const db = getFirestore();

var user;
var userID = undefined;

function AutoLogin() {
    SetUser(auth.currentUser);
    // console.log("User = " +  auth.currentUser);
}


export function SetUser(u) {
    // console.log("SET user " + u);
    user = u;

    //If logout event, set userID to undefined
    if(u == undefined) {
        userID = undefined;
    } else userID = user.uid;
}
export function GetUser() {
    return user;
}
export function GetUserID() {
    return userID;
}

export async function SetLocalPersistence() {
   await auth.setPersistence(browserLocalPersistence)
   .then((result) => {
       AutoLogin();
   })
}

SetLocalPersistence();