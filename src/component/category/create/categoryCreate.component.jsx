import React, { useState } from 'react';
import './categoryCreate.scss'
import { createCategory, listAllCategory } from '../../../utils/firebase.utils'
const defaulCategoryFields = {
    categoryName: "",
    categoryImage: "",
    categoryTitle: "",
    categoryDescription: ""
}

function CategoryCreate() {
    const [img, setImg] = useState('')
    const [category, setCatergory] = useState(defaulCategoryFields)
    const { categoryName, categoryImage, categoryTitle, categoryDescription } = category;
    const resetFormFields = () => {
        setCatergory(defaulCategoryFields);
    };
    const handleSubmitCreateCategory = async (event) => {
        event.preventDefault();
        createCategory(category, img)
        resetFormFields();
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCatergory({ ...category, [name]: value });
    };

    return (
        <div>
            <form className="custom-form" onSubmit={handleSubmitCreateCategory}>
                <input
                    className="custom-input"
                    type="text"
                    required
                    onChange={handleChange}
                    name="categoryName"
                    value={categoryName}
                    placeholder='name'
                />
                <input
                    className="file"
                    type="file"
                    required
                    onChange={(e) => setImg(e.target.files[0])}

                    placeholder='image'
                />
                <input
                    className="custom-input"
                    type="text"
                    required
                    onChange={handleChange}
                    name="categoryTitle"
                    value={categoryTitle}
                    placeholder='title'
                />
                <input
                    className="custom-input"
                    type="text"
                    required
                    onChange={handleChange}
                    name="categoryDescription"
                    value={categoryDescription}
                    placeholder='description'
                />
                <button className="custom-button">Submit</button>
            </form>

        </div >
    );
}

export default CategoryCreate;