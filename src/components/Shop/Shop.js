import React, { useEffect, useState } from 'react';
import './Shop.css';
import fakeData from '../../fakeData';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);

    const [cart, setCart] = useState([]);

    useEffect( () => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map( key => {
            const product = fakeData.find( pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        })
        setCart(cartProducts);
    }, [])
    
    const handleAddProduct = (item) => {
        const toBeAddedKey = item.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct]
        }
        else {
            item.quantity = 1;
            newCart = [...cart, item];
        }

        setCart(newCart);
        addToDatabaseCart(item.key, count)
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(product => <Product productInfo={product} showAddToCart={true} key={product.key} handleAddProduct={handleAddProduct}></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cartInfo={cart}>
                    <Link to="/review"><button className="main-btn">Review Order</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;