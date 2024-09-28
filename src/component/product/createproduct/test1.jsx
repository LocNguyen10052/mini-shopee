
import React, { useContext, useEffect, useState } from 'react';
import './createproduct.style.scss'
import { createProduct } from '../../../utils/firebase.createproduct';
import { CategoriesContext } from '../../context/categories.context';
import { listAllCategory } from '../../../utils/firebase.utils';
import { v4 } from "uuid";
import { useDispatch, useSelector } from 'react-redux';
import city from './../../../asset/City.json';
import { selectCategories } from '../../../store/category-store/category-selector';
import { getListCategories, setCategories } from '../../../store/category-store/category-action';

const defaultProductType = {
    productClassificationID: '',
    productClassificationName: '',
    productClassificationItem: []
}
const defaulProductFields = {
    productName: "",
    productImage: "",
    productDescription: "",
    productLocation: "",
    productSoldCount: "",
    productPrice: "",
    productType: [defaultProductType]
}
function CreateProduct() {
    const {
        productName,
        productDescription,
        productLocation,
        productSoldCount,
        productPrice,
    } = defaulProductFields;
    const {
        productClassificationID,
        productClassificationName,
        productClassificationItem
    } = defaultProductType;

    const [image, setImage] = useState(null);
    const [productTypeCount, setProductTypeCount] = useState([])
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false)
    const [product, setProduct] = useState(defaulProductFields)
    const categoriesSelector = useSelector(selectCategories)
    const [categoyId, setCategoryID] = useState()

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };


    const buttonOpenProductClassification = (event) => {
        event.preventDefault()
        switch (event.target.value) {
            case 'OPEN':
                console.log(event.target.value)
                setProductTypeCount([...productTypeCount, { ...defaultProductType, productClassificationID: v4() }]);
                setToggle(!toggle)
            case 'ADD':
                setProductTypeCount([...productTypeCount, { ...defaultProductType, productClassificationID: v4() }]);
            default:
        }
    }
    const handleRemove = (productToRemove, event) => {
        event.preventDefault()
        console.log(productTypeCount.length)
        if (productTypeCount.length == 1) {
            setToggle(!toggle)
        }
        const updatedProducts = productTypeCount.filter(product => product !== productToRemove);
        console.log(productTypeCount)
        setProductTypeCount(updatedProducts);

    };
    const handleSubmit = () => {

    }

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
                <input type="file" className='create-product-form_InputFile' name='file' onChange={handleImageChange} />
                <div className='create-product-form_input'>
                    <label className='create-product-form_input-label'>Tên sản phẩm</label>
                    <input type='text' className='create-product-form_input-input' name='productName' value={productName} onChange={handleInputChange}></input>
                </div>
                <div className='create-product-form_input'>
                    <label className='create-product-form_input-label'>Mô tả sản phẩm</label>
                    <textarea className='create-product-form_input-input inputDescription' rows="10" cols="50" placeholder="Nhập đoạn văn tại đây" name='productDescription' value={productDescription} onChange={handleInputChange}></textarea>
                </div>
                <div className="create-product-form_input">
                    <label htmlFor="category-select">Chọn thể loại:</label>
                    <select id="category-select" >
                        <option value="">-- Chọn thể loại --</option>
                        {categoriesSelector && categoriesSelector.map((category) => (
                            <option key={category.ID} value={category.ID} onChange={(e) => (setCategoryID(e.target.value))}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="create-product-form">
                <div>Thông tin hàng bán</div>
                <div className="create-product-form_input" style={{ display: 'block' }}>
                    <label className='create-product-form_input-label'>Phân loại hàng</label>
                    {toggle ? (
                        productTypeCount.map((productType, index) => (
                            <div className="create-product-form_productclassification" style={{ backgroundColor: '#FFF' }} key={productType.productClassificationID}>
                                {/* Input cho Tên phân loại sản phẩm */}
                                <div className='create-product-form_input'>
                                    <label className='create-product-form_input-label'>Tên phân loại sản phẩm</label>
                                    <input
                                        type='text'
                                        className='create-product-form_input-input'
                                        name={`productClassificationName-${index}`}
                                        value={productType.productClassificationName}
                                        onChange={(e) => handleProductTypeChange(e, index, 'productClassificationName')}
                                    />
                                </div>
                                {/* Input cho các sản phẩm trong phân loại */}
                                <div className='create-product-form_input'>
                                    <label className='create-product-form_input-label'>Sản phẩm phân loại</label>
                                    <input
                                        type='text'
                                        className='create-product-form_input-input'
                                        name={`productClassificationItem-${index}`}
                                        value={productType.productClassificationItem.join(', ')}
                                        onChange={(e) => handleProductTypeChange(e, index, 'productClassificationItem')}
                                        placeholder="Nhập các sản phẩm phân cách bằng dấu phẩy"
                                    />
                                </div>
                                {/* Nút thêm phân loại hàng */}
                                <button value="ADD" onClick={buttonOpenProductClassification}>Thêm phân loại hàng</button>
                                {/* Nút xóa phân loại hàng */}
                                <button className='button-close_form_productclassification' onClick={(event) => handleRemove(productType, event)}>Xóa</button>
                            </div>
                        ))
                    ) : (
                        <button value='OPEN' onClick={buttonOpenProductClassification}>Phân loại hàng</button>
                    )}
                </div>
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
                        {city && city.map((city) => (
                            <option key={city.id} >
                                {city.name}
                            </option>
                        ))}
                    </select>
                </div>

            </div>
        </form >
    );
}

export default CreateProduct;
