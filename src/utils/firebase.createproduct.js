import { addDoc, collection, doc, getDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "./firebase.utils";
import { v4 } from "uuid";

export const createProduct = async (categoryID, productCreate, image) => {
    const productdocRef = doc(db, `categories/${categoryID}`, `Product/${v4()}`)
    const productFromDoc = await query(collection(db, `categories/${categoryID}/Product`), where("productName", "==", productCreate.productName))
    const queryproductSnapshot = await getDocs(productFromDoc);
    const arrayProduct = queryproductSnapshot.docs

    try {
        if (arrayProduct.length === 0) {
            const { productName, productTitle, productPrice, productSoldCount, productLocation, categoryID } = productCreate
            const createdAt = new Date()
            try {
                const imgRef = ref(storage, `files/productImage/${v4()}`)
                uploadBytes(imgRef, image, { contentType: 'image/png' }).then(async (snapshot) => {
                    await setDoc(productdocRef, {
                        productName,
                        productTitle,
                        createdAt,
                        "productImage": snapshot.metadata.fullPath,
                        productPrice,
                        productSoldCount,
                        productLocation,
                        categoryID

                    })
                    console.log(productCreate)
                }).catch(() => {
                    return
                });
            } catch (error) {
                console.log(error + "ProductCreate")
            }
        }
        else {
            alert("Product đã tồn tại")
        }
    } catch (error) {
        console.log(error)
    }
}

export const findAllProductByCategoryID = async (categoryID) => {
    const productFromDoc = await query(collection(db, `categories/${categoryID}/Product/`))
    const queryproductSnapshot = await getDocs(productFromDoc);
    const arrayProduct = queryproductSnapshot.docs

    const productsData = await Promise.all(arrayProduct.map(async (product) => {
        const productdata = product.data();
        const url = await getDownloadURL(ref(storage, `${productdata.productImage}`));

        productdata.productImage = url;
        productdata.ID = product.id;
        return productdata
    }))

    return productsData;
}
export const findProductByID = async (productID) => {

    const categoriesFromDoc = await query(collection(db, `categories`))
    const querycategoriesSnapshot = await getDocs(categoriesFromDoc);
    const arrayCategories = querycategoriesSnapshot.docs
    const categories = await Promise.all(arrayCategories.map(async (category) => {
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
