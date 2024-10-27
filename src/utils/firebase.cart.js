import { addDoc, and, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { db } from "./firebase.utils";
import { findProductByID } from "./firebase.createproduct";
import { setCart } from "../store/cart-store/cart-action";

export const addTocart = async (dataProduct, userID) => {
    const cartsQuery = await query(collection(db, "cart"), where("userID", "==", userID));
    const createdAt = new Date()
    const cartsSnapshot = await getDocs(cartsQuery);
    if (cartsSnapshot.empty) {
        await addDoc(collection(db, "cart"), {
            products: [{
                "productID": dataProduct.productID,
                "productName": dataProduct.productName,
                "productPrice": dataProduct.productPrice,
                "productImage": dataProduct.productImage,
                createdAt,
                quality: 1,
            }],
            userID
        })
    }
    else {
        const Cart = cartsSnapshot.docs[0].data()
        const productFind = Cart.products.find(product => product.productID === dataProduct.productID)
        const cartDocumentReference = doc(db, "cart", cartsSnapshot.docs[0].id)
        const cartdocSnap = await getDoc(cartDocumentReference)
        if (productFind) {
            const updatedCarts = Cart.products.map(product => {
                if (product.productID === dataProduct.productID) {
                    return {
                        ...product,
                        quality: product.quality + 1
                    };
                }
                return product;
            });
            await setDoc(cartDocumentReference, {
                ...Cart,
                "products": updatedCarts
            })
        }
        else {
            await setDoc(cartDocumentReference, {
                ...Cart,
                products: [...Cart.products, {
                    "productID": dataProduct.productID,
                    "productName": dataProduct.productName,
                    "productPrice": dataProduct.productPrice,
                    "productImage": dataProduct.productImage,
                    createdAt,
                    quality: 1,
                }],
            })
        }
    }
}

export const removeCart = async (productID, userID) => {
    const cartQuery = await query(collection(db, "cart"), and(where("userID", "==", userID)));
    const arrayQuerycartSnapshot = await getDocs(cartQuery);
    const CartQuerySnapShot = arrayQuerycartSnapshot.docs[0]
    const cartDocumentReference = doc(db, "cart", CartQuerySnapShot.id)
    const cartData = CartQuerySnapShot.data()
    const updatedCarts = cartData.products.map(product => {
        if (product.productID === productID.productID && product.quality > 1) {
            return {
                ...product,
                quality: product.quality - 1
            };
        }
        return product;
    });
    await setDoc(cartDocumentReference, {
        ...cartData,
        "products": updatedCarts
    })
}
export const deleteCart = async (productID, userID) => {
    const cartQuery = await query(collection(db, "cart"), where("userID", "==", userID));
    const arrayQuerycartSnapshot = await getDocs(cartQuery);
    const CartQuerySnapshot = arrayQuerycartSnapshot.docs[0]
    const cartData = CartQuerySnapshot.data()
    const cartDocumentReference = doc(db, "cart", CartQuerySnapshot.id)
    const CartFilter = cartData.products.filter((product) => product.productID !== productID.productID)

    await setDoc(cartDocumentReference, {
        ...cartData,
        "products": CartFilter
    })
}
export const getCartSnapShoot = async (userID, dispatch) => {
    const cartQuery = await query(collection(db, "cart"), where("userID", "==", userID));
    const unsubscribe = onSnapshot(cartQuery, async (queryCartSnapshot) => {
        const cartsQuerySnapshot = await getDocs(cartQuery);
        const cartQueryDocumentSnapshot = cartsQuerySnapshot.docs[0]
        const cartData = cartQueryDocumentSnapshot.data().products
        dispatch(setCart([...cartData]));
    });
    return unsubscribe
}
export const updateCart = () => {

}