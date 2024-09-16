import React, { useContext, useEffect, useState } from 'react';
import './createproduct.style.scss'
import { createProduct } from '../../../utils/firebase.createproduct';
import { CategoriesContext } from '../../context/categories.context';
import { listAllCategory } from '../../../utils/firebase.utils';
const defaulProductFields = {
    productName: "",
    productImage: "",
    productDescription: "",
    productLocation: "",
    productSoldCount: "",
    productPrice: "",
    productType: []

}
function CreateProduct({ onCreate }) {
    const [image, setImage] = useState(null);
    const [productTypeCount, setProductTypeCount] = useState([])
    const [categories, setCategories] = useState([])
    const [toggle, setToggle] = useState(false)

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const buttonSubmit = (event) => {
        event.preventDefault()
        setToggle(!toggle)
    }

    const handleSubmit = () => {

    }

    const getListCategories = async () => {
        const categoriesData = await listAllCategory();
        setCategories(categoriesData)
    }

    useEffect(() => {
        getListCategories();
    }, [])
    return (

        <form onSubmit={handleSubmit}>
            <div className="create-product-form">
                <div>Thông tin cơ bản</div>
                <input type="file" className='create-product-form_InputFile' />
                <div className='create-product-form_input'>
                    <label className='create-product-form_input-label'>Tên sản phẩm</label>
                    <input type='text' className='create-product-form_input-input'></input>
                </div>
                <div className='create-product-form_input'>
                    <label className='create-product-form_input-label'>Mô tả sản phẩm</label>
                    <textarea className='create-product-form_input-input inputDescription' rows="10" cols="50" placeholder="Nhập đoạn văn tại đây"></textarea>

                </div>
                <div className="create-product-form_input">
                    <label htmlFor="category-select">Chọn thể loại:</label>
                    <select id="category-select" >
                        <option value="">-- Chọn thể loại --</option>
                        {categories && categories.map((category) => (
                            <option key={category.ID} value={category.ID}>
                                {category.categoryName}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="create-product-form">
                <div>Thông tin hàng bán</div>
                <div className="create-product-form_input" style={{ display: 'flex' }}>
                    <label className='create-product-form_input-label'>Phân loại hàng</label>
                    {toggle ?
                        productTypeCount.map(() => (
                            <div className="create-product-form_productclassification" style={{ backgroundColor: '#FFF' }}>
                                <div className='create-product-form_input'>
                                    <label className='create-product-form_input-label'>Tên sản phẩm</label>
                                    <input type='text' className='create-product-form_input-input'></input>
                                </div>
                                <div className='create-product-form_input'>
                                    <label className='create-product-form_input-label'>Tên sản phẩm</label>
                                    <input type='text' className='create-product-form_input-input'></input>
                                </div>
                                <button className='button-close_form_productclassification' onClick={buttonSubmit}>X</button>
                            </div>
                        ))

                        :
                        <button onClick={buttonSubmit}>Phân loại hàng</button>
                    }
                </div>

                <div className='create-product-form_input'>
                    <label className='create-product-form_input-label'>Giá</label>
                    <input type='number' className='create-product-form_input-input'></input>
                </div>
                <div className='create-product-form_input'>
                    <label className='create-product-form_input-label'>Kho hàng</label>
                    <input className='create-product-form_input-input'></input>
                </div>

            </div>
        </form>
    );
}

export default CreateProduct;
