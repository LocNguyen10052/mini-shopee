import React, { useContext, useEffect, useState } from 'react';
import './createproduct.style.scss'
import { createProduct } from '../../utils/firebase.createproduct';
import { CategoriesContext } from '../../context/categories.context';
import { listAllCategory } from '../../utils/firebase.utils';
function CreateProduct({ onCreate }) {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [soldCount, setSoldCount] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState(null);
    const [CategoryID, setCategoryID] = useState('');
    const [categories, setCategories] = useState([])

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = {
            productName: name,
            productTitle: title,
            productPrice: price,
            productSoldCount: soldCount,
            productLocation: location,
            categoryID: CategoryID
        };

        await createProduct(CategoryID, product, image)
    };
    const getListCategories = async () => {
        const categoriesData = await listAllCategory();
        setCategories(categoriesData)
    }
    useEffect(() => {
        getListCategories();
    }, [])
    return (
        <form className="create-product-form" onSubmit={handleSubmit}>

            <div className="form-group">
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>New Price</label>
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>
            <div className="form-group">
                <label>Sold Count</label>
                <input
                    type="text"
                    value={soldCount}
                    onChange={(e) => setSoldCount(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Location</label>
                <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Product Image</label>
                <input
                    type="file"
                    onChange={handleImageChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="category-select">Chọn thể loại:</label>
                <select id="category-select" onChange={(e) => setCategoryID(e.target.value)}>
                    <option value="">-- Chọn thể loại --</option>
                    {categories && categories.map((category) => (
                        <option key={category.ID} value={category.ID}>
                            {category.categoryName}

                        </option>
                    ))}
                </select>
            </div>
            <button className='button-create-product' type="submit">Create Product</button>

        </form>
    );
}

export default CreateProduct;
