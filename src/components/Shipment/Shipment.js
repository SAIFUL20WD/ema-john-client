import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const onSubmit = data => console.log(data);
  
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