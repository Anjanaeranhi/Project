import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../axios';

const History = () => {

    const [order, setOrder] = useState([]);
    const userId = localStorage.getItem("_id");
    
    useEffect(()=>{
      const fetchOrder = async() =>{
        try {
          const {data} = await  api.get(`/getorder/${userId}`);
          console.log(data.orders);
          setOrder(data.orders);
         
  
          
        } catch (error) {
          console.log(error.message);
          toast.error(error.response?.data?.message || error.message);
        }
      }
  
      fetchOrder();
    },[])
    return (
        <div className="container mt-5">
    <h3 className="mb-4">Order History</h3>
    {order.length === 0 ? (
      <p>No past orders found.</p>
    ) : (
      order.map((item, index) => (
        <div key={item._id} className="card mb-4 shadow-sm p-4">
          <h5 className="text-primary mb-3">Order #{index + 1}</h5>
  
          <div className="row mb-2">
            <div className="col-sm-4 fw-bold">Total Amount:</div>
            <div className="col-sm-8">₹{item.totalAmount}</div>
          </div>
  
          {item.shippingAddress && item.shippingAddress.length > 0 && (
            <>
              <div className="row mb-2">
                <div className="col-sm-4 fw-bold">Shipping Address:</div>
                <div className="col-sm-8">{item.shippingAddress[0].address}</div>
              </div>
              <div className="row mb-2">
                <div className="col-sm-4 fw-bold">Phone:</div>
                <div className="col-sm-8">{item.shippingAddress[0].phone}</div>
              </div>
            </>
          )}
  
          <div className="row mb-2">
            <div className="col-sm-4 fw-bold">Products:</div>
            <div className="col-sm-8">
              <ul className="mb-0 ps-3">
                {item.products.map((prod) => (
                  <li key={prod._id}>
                    {prod.name} — Qty: {prod.qty}, Price: ₹{prod.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
    );
}

export default History;
