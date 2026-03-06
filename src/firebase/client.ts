import { firebaseConfig } from "@env";
import { browserLocalPersistence, getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { doc, getFirestore, setDoc } from "firebase/firestore";

export let app: firebase.app.App | undefined;
export let auth: ReturnType<typeof getAuth> | undefined;
export let db: ReturnType<typeof getFirestore> | undefined;

// Only initialise Firebase in the browser — Astro runs this module server-side
// during static generation, where there are no valid credentials.
if (typeof window !== "undefined") {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  app = firebase.app();
  auth = getAuth(app);
  db = getFirestore(app);
}

let user;
let userID = undefined;

async function AutoLogin() {
  if (auth) SetUser(auth.currentUser);
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
  if (!auth) return;
  await auth
    .setPersistence(browserLocalPersistence)
    .then(() => {
      AutoLogin();
    });
}

if (typeof window !== "undefined") {
  SetLocalPersistence();
}

async function uploadData() {
  if (!auth || auth.currentUser == null || auth.currentUser == undefined) {
    console.log("USER is UNDEFINED");
    return;
  } else console.log(auth.currentUser);
    const data = {
      name: "John Doe",
      age: 25,
    };
  
    try {
      await setDoc(doc(db!, "data", "one"), data);
      console.log("Document written successfully");
    } catch (error) {
      console.log("Error writing document:", error);
    }
  }