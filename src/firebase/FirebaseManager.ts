import * as client from "./client";
import { signInWithEmailAndPassword, sendSignInLinkToEmail, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';


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
        console.log("CONNECTED to Firebase");
        // console.log(client.auth.currentUser);
        //this.SendSignInLinkToEmail("korbinian.maag@gmail.com");
        //this.AuthWithEmailLink();
    }

    EmailSignUp(email, password) {
        createUserWithEmailAndPassword(client.auth, email, password)
          .then((userCredential) => {
            // User sign-up successful, do something with userCredential.user
            const user = userCredential.user;
            console.log('User sign-up successful:', user);
          })
          .catch((error) => {
            // Handle sign-up error
            console.log('Sign-up error:', error);
          });
      }

    EmailSignIn(email, password) {
        signInWithEmailAndPassword(client.auth, email, password)
          .then((userCredential) => {
            // Login successful, do something with userCredential.user
            client.SetUser(userCredential.user);
            // const user = userCredential.user;
            console.log('Logged in user:', client.user);
          })
          .catch((error) => {
            // Handle login error
            console.log('Login error:', error);
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
          console.log('USER AUTHENTICATED:', client.user);
        })
        .catch((error) => {
          // Handle reauthentication error
          console.log('Reauthentication error:', error);
        });    
    }
}