import * as client from "./client";
import { v5 as uuidv5 } from 'uuid';
import { signInWithEmailAndPassword, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, OAuthProvider, GithubAuthProvider, TwitterAuthProvider, onIdTokenChanged } from 'firebase/auth';
import { createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, getIdToken } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider, browserLocalPersistence, setPersistence } from "firebase/auth";
import { collection, getDocs, QuerySnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";
import { resolve } from "path";

export class FirebaseManager {
    static instance: FirebaseManager;

    fetchedData: any[] = [];

    constructor() {
        if (FirebaseManager.instance) {
        return FirebaseManager.instance;
        }
        FirebaseManager.instance = this;
        // console.log(client.app);
        // console.log(client.auth);
        // console.log(client.auth);
        // console.log("CONNECTED to Firebase");
        // console.log(client.auth.currentUser);
        setTimeout(() => {
          this.ReadCollectionData("users/" + client.GetUserID() + "/polydrum");
        }, 3000);    }

    //Create new email acount
    async EmailSignUp(email, password, username) {
      return new Promise((resolve) => {
        createUserWithEmailAndPassword(client.auth, email, password)
            .then((userCredential) => {
              // User sign-up successful, do something with userCredential.user
              const user = userCredential.user;
              client.SetUser(user);
              console.log('User sign-up successful:', user);
  
              this.UpdateUsername(username);              
              resolve(true);
            })
            .catch((error) => {
              // Handle sign-up error
              // console.log('Sign-up error:', error);
              resolve(false);
            })
      });
    }
    //Sign in with email and password
    async EmailSignIn(email, password) {
      return new Promise((resolve) => { 
        signInWithEmailAndPassword(client.auth, email, password)
          .then((userCredential) => {
            // Login successful, do something with userCredential.user
            const user = userCredential.user;
            client.SetUser(user);
            // console.log('Logged in user:', client.GetUser());
            resolve(true);
          })
          .catch((error) => {
            // Handle login error
            console.log('Login error:', error);
            resolve(false);
          });
      })
    }

    async UpdateUsername(username) {
      return new Promise((resolve) => {
        updateProfile(client.GetUser(), { displayName: username })
        .then(() => {
          // console.log("SET username to " + username)
          resolve(true);
        })
        .catch((error) => {
          // console.log("CAN'T update Username");
          resolve(false);
        });
      })
    }

    async SendPasswordResetEmail(email) {
      return new Promise((resolve) => {
        sendPasswordResetEmail(client.auth, email)
          .then(() => {
            // console.log("Password reset email sent successfully");
            resolve(true);
          })
          .catch((error) => {
            // console.error("Error sending password reset email:", error);
            resolve(false);
          });
      });
    }
    
    async SignUpWithGoogle() {
    // Function to handle Google sign-up
    const provider = new GoogleAuthProvider();
    return new Promise((resolve) => { 
      signInWithPopup(client.auth, provider)
        .then((userCredential) => {
          // User sign-up successful, do something with userCredential.user
          const user = userCredential.user;
          client.SetUser(user);

          // console.log("Signed up with Google:", user);
          // Additional actions after sign-up
          resolve(true);
        })
        .catch((error) => {
          // Handle sign-up error
          // console.error("Google sign-up error:", error);
          resolve(false);
        });
      })
    }
    async SignUpWithGitHub() {
      // Function to handle Google sign-up
      const provider = new GithubAuthProvider();
      return new Promise((resolve) => { 
        signInWithPopup(client.auth, provider)
          .then((userCredential) => {
            // User sign-up successful, do something with userCredential.user
            const user = userCredential.user;
            client.SetUser(user);
            // console.log("Signed up with GitHub:", user);
            // Additional actions after sign-up
            resolve(true);
          })
          .catch((error) => {
            // Handle sign-up error
            // console.error("GitHub sign-up error:", error);
            resolve(false);
        });
      })
    }
    async SignUpWithTwitter() {
      // Function to handle Google sign-up
      const provider = new TwitterAuthProvider();
      return new Promise((resolve) => { 
        signInWithPopup(client.auth, provider)
          .then((userCredential) => {
            // User sign-up successful, do something with userCredential.user
            const user = userCredential.user;
            client.SetUser(user);
            // console.log("Signed up with Twitter", user);
            // Additional actions after sign-up
            resolve(true);
          })
          .catch((error) => {
            // Handle sign-up error
            // console.error("Twitter sign-up error:", error);
            resolve(false);
        });
      })
    }

    //Use this to create a new preset in user account
    async UploadNewPreset(presetName: string, presetData: string, toyType: string,  publicPreset: boolean) {
      if(presetName == undefined || presetName == "") return false;
      if(presetData == undefined || presetData == "") return false;
      if(toyType == undefined || toyType == "") return false;

      //remove spaces and make everything lowercase
      toyType = toyType.toLowerCase().replace(/\s/g, '');

      const toyData = {
        presetName: presetName,
        presetData: presetData,
        presetLikes: 0,
        presetDownloads: 0,
        publicPreset: publicPreset
      }

      const userID = client.GetUserID();
      if(userID == undefined) { //Check user ID
        console.log("ERROR: User-ID is undefined");
        return false;
      }
      const presetUUID = this.GenerateUniquiePresetID(presetName, presetData, toyType);

      const collectionRef = collection(client.db, "documents/users/" + userID);
      const documentRef = doc(collectionRef, presetUUID);

      // console.log("User ID =" + userID);
      // console.log("db ref =" + client.db);
      await setDoc(doc(client.db, "users", userID, toyType, presetUUID), {
        data: toyData
      })
      .then((event) => {
        return true;
      })
      .catch((error) => {
        return false;
      })
    }

    //UUID of the preset to check for dublicates or something idk
    GenerateUniquiePresetID(presetName: string, presetData: string, toyType: string) {
      // Concatenate presetName, presetData, and userID
      const userID = client.GetUserID();

      if(userID == undefined || userID == "") return undefined;
      if(presetName == undefined || presetName == "") return undefined;
      if(presetData == undefined || presetData == "") return undefined;
      if(toyType == undefined || toyType == "") return undefined;

      const combinedData = presetName + presetData + toyType + userID;

      // Generate a UUID based on the combined data
      const uniqueID = uuidv5(combinedData, uuidv5.URL);
      return uniqueID;
    }

    //Get some sweet ass data
    async ReadCollectionData(collectionName: string): Promise<any[]> {
      try {
        const collectionRef = collection(client.db, collectionName);
        const querySnapshot: QuerySnapshot = await getDocs(collectionRef);
        const data: any[] = [];
    
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
    
        // console.log("Data read successfully.");
        return data;
      } catch (error) {
        console.error("Error reading collection data:", error);
        return [];
      }
    }
    
    async RemoveDoc(documentPath: string) {
      try {
        const documentRef = doc(client.db, documentPath);
        await deleteDoc(documentRef);
        console.log("Document deleted successfully.");
        return true;
      } catch (error) {
        console.error("Error deleting document:", error);
        return false;
      }

    }

    // Function to sign out the user
    SignOut() {
      client.auth.signOut()
        .then(() => {
          console.log("User signed out successfully");
          client.SetUser(undefined);
          // Additional actions after sign-out
        })
        .catch((error) => {
          console.error("Error signing out:", error);
        });
    }

    //Works
    SendSignInLinkToEmail(email) {
        if(typeof window == 'undefined') return;
        const actionCodeSettings = {
          url: `${window.location.origin}`, // URL where the user will be redirected after clicking the sign-in link
          handleCodeInApp: true, // Display the sign-in link in the app instead of opening it in a web browser
        };
      
        sendSignInLinkToEmail(client.auth, email, actionCodeSettings)
          .then(() => {
            // Sign-in link sent successfully
            console.log('Sign-in link sent to:', email);
          })
          .catch((error) => {
            // Handle sign-in link sending error
            console.log('Error sending sign-in link:', error);
          });
          window.localStorage.setItem('emailForSignIn', email);
    }
    //Kinda not works
    AuthWithEmailLink() {
        console.log("REAUTH with EmailLink");
        if(typeof window == "undefined") return;

        let email = window.localStorage.getItem('emailForSignIn');
        signInWithEmailLink(client.auth, email, window.location.href)
        .then((userCredential) => {
          // Reauthentication successful, do something with userCredential.user
          client.SetUser(userCredential.user);
          // console.log('USER AUTHENTICATED:', client.GetUser());
          return("Account created!")
        })
        .catch((error) => {
          // Handle reauthentication error
          // console.log('Reauthentication error:', error);
          return (error.message)
        });    
    }
}