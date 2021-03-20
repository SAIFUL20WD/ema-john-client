import React, { useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);

    const [cart, setCart] = useState([]);
    
    const handleAddProduct = (item) => {
        const newCart = [...cart, item];
        setCart(newCart);
        const sameProduct = newCart.filter(pd => pd.key === item.key);
        const count = sameProduct.length;
        addToDatabaseCart(item.key, count)
    }

    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(product => <Product productInfo={product} showAddToCart={true} key={product.key} handleAddProduct={handleAddProduct}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cartInfo={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;