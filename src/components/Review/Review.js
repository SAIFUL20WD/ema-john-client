import React, { useEffect, useState } from 'react';
import { getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const history = useHistory();

    const handleProceedCheckout = () =>  {
        history.push('/shipment')
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect( () => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        fetch("https://boiling-refuge-25034.herokuapp.com/productsByKeys", {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, []);

    let thankYou;
    if(orderPlaced){
        thankYou = <img src={happyImage} alt="gif"/>
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewItem productInfo={product} key={product.key} removeProduct={removeProduct}></ReviewItem>)
                }
                {thankYou}
            </div>
            <div className="cart-container">
                <Cart cartInfo={cart}>
                    <button onClick={handleProceedCheckout} className="main-btn">Proceed Checkout</button>
                </Cart>
            </div>
        </div>
    );
};

export default Review;