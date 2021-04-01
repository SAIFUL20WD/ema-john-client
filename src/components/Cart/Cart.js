import React from 'react';
import './Cart.css';

const Cart = (props) => {
    const  cart = props.cartInfo;
    // const totalPrice = cart.reduce( (total, item) => total + item.price, 0)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        total = total + item.price * item.quantity;
    }

    let shippingCost = 0;
    if(total > 100){
        shippingCost = 5.99;
    }
    else if(total > 500){
        shippingCost = 50.99;
    }

    const tax = total / 10;

    function formatNumber(num){
        return Number(num.toFixed(2))
    }

    const grandTotal = total + shippingCost + tax;
    
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {cart.length}</p>
            <p><small>Items Price: {formatNumber(total)}</small></p>
            <p><small>Shipping Cost: {shippingCost}</small></p>
            <p><small>Tax and Vat: {formatNumber(tax)}</small></p>
            <p>Total Price: {formatNumber(grandTotal)}</p>
            {props.children}
        </div>
    );
};

export default Cart;