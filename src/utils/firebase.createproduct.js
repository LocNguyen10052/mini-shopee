import { collection, doc, getDoc, getDocs, increment, onSnapshot, query, setDoc, updateDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase.utils";
import { v4 } from "uuid";
import { createProductAction } from "../store/product-store/product-action";

export const createProduct = async (productCreate) => {
    const { productID, productName, productTitle, productPrice, productSoldCount, productLocation, categoryID, productImage, stockInID } = productCreate
    const productQuery = query(collection(db, "product"), where("productID", "==", productID));
    const productSnapshot = await getDocs(productQuery);
    try {
        if (productSnapshot.empty) {

            const productDocRef = doc(db, "product", productID);
            await setDoc(productDocRef, {
                productName,
                productTitle,
                productPrice,
                productSoldCount,
                productLocation,
                productID,
                categoryID,
                productImage

            }).catch((error) => {
                console.log(error)
            });
            const stockInDocumentReference = doc(db, 'stockIn', stockInID)
            await updateDoc(stockInDocumentReference, {
                imported: true
            });
        }
        else {
            const productDocumentReference = doc(db, 'product', productID)
            await updateDoc(productDocumentReference, {
                productSoldCount: increment(productSoldCount)
            });
            const stockInDocumentReference = doc(db, 'stockIn', stockInID)
            await updateDoc(stockInDocumentReference, {
                imported: true
            });
        }
    } catch (error) {
        console.log(error)
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
export const findAllProduct = async (dispatch) => {
    try {
        const productFromDoc = collection(db, `product`)
        const unsubscribe = onSnapshot(productFromDoc, async (querySnapshot) => {
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
            dispatch(createProductAction(productsDataFilterDTO));
        });
    }
    catch (error) {
        console.log(error)
    }
}
export const editProduct = async (productEdit) => {

    try {
        const image = productEdit.productImage.file;
        if (typeof (productEdit.productImage) === 'object') {
            try {
                const imgRef = ref(storage, `files/productImage/${v4()}`)
                uploadBytes(imgRef, image, { contentType: 'image/png' }).then(async (snapshot) => {
                    const productDocRef = doc(db, "product", productEdit.productID);
                    await setDoc(productDocRef, {
                        ...productEdit,
                        "productImage": snapshot.metadata.fullPath,
                    })
                }).catch((error) => {
                    console.log(error)
                });
            } catch (error) {

            }
        }
        else {
            const dRef = doc(db, "product", productEdit.productID);
            await setDoc(dRef, {
                "productName": productEdit.productName,
                "productTitle": productEdit.productTitle,
                "productPrice": productEdit.productPrice,
                "productSoldCount": productEdit.productSoldCount,
                "productLocation": productEdit.productLocation,
                "categoryID": productEdit.categoryID
            },
                { merge: true });
        }
    }
    catch (error) {
        console.log(error)
    }
}

export const subscribeToProducts = async (dispatch) => {
    const productCollection = query(collection(db, `product`));
    const unsubscribe = onSnapshot(productCollection, async (querySnapshot) => {
        const productsDataFilterDTO = await Promise.all(
            querySnapshot.docs.map(async (productDoc) => {
                try {
                    const productData = productDoc.data();
                    const url = await getDownloadURL(ref(storage, `${productData.productImage}`));
                    productData.productImage = url;
                    return { ...productData, key: productData.productID };
                } catch (error) {
                    console.log(error);
                }
            })
        );
        dispatch(createProductAction(productsDataFilterDTO));
    }, (error) => {
        console.log("Error listening to product updates:", error);
    });
    unSubscribeProduct.push(unsubscribe)
};

// đây là hàm lấy product snapshot
let unSubscribeProduct = [];

export const unSnapshotProduct = () => {
    console.log('unSnapshotProduct')
    unSubscribeProduct.forEach(subcriber => {
        subcriber();
    })
}