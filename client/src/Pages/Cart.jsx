import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPaintBrush } from "react-icons/fa";
import { api, userapi } from "../axios";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router";


const Cart = () => {
  const [cartitems, setCartItems] = useState([]);
  const token = localStorage.getItem("userToken");
  const userId = localStorage.getItem("_id");

  const navigate = useNavigate();
  const goToAddress =() => {navigate("/address");}
  if (!userId) {
    toast.error("User ID not found");
    return <div className="text-center mt-5">Please log in to view your cart.</div>;
  }



  useEffect(() => {
    const fetchcart = async () => {
      try {
        const { data } = await userapi.get(`/cart/${userId}`);
        setCartItems(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load cart");
      }
    };
    fetchcart();
  }, [userId]);


  const removeProduct = async({userId, productId}) =>{
    try {
    const {data} = await userapi.delete(`/cart/${userId}/${productId}`);
    toast.success(data.message);
    const res = await userapi.get(`/cart/${userId}`);
    setCartItems(res.data);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      
    }
  }

  const handleQty = async (userId, product, type) => {
    try {
      const { _id, qty } = product;
      const updatedQty = type === "inc" ? qty + 1 : qty > 1 ? qty - 1 : 1;

      const { data } = await userapi.put("/cart/update", {
        userId,
        product: { _id, qty: updatedQty },
        type,
      });

      const res = await userapi.get(`/cart/${userId}`);
      setCartItems(res?.data);
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Fragment>
      {/* Header */}
      <div className="container p-3 shadow-sm bg-white rounded mt-3 mb-4">
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <div className="d-flex align-items-center">
            <div
              className="d-flex justify-content-center align-items-center shadow"
              style={{
                borderRadius: "50%",
                height: "50px",
                width: "50px",
                background: "#fff",
              }}
            >
              <FaPaintBrush style={{ height: "25px", width: "25px", color: "#6554af" }} />
            </div>
            <h2
              className="ms-3"
              style={{
                background: "linear-gradient(to right, #6554af, #ff7eb3)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "700",
              }}
            >
              Galeria
            </h2>
          </div>
        </div>
      </div>

      {/* Cart Items */}
      <div className="container d-flex w-100" style={{ gap: "20px", border:"4px solid white" }}>

          <div className="d-flex flex-wrap w-100" >
            <div className="col-md-8">
            <div className="table-responsive ">
                {cartitems.length === 0 ? (
                  <p className="text-center">Your cart is empty.</p>
                ) : (
                  <table className="table">
                    <thead className="table-light">
                      <tr>
                        <th className="p-3 ">Product</th>
                        <th className="p-3 ">Qty</th>
                        <th className="p-3">Price</th>
                        <th className="p-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartitems.map((product) => (
                        <tr key={product._id}>
                          <td className="p-3 "> <img
                              src={`http://localhost:8080${product.image}`}
                              alt="Product"
                              style={{ width: "40px", height: "20px", objectFit: "contain", paddingRight:"6px" }}
                            />
                            {product.name}
                            </td>
                          <td className="p-3">
                          <div className="d-flex justify-content-center align-items-center gap-2">
                          <button
                            className="btn btn-primary"
                            onClick={() => handleQty(userId, product, "dec")}
                          >
                            -
                          </button>
                          <div>
                          {product.qty}
                          </div>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleQty(userId, product, "inc")}
                          >
                            +
                          </button>
                        </div>
                            </td>
                          <td className="p-3">${product.price}</td>
                          <td className="p-3">
                            <MdDelete size={20} style={{cursor:"pointer"}} onClick={() =>
                                removeProduct({ userId, productId: product._id })
                              }/>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
              
              <div className=" col-md-3 bg-light p-5" style={{marginLeft:"40px"}}>
                <h2>Summary</h2>
                <p><strong>Total Items</strong> : {cartitems.length}</p>
                <p><strong>Total Amount</strong> :    ${" "}
                {cartitems.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2)}</p>
                <button className="btn btn-success" onClick={goToAddress}>Pay Amount</button>
              </div>
        </div>

        
      </div>
    </Fragment>
  );
};

export default Cart;
