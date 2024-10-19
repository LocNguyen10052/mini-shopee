import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, where } from "firebase/firestore";
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
            const { productName, productTitle, productPrice, productSoldCount, productLocation } = productCreate
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

                }).catch((error) => {
                    console.log(error)
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
export const findProductByIDSnapShoot = async (productID) => {
    const categoriesFromDoc = await query(collection(db, `categories`));
    const categories = [];

    const categoriesSnapshot = await getDocs(categoriesFromDoc); // Sử dụng getDocs để lấy dữ liệu một lần
    categoriesSnapshot.forEach((doc) => {
        categories.push(doc);
    });

    const promises = categories.map(async (category) => {
        const productRef = doc(db, `categories/${category.id}/Product`, productID);
        const productSnapshot = await getDoc(productRef); // Sử dụng getDoc để lấy dữ liệu một lần

        if (productSnapshot.exists()) {
            const product = productSnapshot.data();
            const url = await getDownloadURL(ref(storage, `${product.productImage}`));
            return {
                productImage: url,
                productName: product.productName,
                categoryID: product.categoryID,
                productLocation: product.productLocation,
                productPrice: product.productPrice,
                productSoldCount: product.productSoldCount
            };
        }
        return {};
    });

    // Chờ tất cả các promises hoàn thành
    const products = await Promise.all(promises);
    return products.find(product => Object.keys(product).length > 0) || {}; // Trả về sản phẩm đầu tiên tìm thấy
}