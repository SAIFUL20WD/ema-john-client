import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)

    const onSubmit = (data) => {
      const savedCart = getDatabaseCart();
      const orderDetails = {...loggedInUser, product: savedCart, shipment: data, orderTime: new Date()}
      fetch("https://boiling-refuge-25034.herokuapp.com/addOrder", {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data => {
          if(data){
            processOrder();
            alert("Order Placed Successfully")
          }
        })
    };
  
    console.log(watch("example"));
  
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="ship-form">
        <input type="text" defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Enter Your Name" />
        {errors.name && <span className="error">Name is required</span>}
        <input type="email" defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Enter Your Email" />
        {errors.email && <span className="error">Email is required</span>}
        <input type="text" {...register("address", { required: true })} placeholder="Enter Your Address" />
        {errors.address && <span className="error">Address is required</span>}
        <input type="number" {...register("phone", { required: true })} placeholder="Enter Your Phone Number" />
        {errors.phone && <span className="error">Phone Number is required</span>}
        <input type="submit" />
      </form>
    );
};

export default Shipment;