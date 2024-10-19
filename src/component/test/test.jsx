import React, { useState } from 'react';
import './test.scss'; // Để định dạng bảng và vòng tròn

// Hàm để tính toán giá trị Gann Square of 9 (như trước)
const calculateGannSquare = (size) => {
    let square = [];
    let value = 1;
    let mid = Math.floor(size / 2);

    for (let i = 0; i < size; i++) {
        square[i] = [];
        for (let j = 0; j < size; j++) {
            let x = j - mid;
            let y = mid - i;
            let radius = Math.max(Math.abs(x), Math.abs(y));

            let startValue = (2 * radius - 1) ** 2;
            let position = (radius * 2 - 1) * 4;

            if (y === radius) value = startValue + (x + radius);
            else if (x === radius) value = startValue + (2 * radius) + (radius - y);
            else if (y === -radius) value = startValue + (4 * radius) + (-x + radius);
            else if (x === -radius) value = startValue + (6 * radius) + (y + radius);

            square[i][j] = value;
        }
    }
    return square;
};

const GannSquare = ({ size }) => {
    const gannSquare = calculateGannSquare(size);
    const [rotation, setRotation] = useState(0); // Trạng thái để lưu góc xoay

    const rotateCircle = (degrees) => {
        setRotation(rotation + degrees); // Xoay thêm dựa trên input
    };

    return (
        <div className="gann-square-container">
            <video playsinline="true" autoplay="" src="stream/%7B%22dcId%22%3A5%2C%22location%22%3A%7B%22_%22%3A%22inputDocumentFileLocation%22%2C%22id%22%3A%226332459125061980407%22%2C%22access_hash%22%3A%228845236402863597276%22%2C%22file_reference%22%3A%5B5%2C0%2C0%2C0%2C0%2C128%2C190%2C182%2C125%2C0%2C0%2C3%2C66%2C102%2C252%2C1%2C66%2C54%2C233%2C245%2C141%2C127%2C183%2C250%2C79%2C93%2C251%2C155%2C75%2C211%2C232%2C96%2C110%5D%7D%2C%22size%22%3A414410276%2C%22mimeType%22%3A%22video%2Fmp4%22%2C%22fileName%22%3A%22Bu%E1%BB%95i%201%20ph%E1%BA%A7n%201.mp4%22%7D" class="ckin__video"></video>
        </div>
    );
};


export default GannSquare;