import React from 'react';
import PropTypes from 'prop-types';

import { Col, Container, Row } from 'react-bootstrap'
import Category from '../category/category.component';
const categories = [
    {
        "id": 1,
        "name": "Thời Trang Nam",
        "image": "https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b_tn&quot"
    },
    {
        "id": 2,
        "name": "Điện Thoại & Phụ Kiện",
        "image": "https://down-vn.img.susercontent.com/file/31234a27876fb89cd522d7e3db1ba5ca_tn&quot"
    },
    {
        "id": 3,
        "name": "Thiết Bị Điện Tử",
        "image": "https://down-vn.img.susercontent.com/file/978b9e4cb61c611aaaf58664fae133c5_tn&quot"
    },
    {
        "id": 4,
        "name": "Máy Tính & Laptop",
        "image": "https://down-vn.img.susercontent.com/file/c3f3edfaa9f6dafc4825b77d8449999d_tn&quot"
    },
    {
        "id": 5,
        "name": "Máy Ảnh Quay Phim",
        "image": "https://down-vn.img.susercontent.com/file/ec14dd4fc238e676e43be2a911414d4d_tn&quot"
    },
    {
        "id": 6,
        "name": "Mẹ Và Bé",
        "image": "https://down-vn.img.susercontent.com/file/099edde1ab31df35bc255912bab54a5e_tn&quot"
    },
    {
        "id": 7,
        "name": "Nhà Cửa Đời Sống",
        "image": "https://down-vn.img.susercontent.com/file/24b194a695ea59d384768b7b471d563f_tn&quot"
    },
    {
        "id": 8,
        "name": "Ô Tô & Xe Máy",
        "image": "https://down-vn.img.susercontent.com/file/3fb459e3449905545701b418e8220334_tn&quot"
    },
    {
        "id": 9,
        "name": "Phụ Kiện & Thời Trang Nữ",
        "image": "https://down-vn.img.susercontent.com/file/8e71245b9659ea72c1b4e737be5cf42e_tn&quot"
    },
    {
        "id": 10,
        "name": "Thời Trang Nữ",
        "image": "https://down-vn.img.susercontent.com/file/75ea42f9eca124e9cb3cde744c060e4d_tn&quot"
    }
]
function Directory(props) {
    return (
        <Container>
            <Row >
                {
                    categories.map((category) => (
                        <Col xs="auto" key={category.id} >
                            <Category category={category}></Category>
                        </Col>
                    ))
                }

            </Row>
        </Container>
    );
}

export default Directory;