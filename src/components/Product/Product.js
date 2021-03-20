import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name, img, price, seller, stock, key} = props.productInfo;
    const handleAddProduct = props.handleAddProduct;
    const item = props.productInfo;
    return (
        <div className="product">
            <div>
                <img src={img} alt=""/>
            </div>
            <div>
                <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>only {stock} left in stock - order soon</small></p>
                {
                    props.showAddToCart && <button className="main-btn" onClick={() => handleAddProduct(item)}>
                    <FontAwesomeIcon icon={faShoppingCart} /> add to cart
                    </button>
                }
            </div>
        </div>
    );
};

export default Product;