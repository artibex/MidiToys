import { initializeApp } from "firebase/app";
import { getAuth, browserLocalPersistence } from 'firebase/auth';
import { firebaseConfig } from '@env';
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { FirebaseManager } from "./FirebaseManager";


export const app = initializeApp(firebaseConfig);
export var auth = getAuth(app);
export var db = getFirestore(app);

var user;
var userID = undefined;

async function AutoLogin() {
    SetUser(auth.currentUser);
    // FirebaseManager.instance.ReadCollectionData("users/" + GetUserID());
    // uploadData();
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