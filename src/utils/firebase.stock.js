import { collection, doc, getDoc, getDocs, increment, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase.utils";
import { fetchStockOutSusscess } from "../store/stock-out-store/stock-out-action";

export const creatStockOutNote = async (carts, email) => {
    try {
        const stockOutRef = collection(db, "stockout");
        const stockOutID = doc(stockOutRef).id;
        const docRef = doc(db, "stockout", stockOutID);
        const createdAt = new Date();
        await setDoc(docRef, {
            stockOutID,
            createdAt,
            isExported: false,
            email,
            carts,
        })
    } catch (error) {
        console.log(error)
    }
}

export const getAllStockOut = (dispatch) => {
    const stockOutRef = collection(db, "stockout");

    const unsubscribe = onSnapshot(stockOutRef, (querySnapshot) => {
        const stockOuts = [];
        querySnapshot.forEach((doc) => {
            stockOuts.push(doc.data());
        });

        stockOuts.sort((a, b) => {
            if (a.createdAt && b.createdAt) {
                return a.createdAt - b.createdAt;
            }
            return 0;
        });
        dispatch(fetchStockOutSusscess(stockOuts));
    });
}

export const mergeStock = (stockOuts, carts) => {
    if (stockOuts.length > 0 && carts.length > 0) {
        const stockOutUpdate = stockOuts.map(stockOut => {
            // Thay filter bằng find
            const updateCart = stockOut.carts.map(cartID => carts.find(cart => cart.cartID === cartID));
            return { ...stockOut, carts: updateCart };
        });
        return stockOutUpdate;
    }
    return []; // Trả về mảng rỗng nếu stockOuts hoặc carts không có phần tử
};


export const exportStockOut = async (stockOut) => {
    try {
        const stockOuts = stockOut.carts;
        stockOuts.forEach(async ({ cartID, productID, quality }) => {
            const productDocumentReference = doc(db, "product", productID);
            const qualityupdate = -quality;
            await updateDoc(productDocumentReference, {
                productSoldCount: increment(qualityupdate)
            });
            const cartDocumentReference = doc(db, "cart", cartID);
            await updateDoc(cartDocumentReference, {
                shiped: true
            });
        })
        const stockOutDocumentReference = doc(db, "stockout", stockOut.stockOutID);
        await updateDoc(stockOutDocumentReference, {
            isExported: true
        });
    } catch (error) {
        console.log(error)
    }
}


export const stockInAll = async () => {
    const stockInRef = collection(db, "stockIn");
    const stockIndocs = await getDocs(stockInRef)
    const stockIns = [];
    stockIndocs.forEach((querySnap) => {
        stockIns.push(querySnap.data());
    })
    return stockIns;
}

export const importStock = async (stockIn) => {

}