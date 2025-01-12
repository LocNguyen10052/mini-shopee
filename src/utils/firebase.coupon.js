import { collection, deleteDoc, doc, getDocFromServer, getDocs, increment, query, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "./firebase.utils"
import { v4 } from "uuid";
import { notification } from "antd";

export const createCoupon = async (coupon) => {
    try {
        const couponRef = doc(db, "coupon", v4());
        const setdoc = await setDoc(couponRef, coupon);
        return coupon;
    } catch (error) {
        return error
    }

}

//function check coupon hợp lệ không
export const getAllCoupon = async () => {
    const couponQuery = await getDocs(collection(db, 'coupon'));
    const counpons = [];
    couponQuery.forEach((querySnap) => {
        counpons.push(querySnap.data());
    })
    return counpons;
}

//funcion add user vào mảng để kiểm tra đã sử dụng hay chưa
export const activeCouponUsers = async (coupon, bill) => {
    const couponQuery = query(collection(db, 'coupon'), where('coupon_code', '==', coupon));
    const counponDocs = await getDocs(couponQuery)

    if (!counponDocs.empty) {
        const currentDate = new Date();
        const couponData = counponDocs.docs[0].data()
        const startDate = new Date(couponData.coupon_start_date.split("/").reverse().join("-"));
        const endDate = new Date(couponData.coupon_end_date.split("/").reverse().join("-"))
        if (couponData.coupon_quantity <= 0 || currentDate <= startDate || currentDate >= endDate) {
            throw new Error("Counpon đã hết hạn !");
        }
        bill.counponID = couponData.counpon_id;
        bill.coupon_min_order_value = couponData.coupon_min_order_value;
        if (couponData.coupon_type === 'discount' && bill.cartsTotal >= couponData.coupon_min_order_value) {
            bill.total = bill.cartsTotal - couponData.coupon_value;
            bill.couponProductCost = couponData.coupon_value;

            return bill;
        }
        else if (couponData.coupon_type === 'freeShip' && bill.cartsTotal >= couponData.coupon_min_order_value) {
            if (bill.shipCost > couponData.coupon_value) {
                bill.couponShipCost = bill.shipCost - couponData.coupon_value;
                bill.couponCost = couponData.coupon_value;
            }
            else {
                bill.couponCost = bill.shipCost;
                bill.shipCost = 0;
            }
            return bill;
        }
        else if (bill.cartsTotal < couponData.coupon_min_order_value) {
            throw new Error("Không đủ điều kiện!");
        }

    }
    else {
        throw new Error("Coupon không tồn tại!")
    }
}
export const updateCounpon = async (counponID, type) => {
    try {
        const counponDocumentReference = doc(db, "coupon", counponID);
        console.log(counponDocumentReference)
        switch (type) {
            case "Decrease":
                await updateDoc(counponDocumentReference, {
                    coupon_quantity: increment(-1)
                });
                break;
            case "Remove":
                await deleteDoc(counponDocumentReference);
                break;
            default:
        }
    } catch (error) {
        console.log(error)
    }
};
