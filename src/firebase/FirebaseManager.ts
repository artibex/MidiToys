// import { app, db } from "./client";

export class FirebaseManager {
    static instance: FirebaseManager;

    constructor() {
        if (FirebaseManager.instance) {
        return FirebaseManager.instance;
        }
        FirebaseManager.instance = this;

        // console.log(app);
        // console.log(db);
        // console.log("CONNECTED to Firebase");
    }
}