import React from 'react';
import Card from 'react-bootstrap/Card';
function Category({ category }) {

    const { categoryID, categoryName, categoryImage, categoryTitle, categoryDescription } = category
    return (
        <Card className="text-center" style={{ width: '120px', height: '150px' }} key={categoryID} >
            <Card.Img src={categoryImage} style={{ width: '88px', height: '90px', objectFit: 'cover', margin: '0 auto', padding: '0' }} />
            <Card.Body style={{ margin: '0 auto', padding: '0' }}>
                <div style={{ fontSize: "13px" }}>{categoryName}</div>
            </Card.Body>
        </Card>

    );
}

export default Category;