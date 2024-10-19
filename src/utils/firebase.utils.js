import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, RecaptchaVerifier, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, query, where, collection, getDocs, addDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, list, listAll, ref, uploadBytes } from 'firebase/storage'
import { v4 } from "uuid";
import { persistor } from "../store/store";


//Firebase config
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
export const db = getFirestore();
export const storage = getStorage(app);
export const auth = new getAuth();
// sign in with pop up
export const signInWithGoogleAccountPopUp = async () => signInWithPopup(auth, provider)

export const signOutUser = async () => {
    persistor.pause();
    persistor.flush().then(() => {
        return persistor.purge(['carts']);
    });
    await signOut(auth)
};
// sign in with Email and Password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};
// create with Email and Password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};
export const onStateAuthChangeListener = (callback) => {
    return onAuthStateChanged(auth, callback)
}
export const createUser = async (userAuth) => {
    const userDoc = doc(db, "users", userAuth.uid)
    const userSnapShot = await getDoc(userDoc)
    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth
        const createdAt = new Date()
        const balance = 0
        try {
            await setDoc(userDoc, {
                displayName,
                email,
                createdAt,
                balance,
            });
        } catch (error) {

        }
    }
    return userDoc;
}


export const createCategory = async (category, img) => {
    const categoryFromDoc = await query(collection(db, "categories"), where("categoryName", "==", category.categoryName))
    const querySnapshot = await getDocs(categoryFromDoc);
    const categoryarray = querySnapshot.docs
    if (categoryarray.length === 0) {
        const { categoryName, categoryImage, categoryTitle, categoryDescription } = category
        const createdAt = new Date()
        try {
            const imgRef = ref(storage, `files/${v4()}`)
            uploadBytes(imgRef, img, { contentType: 'image/png' }).then(async (snapshot) => {
                await addDoc(collection(db, "categories"), {
                    categoryName,
                    createdAt,
                    "categoryImage": snapshot.metadata.fullPath,
                    categoryTitle,
                    categoryDescription
                })
            }).catch(() => {
                return
            });

        } catch (error) {
            console.log(error + "CategoryCreate")
        }
    }
    else {
        alert("Catetegory đã tồn tại")
    }
}

export const listAllCategory = async () => {
    const categoryFromDoc = await query(collection(db, "categories"));
    const querySnapshot = await getDocs(categoryFromDoc);
    const categoriesDTO = await Promise.all(querySnapshot.docs.map(async (category) => {
        const categoryData = category.data();
        const url = await getDownloadURL(ref(storage, `${categoryData.categoryImage}`));
        categoryData.categoryImage = url;
        categoryData.ID = category.id;
        return categoryData;
    }));
    return categoriesDTO;
}

export const createBrand = async (brand) => {
    // const userDoc = doc(db, "categories", brand.uid)
    // const userSnapShot = await getDoc(userDoc)
    // if (await userSnapShot.exists) {
    //     const { categoryName } = category
    //     const createdAt = new Date()
    //     const balance = 0
    // }
    // try {
    //     await setDoc(userDoc, {
    //         categoryName,
    //         createdAt

    //     })
    // } catch (error) {

    // }
}