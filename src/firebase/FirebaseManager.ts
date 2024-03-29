import * as client from "./client";
import { v5 as uuidv5 } from 'uuid';
import { signInWithEmailAndPassword, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink, GithubAuthProvider, TwitterAuthProvider, onIdTokenChanged, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { collection, getDocs, QuerySnapshot, doc, setDoc, deleteDoc, DocumentData, serverTimestamp, query, where, collectionGroup, orderBy } from "firebase/firestore";

export class FirebaseManager {
    static instance: FirebaseManager;

    fetchedData: any[] = [];

    constructor() {
        if (FirebaseManager.instance) {
        return FirebaseManager.instance;
        }
        FirebaseManager.instance = this;
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
      if(presetName == undefined || presetName == "") {
        console.log("presetName is null")
        return false;
      } 
      if(presetData == undefined || presetData == "") {
        console.log("presetData is null")
        return false;
      }
      if(toyType == undefined || toyType == "") {
        console.log("toyType is null")
        return false;
      }

      console.log("UPLOAD preset");
      //remove spaces and make everything lowercase
      toyType = toyType.toLowerCase().replace(/\s/g, '');

      const userID = client.GetUserID();

      if(userID == undefined) { //Check user ID
        console.log("ERROR: User-ID is undefined");
        return false;
      }
      const presetUUID = this.GenerateUniquiePresetID(presetName, presetData, userID);

      const collection = toyType + "/" + presetUUID;

      console.log("UPLOAD doc in: " + collection);
      // console.log("User ID =" + userID);
      // console.log("db ref =" + client.db);
      await setDoc(doc(client.db, collection), {
        userID: userID,
        presetName: presetName.toLowerCase(),
        presetData: presetData,
        publicPreset: publicPreset,
        uploadDate: serverTimestamp()
      })
      .then((event) => {
        return true;
      })
      .catch((error) => {
        return false;
      })
    }

    //Get some sweet ass data
    async ReadMyPresets(toyType: string): Promise<any[]> {
      // console.log("GET MyCollection: " + toyType);
      try {
        const q = query(
          collection(client.db, toyType),
          where("userID", "==", client.GetUserID()),
        );
        const querySnapshot: QuerySnapshot = await getDocs(q);

        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data()});
        });
    
        // console.log("Data read successfully.");
        // console.log(data[0]);
        return data;
      } catch (error) {
        console.error("Error reading collection data:", error);
        return [];
      }
    }
    
    //Filter some sweet as data
    async SearchPresetsByPresetName(toyType: string, searchString: string) {
      // console.log("FILTER online presets. toyType = "+ toyType + " search = " + searchString);
      // if(searchString == undefined) return;
      const q = query(
        collection(client.db, toyType),
        where("presetName", ">=", searchString.toLowerCase()),
        where("presetName", "<=", searchString.toLowerCase() + "\uf8ff")
      );

      try {
        const querySnapshot: QuerySnapshot = await getDocs(q);
        // console.log(querySnapshot);

        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data()});
          // console.log(doc.id);
          // console.log(doc.data().presetName);
        });

        return data;
      } catch (error) {
        console.error("Error searching presets:", error);
        throw error;
      }
    }

    async GetNewesPresets(toyType: string) {
      // console.log("FILTER online presets. toyType = "+ toyType + " search = " + searchString);
      // if(searchString == undefined) return;
      const q = query(
        collection(client.db, toyType),
        orderBy("uploadDate")
      );

      try {
        const querySnapshot: QuerySnapshot = await getDocs(q);
        const reversedSnapshot = querySnapshot.docs.reverse();
        // console.log(querySnapshot);

        const data: any[] = [];
        reversedSnapshot.forEach((doc) => {
          if(doc.data().userID != client.GetUserID()) {
            data.push({ id: doc.id, ...doc.data()});
          }
          // console.log(doc.id);
          // console.log(doc.data().presetName);
        });

        return data;
      } catch (error) {
        console.error("Error searching presets:", error);
        throw error;
      }
    }

    async RemoveDoc(documentPath: string) {
      // console.log("PATH = " + documentPath);
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