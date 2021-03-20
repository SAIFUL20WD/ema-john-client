import React from 'react';
import './ReviewItem.css';

const ReviewItem = (props) => {
    const {name, img, quantity} = props.productInfo;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className="product-name">{name}</h4>
                <p>Quantity: {quantity}</p>
                <button className="main-btn">Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;