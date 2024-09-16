import React from 'react';
import PropTypes from 'prop-types';
import './button.style.scss'


function ButtonCuttom(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", }}
            onClick={onClick}
        ></div>
    );
}

export default ButtonCuttom;