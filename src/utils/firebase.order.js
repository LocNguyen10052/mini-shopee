import { collection, doc, getDocs, onSnapshot, query, setDoc } from "firebase/firestore";
import { db } from "./firebase.utils";
import { createOrderAction } from "../store/order-store/order-action";
import { updateCounpon } from "./firebase.coupon";
import { updateCartOrdered } from "./firebase.cart";
import { creatStockOutNote } from "./firebase.stock";

let unsubscribeOrderAdmin = [];

export const getAllOrder = async (dispatch) => {
    const querySnapshot = query(collection(db, "orders"));
    const unsubscribe = onSnapshot(querySnapshot, (queryOrderSnapshot) => {
        const orders = [];
        queryOrderSnapshot.forEach((doc) => {
            orders.push(doc.data());
        });
        dispatch(createOrderAction(orders));
    });
    unsubscribeOrderAdmin.push(unsubscribe);
}

export const createOrder = async (form, currentUser, carts, bill, cartsData) => {
    try {
        const cartsID = carts
            .filter((cart) => cart.ordered === false)
            .map((cart) => cart.cartID);
        const createdAt = new Date()
        const cRef = collection(db, "orders");
        const orderID = doc(cRef).id;
        const dRef = doc(db, "orders", orderID);
        await setDoc(dRef, {
            orderID,
            form,
            cartsID,
            counponID: bill.couponID,
            createdAt,
            "email": currentUser.email
        });
        await updateCartOrdered(cartsID);
        await creatStockOutNote(cartsID, currentUser.email);
        if (bill.couponID !== 'null') {
            await updateCounpon(bill.counponID, "Decrease");
        }
    } catch (error) {
        console.log(error)
    }
}

export const unSnapShotOrderAdmin = () => {
    unsubscribeOrderAdmin.forEach(subcriber => {
        subcriber();
    })
}