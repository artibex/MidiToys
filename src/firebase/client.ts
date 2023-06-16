import firebase from 'firebase/app';
import 'firebase/firestore';

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
