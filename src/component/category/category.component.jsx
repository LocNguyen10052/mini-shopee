import React from 'react';
import PropTypes from 'prop-types';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function Category({ category }) {
    const { name, image, id } = category
    return (
        <Card className="text-center" style={{ width: '120px', height: '150px' }} >
            <Card.Img src={image} style={{ width: '88px', height: '90px', objectFit: 'cover', margin: '0 auto' }} />
            <Card.Body>
                <div style={{ fontSize: "13px" }}>{name}</div>
            </Card.Body>
        </Card>

    );
}

export default Category;