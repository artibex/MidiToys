import { firebaseConfig } from '@env';
import { browserLocalPersistence, getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { doc, getFirestore, setDoc } from 'firebase/firestore';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
export let app;
export let auth = getAuth(app);
export let db = getFirestore(app);

let user;
let userID = undefined;

async function AutoLogin() {
    SetUser(auth.currentUser);
}

export function SetUser(u) {
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

async function uploadData() {
    if(auth.currentUser == null || auth.currentUser == undefined) {
        console.log("USER is UNDEFINED");
        return;
    } else console.log(auth.currentUser);
    const data = {
      name: "John Doe",
      age: 25,
    };
  
    try {
      await setDoc(doc(db, "data", "one"), data);
      console.log("Document written successfully");
    } catch (error) {
      console.log("Error writing document:", error);
    }
  }