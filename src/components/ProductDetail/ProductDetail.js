import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import './ProductDetail.css';

const ProductDetail = () => {
    const {productKey} = useParams();
    const product = fakeData.find(pd => pd.key === productKey)
    return (
        <div>
            <h2>Product Details</h2>
            <Product productInfo={product} showAddToCart={false}></Product>
        </div>
    );
};

export default ProductDetail;