import { addDoc, and, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase.utils";
import { v4 } from "uuid";
import { findProductByID, findProductByIDSnapShoot } from "./firebase.createproduct";
import { setCart } from "../store/cart-store/cart-action";

export const addTocart = async (productID, userID) => {
    // const productdocRef = doc(db, `categories/${categoryID}`, `Product/${v4()}`)
    // const productFromDoc = await query(collection(db, `categories/${categoryID}/Product`), where("productName", "==", productCreate.productName))
    // const queryproductSnapshot = await getDocs(productFromDoc);
    // const arrayProduct = queryproductSnapshot.docs

    // try {
    //     if (arrayProduct.length === 0) {
    //         const { productName, productTitle, productPrice, productSoldCount, productLocation, categoryID } = productCreate
    //         const createdAt = new Date()
    //         try {
    //             const imgRef = ref(storage, `files/productImage/${v4()}`)
    //             uploadBytes(imgRef, image, { contentType: 'image/png' }).then(async (snapshot) => {
    //                 await setDoc(productdocRef, {
    //                     productName,
    //                     productTitle,
    //                     createdAt,
    //                     "productImage": snapshot.metadata.fullPath,
    //                     productPrice,
    //                     productSoldCount,
    //                     productLocation,
    //                     categoryID

    //                 })
    //                 console.log(productCreate)
    //             }).catch(() => {
    //                 return
    //             });
    //         } catch (error) {
    //             console.log(error + "ProductCreate")
    //         }
    //     }
    //     else {
    //         alert("Product đã tồn tại")
    //     }
    // } catch (error) {
    //     console.log(error)
    // }
    const cartQuery = await query(collection(db, "cart"), and(where("productID", "==", productID), where("userID", "==", userID)));
    const createdAt = new Date()
    const arrayQuerycartSnapshot = await getDocs(cartQuery);
    const CartQuery = arrayQuerycartSnapshot.docs[0]
    console.log(CartQuery)
    if (CartQuery === undefined) {
        await addDoc(collection(db, "cart"), {
            productID,
            userID,
            quanlity: 1,
            createdAt
        })
    }
    else {
        const cartDoc = doc(db, "cart", CartQuery.id)
        const cartdocSnap = await getDoc(cartDoc)
        const cartData = CartQuery.data()
        try {
            await setDoc(cartDoc, {
                ...cartData,
                quanlity: cartData.quanlity + 1
            });
        } catch (error) {
            console.log(error)
        }
    }
    return CartQuery;
}
export const getCart = async (userID) => {
    const cartQuery = await query(collection(db, "cart"), where("userID", "==", userID));
    const arrayQuerycartSnapshot = await getDocs(cartQuery);
    const cartsData = await Promise.all(arrayQuerycartSnapshot.docs.map(async (cart) => {
        const cartData = cart.data();
        const product = await findProductByID(cartData.productID)
        // const url = await getDownloadURL(ref(storage, `${categoryData.categoryImage}`));
        // cartData.categoryImage = url;
        cartData.productImage = product.productImage
        cartData.productPrice = product.productPrice
        cartData.productName = product.productName
        return cartData;
    }))
    return cartsData;
}
export const removeCart = async (productID, userID) => {
    const cartQuery = await query(collection(db, "cart"), and(where("productID", "==", productID), where("userID", "==", userID)));
    const arrayQuerycartSnapshot = await getDocs(cartQuery);
    const CartQuery = arrayQuerycartSnapshot.docs[0]
    const cartDoc = doc(db, "cart", CartQuery.id)
    const cartdocSnap = await getDoc(cartDoc)
    const cartData = CartQuery.data()
    try {
        await setDoc(cartDoc, {
            ...cartData,
            quanlity: cartData.quanlity - 1
        });
    } catch (error) {
        console.log(error)
    }
}
export const deleteCart = async (productID, userID) => {
    const cartQuery = await query(collection(db, "cart"), and(where("productID", "==", productID), where("userID", "==", userID)));
    const arrayQuerycartSnapshot = await getDocs(cartQuery);
    const CartQuery = arrayQuerycartSnapshot.docs[0]
    const cartDoc = doc(db, "cart", CartQuery.id)
    await deleteDoc(cartDoc);
}


export const getCartSnapShoot = async (userID, dispatch) => {
    const cartQuery = await query(collection(db, "cart"), where("userID", "==", userID));
    const unsubscribe = onSnapshot(cartQuery, async (queryCartSnapshot) => {
        const updatedCarts = await Promise.all(queryCartSnapshot.docs.map(async (doc) => {
            const cartData = doc.data();
            const product = await findProductByID(cartData.productID);
            return {
                ...cartData,
                productImage: product.productImage,
                productName: product.productName,
                categoryID: product.categoryID,
                productLocation: product.productLocation,
                productPrice: product.productPrice,
                productSoldCount: product.productSoldCount
            };
        }));
        dispatch(setCart([...updatedCarts]));
    });
}

export const updateCart = () => {

}