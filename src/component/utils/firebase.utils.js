import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAdWEGcJ-IWyPC9uLf3ZKraXmnW9bbWccI",
    authDomain: "mini-shopee-8e03b.firebaseapp.com",
    projectId: "mini-shopee-8e03b",
    storageBucket: "mini-shopee-8e03b.appspot.com",
    messagingSenderId: "929631891294",
    appId: "1:929631891294:web:57e65643c1dfb8cdcae9cf",
    measurementId: "G-SYD8JSQFRJ"
};

const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider;
provider.setCustomParameters({
    prompt: "select_account"
})
export const auth = new getAuth();
export const signInWithGoogleAccount = async () => signInWithPopup(auth, provider)
export const db = getFirestore();

export const createUser = async (userAuth) => {
    const userDoc = doc(db, "users", auth.uid)
    if (await userAuth.exists) {
        const { displayName, email } = userAuth
        const createdAt = new Date()
        const balance = 0

    }
    try {
        await setDoc(userDoc, {
            displayName,
            email,
            createdAt,
            balance
        })
    } catch (error) {

    }
}
