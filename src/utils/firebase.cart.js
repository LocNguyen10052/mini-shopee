import { and, collection, deleteDoc, doc, getDocs, increment, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db, storage } from "./firebase.utils";
import { fetchCartSusscess, setCartDataFull, setProductCartData, setProductsID } from "../store/cart-store/cart-action";
import { getDownloadURL, ref } from "firebase/storage";
import { store } from "../store/store";

let unSubscribeCart = [];

// thêm các snapshot vào mảng

export const addTocart = async (productID, userID) => {
    const cartsQuery = query(collection(db, "cart"), and(where("productID", "==", productID), where("userID", "==", userID), where("ordered", "==", false)));
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
                cartID,
                ordered: false,
                shiped: false
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
        queryCartSnapshot.forEach((doc) => {
            carts.push(doc.data());
            productIDArray.push(doc.data().productID);
        });
        const currentProductIDArray = store.getState().carts.productID;

        // So sánh trước khi dispatch
        if (JSON.stringify(currentProductIDArray) !== JSON.stringify(productIDArray)) {
            dispatch(setProductsID(productIDArray));
        }

        dispatch(fetchCartSusscess(carts));
    });
    unSubscribeCart.push(unsubscribe);
}

// lấy thông tin product 
export const getProductDataCart = async (productIDArray) => {
    if (productIDArray.empty) {
        return [];
    }
    else {
        try {
            const productQuery = query(collection(db, "product"), where("productID", "in", productIDArray));
            const productDocs = await getDocs(productQuery);
            const arrayProduct = productDocs.docs
            const productsDataFilterDTO = await Promise.all(arrayProduct.map(async (product) => {
                try {
                    const productdata = product.data();
                    const url = await getDownloadURL(ref(storage, `${productdata.productImage}`));
                    productdata.productImage = url;
                    return productdata;
                } catch (error) {
                    console.log(error)
                }
            }));
            return productsDataFilterDTO
        } catch (error) {
        }
    }
}

// merge data giữa cart và product
export const mergaCartAndProductData = (carts, productData) => {
    if (carts.length > 0 && productData.length > 0) {
        const cartsUpdate = carts.map((cart) => {
            try {
                const productFind = productData.find((product) => product.productID === cart.productID);
                return {
                    ...cart,
                    ...productFind,
                }
            } catch (error) {
                return [];
            }
        })
        return cartsUpdate;
    }
    else {
        return [];
    }
}




export const getProductDataCartSnapShot = (productIDArray, dispatch) => {
    if (!productIDArray || productIDArray.length === 0) {
        return [];
    } else {
        const productQuery = query(collection(db, "product"), where("productID", "in", productIDArray));

        const unsubscribe = onSnapshot(productQuery, async (querySnapshot) => {
            const arrayProduct = querySnapshot.docs;
            const productsDataFilterDTO = await Promise.all(arrayProduct.map(async (product) => {
                try {
                    const productData = product.data();
                    const url = await getDownloadURL(ref(storage, `${productData.productImage}`));
                    productData.productImage = url;
                    return productData;
                } catch (error) {
                    console.log(error);
                }
            }));

            // Lưu trữ dữ liệu vào state qua dispatch (nếu có)
            dispatch(setProductCartData(productsDataFilterDTO));
        });

        unSubscribeCart.push(unsubscribe); // Trả về unsubscribe để có thể hủy đăng ký nếu cần
    }
}

let unsubscribeAdmin = [];


export const getCartALL = async (dispatch) => {
    const cartQuery = query(collection(db, "cart"));
    const unsubscribe = onSnapshot(cartQuery, (queryCartSnapshot) => {
        const carts = [];
        queryCartSnapshot.forEach((doc) => {
            carts.push(doc.data());
        });
        dispatch(setCartDataFull(carts));
    });
    unsubscribeAdmin.push(unsubscribe);

}

export const updateCartOrdered = async (cartsID) => {
    cartsID.forEach(async (cartID) => {
        const cartDocumentReference = doc(db, "cart", cartID);
        await updateDoc(cartDocumentReference, {
            ordered: true
        });
    })
}

export const updateCartShip = async (productID, quality, cartID) => {
    try {
        const productDocumentReference = doc(db, "product", productID);
        const qualityupdate = -quality;

        await updateDoc(productDocumentReference, {
            productSoldCount: increment(qualityupdate)
        });

        const cartDocumentReference = doc(db, "cart", cartID);
        await updateDoc(cartDocumentReference, {
            shiped: true
        });

    } catch (error) {
        console.log(error)
    }
};

export const unSnapshotCart = () => {
    unSubscribeCart.forEach(subcriber => {
        subcriber();
    })
}
export const unSnapshotCartAdmin = () => {
    unsubscribeAdmin.forEach(subcriber => {
        subcriber();
    })
}