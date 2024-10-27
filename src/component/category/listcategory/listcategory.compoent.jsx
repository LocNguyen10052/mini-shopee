import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { findAllProductByCategoryID } from '../../../utils/firebase.createproduct';
import Product from '../../product/productcard/product.component';
import { Col, Container, Row } from 'react-bootstrap';
function ListCategory() {
    const { categoryid } = useParams();
    const [products, setProducts] = useState([]);
    const getProductByID = async () => {
        const listProductByID = await findAllProductByCategoryID(categoryid);
        setProducts(listProductByID)
    }

    useEffect(() => {
        getProductByID();
    }, [])
    return (
        <Container>
            <Row>
                {products.map((product) => (
                    <Col key={product.ID} >
                        < Product product={product}></Product>

                    </Col>
                ))
                }
            </Row>
        </Container >
    );
}

export default ListCategory;