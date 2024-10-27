
import React, { useEffect, useState } from 'react';
import './createproduct.style.scss'
import { createProduct } from '../../../utils/firebase.createproduct';
import { useDispatch, useSelector } from 'react-redux';
import city from './../../../asset/City.json';
import { selectCategories } from '../../../store/category-store/category-selector';
import { getListCategories } from '../../../store/category-store/category-action';
import { selectCurrentUser } from '../../../store/user-store/user-seletor';

const defaultProductType = {
    productClassificationID: '',
    productClassificationName: '',
    productClassificationItem: []
}
const defaulProductFields = {
    productName: "",
    productImage: "",
    productTitle: "",
    productLocation: "",
    productSoldCount: "",
    productPrice: ""
}
function CreateProduct() {
    const currentUser = useSelector(selectCurrentUser)
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const [product, setProduct] = useState(defaulProductFields)
    const categoriesSelector = useSelector(selectCategories)
    const [categoyId, setCategoryID] = useState()
    const {
        productName,
        productTitle,
        productLocation,
        productSoldCount,
        productPrice,

    } = product;

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    const resetFormFields = () => {
        setProduct(defaulProductFields);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createProduct(categoyId, product, image, currentUser.email)
            resetFormFields();
        } catch (error) {
            console.log(error)
        }

    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setProduct({ ...product, [name]: value });
    }
    useEffect(() => {
        getListCategories(dispatch)
    }, [])
    return (
        <form onSubmit={handleSubmit}>
            <div className="create-product-form">
                <div>Thông tin cơ bản</div>
                <input type="file" className='create-product-form_InputFile' name='file' onChange={handleImageChange} required />
                <div className='create-product-form_input'>
                    <label className='create-product-form_input-label'>Tên sản phẩm</label>
                    <input type='text' className='create-product-form_input-input' name='productName' value={productName} onChange={handleInputChange}></input>
                </div>
                <div className='create-product-form_input'>
                    <label className='create-product-form_input-label'>Mô tả sản phẩm</label>
                    <textarea className='create-product-form_input-input inputDescription' rows="10" cols="50" placeholder="Nhập đoạn văn tại đây" name='productTitle' value={productTitle} onChange={handleInputChange}></textarea>
                </div>
                <div className="create-product-form_input">
                    <label htmlFor="category-select">Chọn thể loại:</label>
                    <select id="category-select" onChange={(e) => (setCategoryID(e.target.value))}>
                        <option value="">-- Chọn thể loại --</option>
                        {categoriesSelector && categoriesSelector.map((category) => (
                            <option key={category.ID} value={category.ID}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="create-product-form">
                <div>Thông tin hàng bán</div>
                <div className='create-product-form_input'>
                    <label className='create-product-form_input-label'>Giá</label>
                    <input type='number' className='create-product-form_input-input' name='productPrice' value={productPrice} onChange={handleInputChange}></input>
                </div>
                <div className='create-product-form_input'>
                    <label className='create-product-form_input-label' >Kho hàng</label>
                    <input className='create-product-form_input-input' name='productSoldCount' value={productSoldCount} onChange={handleInputChange}></input>
                </div>
                <div className='create-product-form_input'>
                    <label className='create-product-form_input-label' >Địa chỉ</label>
                    <select id="category-select" placeholder="Chọn tỉnh thành..." value={productLocation} name='productLocation' onChange={handleInputChange}>
                        <option>-- Chọn thể loại --</option>
                        {city && city.map((city) => (
                            <option key={city.id} >
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
            <button>Create</button>
        </form >
    );
}

export default CreateProduct;
