import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../axios';
import { useNavigate } from 'react-router';

const Invoice = () => {
  const [datas, setData] = useState({});
  const [order, setOrder] = useState(null);
  const [amount, setAmount] = useState(0);
  const userId = localStorage.getItem("_id");
  const navigate = useNavigate();
  const goToHome = () => {navigate("/cloths")}

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${userId}`);
        console.log("datas", data);
        setData(data);

        
        if (data.orders && data.orders.length > 0) {
          const latestOrder = data.orders[data.orders.length - 1];
          setOrder(latestOrder);
          setAmount(latestOrder.totalAmount);
          const orderedProductIds = latestOrder.products.map(p => p.productId);
          await api.put(`/updatecart/${userId}`, { orderedProductIds })
          
        } else {
          toast.error("No orders found!");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    };

    fetchOrder();
  }, []);

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="text-success fw-bold">🎉 Order Placed Successfully!</h2>
        <p className="text-muted">Here is your invoice summary</p>
      </div>

      <div className="card shadow-sm p-4">
        <h4 className="mb-3 border-bottom pb-2">Shipping Details</h4>

        {datas && (
          <div>
            <p><strong>Name:</strong> {datas.name}</p>
            <p><strong>Email:</strong> {datas.email}</p>
          </div>
        )}

        <hr className="my-4" />

        <h4 className="mb-3 border-bottom pb-2">Ordered Products</h4>

        {order?.products?.map((item, index) => (
          <div key={index} className="d-flex justify-content-between mb-2">
            <div>{item.name} × {item.qty}</div>
            <div>₹{item.price * item.qty}</div>
          </div>
        ))}

        <hr className="my-4" />

        <div className="d-flex justify-content-between">
          <h5>Total Amount</h5>
          <h5>₹{amount}</h5>
        </div>
        <button className='btn btn-dark mt-3' onClick={goToHome}>Go Home</button>
      </div>
      
    </div>
  );
};

export default Invoice;
