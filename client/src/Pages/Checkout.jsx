import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { userapi } from '../axios';
import toast from 'react-hot-toast';

const Checkout = () => {
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");

  

  const navigate = useNavigate();
  const goToInvoice = () =>{navigate("/invoice")}

  const address = location.state?.address;  
 
    const userId = localStorage.getItem("_id")
  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const cartRes = await userapi.get(`/cart/${userId}`);
        setCartItems(cartRes.data);

        const totalAmount = cartRes.data.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotal(totalAmount);
      } catch (err) {
        toast.error(error.response?.data?.message ||"Error fetching checkout data");
      }
    };

    fetchCheckoutData();
  }, [userId]);



  const handlePlaceOrder = async () => {
    if (!address) {
      toast.error("Please select an address to proceed.");
      return;
    }
  
    if (!paymentMethod) {
      toast.error("Please select a payment method.");
      return;
    }
  
    if (paymentMethod === "COD") {
      try {
        const order = {
          userId,
          products: cartItems,
          shippingAddress: address,
          totalAmount: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
        };
  
        const { data } = await userapi.post('/orders', order);
        const orderedProductIds = cartItems.map(item => item._id);
        await userapi.put(`/updatecart/${userId}`, { orderedProductIds });
  
        toast.success(data.message || "Order placed successfully");
        goToInvoice();
      } catch (err) {
        toast.error("Order failed");
      }
    } else if (paymentMethod === "Card") {
      try {
        const { data } = await userapi.post('/cardpayment', {
          userId,
          products: cartItems,
          shippingAddress: address,
          totalAmount : total,
        });
  
        
        if (data.url) {
          window.location.href = data.url;
        } else {
          toast.error("Payment URL not received");
        }
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message ||"Payment failed");
      }
       
    }
  };
  

  return (
    <div className="container my-5">
      <h3 className="mb-4">Checkout</h3>
      <div className="row">
        <div className="col-md-7 mb-4">
          <h5>Your Products</h5>
          {cartItems.map((item, index) => (
            <div key={index} className="card mb-2 p-3 shadow-sm">
              <div className="d-flex justify-content-between">
                <span>{item.name}</span>
                <span>{item.qty} × ₹{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-5">
          <div className="card p-3 shadow-sm mb-3">
            <h5>Shipping Address</h5>
            {address ? (
              <>
                <p><strong>{address.firstname} {address.lastname}</strong></p>
                <p>{address.address}, {address.city}, {address.state}</p>
                <p>Phone: {address.phone}</p>
              </>
            ) : (
              <p>No address selected.</p>
            )}
          </div>

          <div className="card p-3 shadow-sm mb-3">
            <h5>Order Summary</h5>
            <div className="d-flex justify-content-between">
              <span>Total:</span>
              <span><strong>₹{cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)}</strong></span>
            </div>
          </div>

          <div className="card p-3 shadow-sm">
           
  <h5>Payment Method</h5>
  <div
    className={`alert ${paymentMethod === "COD" ? "alert-danger" : "alert-primary"} cursor-pointer`}
    onClick={() => setPaymentMethod("COD")}
    style={{ cursor: "pointer" }}
  >
    Cash on Delivery
  </div>
  <div
    className={`alert ${paymentMethod === "Card" ? "alert-danger" : "alert-primary"} cursor-pointer`}
    onClick={() => setPaymentMethod("Card")}
    style={{ cursor: "pointer" }}
  >
    Debit Card
  </div>
</div>


          <button onClick={handlePlaceOrder} className="btn btn-success w-100 mt-3">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
