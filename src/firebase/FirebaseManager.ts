import * as client from "./client";
import { signInWithEmailAndPassword, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, OAuthProvider, GithubAuthProvider, TwitterAuthProvider } from 'firebase/auth';
import { createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, getDocs, QuerySnapshot } from "firebase/firestore";

export class FirebaseManager {
    static instance: FirebaseManager;

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
        //this.SendSignInLinkToEmail("korbinian.maag@gmail.com");
        //this.AuthWithEmailLink();
    }

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

              // updateProfile(client.GetUser(), { displayName: username })
              // .then(() => {
              //   console.log("SET username to " + username)
              // })
              // .catch((error) => {
              //   console.log("CAN'T update Username");
              // });
              
              resolve(true);
            })
            .catch((error) => {
              // Handle sign-up error
              // console.log('Sign-up error:', error);
              resolve(false);
            }
          )
      });
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

    async UploadNewPreset(presetName: string, presetData: string, publicPreset: boolean) {
      if(presetName == "") return;
      if(presetData == "") return;
      if(publicPreset == undefined) return;

      const data = {
        presetName: presetName,
        presetData: presetData,
        presetLikes: 0,
        presetDownloads: 0,
        publicPreset: publicPreset
      }

      const userID = client.GetUserID();
      if(userID == undefined) { //Check user ID
        console.log("ERROR: User-ID is undefined");
        return;
      }
      const presetID = this.GenerateUniquiePresetID(presetName, presetData);

    }

    GenerateUniquiePresetID(presetName, presetData) {
      // Concatenate presetName, presetData, and userID
      const user = client.GetUserID();
      if(user == undefined) return undefined;
      const combinedData = presetName + presetData + user;

      // Generate a UUID based on the combined data
      const uniqueID = uuidv5(combinedData, uuidv5.URL);

      return uniqueID;
    }

    async ReadCollectionData(collectionName: string): Promise<void> {
      try {
        const collectionRef = collection(client.db, collectionName);
        const querySnapshot: QuerySnapshot = await getDocs(collectionRef);
        
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
        });
    
        console.log("Data read successfully.");
      } catch (error) {
        console.error("Error reading collection data:", error);
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