import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';
import './ProductDetail.css';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({})

    useEffect( () => {
        fetch(`https://boiling-refuge-25034.herokuapp.com/product/${productKey}`)
        .then(res => res.json())
        .then(data => setProduct(data))
    }, [productKey])
    
    return (
        <div>
            <h2>Product Details</h2>
            <Product productInfo={product} showAddToCart={false}></Product>
        </div>
    );
};

export default ProductDetail;