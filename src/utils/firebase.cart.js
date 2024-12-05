import { and, collection, deleteDoc, doc, getDocs, increment, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db, storage } from "./firebase.utils";
import { setCart, setProductsID } from "../store/cart-store/cart-action";
import { getDownloadURL, ref } from "firebase/storage";


export const addTocart = async (productID, userID) => {
    const cartsQuery = query(collection(db, "cart"), and(where("productID", "==", productID), where("userID", "==", userID)));
    const cartsSnapshot = await getDocs(cartsQuery);
    if (cartsSnapshot.empty) {
        try {
            const cRef = collection(db, "cart");
            const cartID = doc(cRef).id;
            const dRef = doc(db, "cart", cartID);
            await setDoc(dRef, {
                productID,
                quality: 1,
                userID,
                cartID
            });
        } catch (error) {
            console.log(error)
        }
    }
    else {
        updateCart(cartsSnapshot.docs[0].id, "Increase")
    }
}

// đây là hàm lấy cart snapshot
let unSubscribeCart = [];

export const getCartSnapShoot = async (userID, dispatch) => {
    try {
        const cartQuery = query(collection(db, "cart"), where("userID", "==", userID));
        const unsubscribe = onSnapshot(cartQuery, async (queryCartSnapshot) => {
            const carts = [];
            const productIDArray = [];
            queryCartSnapshot.forEach((doc) => {
                carts.push(doc.data());
                productIDArray.push(doc.data().productID);
            });
            queryCartSnapshot.docChanges().forEach(async (change) => {
                if (change.type === "added") {
                    const productQuery = query(collection(db, "product"), where("productID", "in", productIDArray));
                    const querySnapshot = (await getDocs(productQuery)).docs;
                    const cartUpdate = await Promise.all(carts.map(async (cartItem) => {
                        const productFind = querySnapshot.find(productItem => (cartItem.productID === productItem.id));
                        const productData = productFind.data();
                        const url = await getDownloadURL(ref(storage, `${productData.productImage}`));
                        return {
                            ...cartItem,
                            ...productData,
                            "productImage": url
                        }
                    }))
                    dispatch(setCart(cartUpdate));
                }
                if (change.type === "modified") {
                    dispatch(setCart(carts));
                }
                if (change.type === "removed") {
                    dispatch(setCart(carts));
                }
            });

        });
        unSubscribeCart.push(unsubscribe);
    } catch (error) {
        console.log(error)
    }
}

export const unSnapshotCart = () => {
    unSubscribeCart.forEach(subcriber => {
        subcriber();
    })
}

// Cập nhật cart
export const updateCart = async (cartID, type) => {
    try {
        const cartDocumentReference = doc(db, "cart", cartID);
        switch (type) {
            case "Increase":
                await updateDoc(cartDocumentReference, {
                    quality: increment(1)
                });
                break;
            case "Decrease":
                await updateDoc(cartDocumentReference, {
                    quality: increment(-1)
                });
                break;
            case "Remove":
                await deleteDoc(cartDocumentReference);
                break;
            default:
        }
    } catch (error) {
        console.log(error)
    }
};

// lấy card và productID
export const getCartAndProductID = async (userID, dispatch) => {
    const cartQuery = query(collection(db, "cart"), where("userID", "==", userID));
    const unsubscribe = onSnapshot(cartQuery, (queryCartSnapshot) => {
        const carts = [];
        const productIDArray = [];
        const productArray = [];
        queryCartSnapshot.forEach((doc) => {
            carts.push(doc.data());
            productIDArray.push(doc.data().productID);
        });
        dispatch(setProductsID(productIDArray))
        dispatch(setCart(carts))
    });
    return unsubscribe;
}