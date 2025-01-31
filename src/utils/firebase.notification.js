import { collection, doc, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "./firebase.utils";
import { setNotifications } from "../store/notification-store/notification-action";

export const getNotificationUser = async (email, message, data) => {
    const notificationCollection = collection(db, "notification");
    const notificationID = doc(notificationCollection).id;
    const notificationRef = doc(db, "notification", notificationID);
    const createdAt = new Date()
    await setDoc(notificationRef, {
        notificationID,
        email,
        message,
        description: "sản phẩm " + data.productName + " đã hết hàng",
        image: data.productImage,
        read: false,
        createdAt
    });
}

export const createNotification = async (email, dispatch) => {
    const queryNotification = query(collection(db, "notification"), where("email", '==', email));
    const unsubscribe = onSnapshot(queryNotification, (queryNotificationSnapshot) => {
        const notification = [];
        queryNotificationSnapshot.forEach((doc) => {
            notification.push(doc.data());
        });
        notification.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        dispatch(setNotifications(notification));
    });
}
export const readNotification = async (notification) => {
    const notificationDocumentReference = doc(db, "notification", notification.notificationID);
    await updateDoc(notificationDocumentReference, {
        read: true
    });
}