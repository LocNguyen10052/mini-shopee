import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase.utils";
import { v4 } from "uuid";

export const createProduct = async (categoryID, productCreate, image, userID) => {
    const { productName, productTitle, productPrice, productSoldCount, productLocation } = productCreate
    const productQuery = query(collection(db, "product"));
    const productSnapshot = await getDocs(productQuery);
    const createdAt = new Date()
    const imgRef = ref(storage, `files/productImage/${v4()}`)
    try {
        uploadBytes(imgRef, image, { contentType: 'image/png' }).then(async (snapshot) => {
            const productRef = collection(db, "product");
            const productID = doc(productRef).id;
            const productDocRef = doc(db, "product", productID);
            await setDoc(productDocRef, {
                productName,
                productTitle,
                productPrice,
                productSoldCount,
                productLocation,
                "productImage": snapshot.metadata.fullPath,
                productID,
                categoryID
            })
        }).catch((error) => {
            console.log(error)
        });
    } catch (error) {

    }
}

export const findAllProductByCategoryID = async (categoryID) => {
    try {
        const productFromDoc = query(collection(db, `product`), where("categoryID", '==', categoryID))
        const queryProductSnapshot = await getDocs(productFromDoc);
        const arrayProduct = queryProductSnapshot.docs
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
    }
    catch (error) {
        console.log(error)
    }

}
export const findProductByID = async (productID) => {
    const productFromDoc = query(collection(db, `product`))
    const queryProductSnapshot = await getDocs(productFromDoc);
    const arrayProduct = queryProductSnapshot.docs[0].data()
    console.log(arrayProduct)
    const categories = await Promise.all(arrayProduct.map(async (category) => {
        const categoryData = category.data()
        const productRef = doc(db, `categories/${category.id}/Product`, productID)
        const queryproductSnapshot = await getDoc(productRef);
        const product = queryproductSnapshot.data()
        if (product !== undefined) {
            const url = await getDownloadURL(ref(storage, `${queryproductSnapshot.data().productImage}`));
            product.productImage = url
            return product
        }
        return product
    }))
    const productdata = categories.find((product) => {
        return product !== undefined
    })
    return productdata
}
