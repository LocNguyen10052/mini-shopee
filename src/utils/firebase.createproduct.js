import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase.utils";
import { v4 } from "uuid";

export const createProduct = async (categoryID, productCreate, image, userID) => {
    const { productName, productTitle, productPrice, productSoldCount, productLocation } = productCreate
    const productQuery = await query(collection(db, "product"));
    const productSnapshot = await getDocs(productQuery);
    const createdAt = new Date()
    if (productSnapshot.empty) {
        const imgRef = ref(storage, `files/productImage/${v4()}`)
        uploadBytes(imgRef, image, { contentType: 'image/png' }).then(async (snapshot) => {
            await addDoc(collection(db, "product"), {
                products: [{
                    "productID": v4(),
                    productName,
                    productTitle,
                    createdAt,
                    "productImage": snapshot.metadata.fullPath,
                    productPrice,
                    productSoldCount,
                    productLocation,
                    categoryID,
                    userID
                }],
                productsName: [productName],

            })
        }).catch((error) => {
            console.log(error)
        });
    }
    else {
        const product = productSnapshot.docs[0].data()
        const productFind = product.products.find(product => product.productName === productName)
        const productDocumentReference = doc(db, "product", productSnapshot.docs[0].id)
        console.log(productDocumentReference)
        const productdocSnap = await getDoc(productDocumentReference)
        const imgRef = ref(storage, `files/productImage/${v4()}`)
        uploadBytes(imgRef, image, { contentType: 'image/png' }).then(async (snapshot) => {
            await setDoc(productDocumentReference, {
                ...product,
                products: [...product.products, {
                    "productID": v4(),
                    productName,
                    productTitle,
                    createdAt,
                    "productImage": snapshot.metadata.fullPath,
                    productPrice,
                    productSoldCount,
                    productLocation,
                    categoryID,
                    userID
                }],
                productsName: [...product.productsName, productName],
            })
        }).catch((error) => {
            console.log(error)
        });
    }
}

export const findAllProductByCategoryID = async (categoryID) => {
    const productFromDoc = await query(collection(db, `product`))
    const queryProductSnapshot = await getDocs(productFromDoc);
    try {
        const arrayProduct = queryProductSnapshot.docs[0].data()
        const productsDataFilter = arrayProduct.products.filter((product) => (product.categoryID === categoryID))
        const productsDataFilterDTO = await Promise.all(productsDataFilter.map(async (product) => {
            const url = await getDownloadURL(ref(storage, `${product.productImage}`));
            product.productImage = url;
            return product;
        }));
        console.log(productsDataFilterDTO)
        return productsDataFilterDTO
    }
    catch (error) {
        console.log(error)
    }
}
export const findProductByID = async (productID) => {
    const productFromDoc = await query(collection(db, `product`))
    const queryProductSnapshot = await getDocs(productFromDoc);
    const arrayProduct = queryProductSnapshot.docs[0].data()
    console.log(arrayProduct)
    // const categories = await Promise.all(arrayProduct.map(async (category) => {
    //     const categoryData = category.data()
    //     const productRef = doc(db, `categories/${category.id}/Product`, productID)
    //     const queryproductSnapshot = await getDoc(productRef);
    //     const product = queryproductSnapshot.data()
    //     if (product !== undefined) {
    //         const url = await getDownloadURL(ref(storage, `${queryproductSnapshot.data().productImage}`));
    //         product.productImage = url
    //         return product
    //     }
    //     return product
    // }))
    // const productdata = categories.find((product) => {
    //     return product !== undefined
    // })
    // return productdata
}
