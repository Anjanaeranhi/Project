import React, { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPaintBrush } from "react-icons/fa";
import { api } from "../axios";
import { MdDelete } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";



const Wishlist = ({cartitems, setCartItems}) => {
      const [wishItems, setWishItems] = useState([]);
      console.log(wishItems)
      // const [datas, setDatas] = useState([])
      localStorage.getItem("userToken");
      const userId = localStorage.getItem("_id");
    
      
    
            const AddProduct = async({userId,product}) =>{
              try {
                console.log(userId);
                
                // const cart = localStorage.getItem("cart")
                
                if(!userId){
                  toast.error("user Id not found")
                }
                const {data} = await api.post("/cart", {product, userId});
                // setCartItems(data)
                toast.success(data?.message)
                const res = await api.get(`/cart/${userId}`);
                setCartItems(res?.data);
              } catch (error) {
                console.log(error?.response?.data?.message || error.message);
                toast.error(error?.response?.data?.message || "Something went wrong")
              }
            }


      useEffect(() => {
        if (!userId) {
          toast.error("User ID not found");
          return <div className="text-center mt-5">Please log in to view your cart.</div>;
        }
        const fetchwishlist = async () => {
          try {
            const { data } = await api.get(`/wishlist/${userId}`);
            setWishItems(data);
            console.log("Wishlist Items:", data);
            // setDatas(data);
            console.log(data);
            
          } catch (error) {
            console.log(error.data?.message);
            toast.error("Failed to load wishlist");
          }
        };
        fetchwishlist();
      }, [userId]);
    
    
      const removeWishlist = async({userId, productId}) =>{
        // console.log("User>>>>", userId);
        // console.log("product>>>>", productId);
        try {
        const {data} = await api.delete(`/wishlist/${userId}/${productId}`);
        console.log(data);
        toast.success(data.message);
        const res = await api.get(`/wishlist/${userId}`);
        // console.log(res?.data);
        
        setWishItems(res?.data);
        // setWishItems((prev) => prev.filter((item) => item._id !== productId));
        
        } catch (error) {
          if(error){
            toast.error(error?.data?.message);
            console.log(error?.data?.message);
          }
          
        }
      }
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
                <div className="container d-flex w-100" style={{ gap: "20px", border:"4px solid white" }}>
                
                          <div className="d-flex flex-wrap w-100" >
                            
                            <div className="table-responsive ">
                                {wishItems.length === 0 ? (
                                  <p className="text-center">Your wishlist is empty.</p>
                                ) : (
                                  <table className="table">
                                    <thead className="table-light">
                                      <tr>
                                        <th className="p-3 ">Product</th>
                                        <th className="p-3 ">Qty</th>
                                        <th className="p-3">Price</th>
                                        <th className="p-3">Actions</th>
                                        <th className="p-3">Add to Cart</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {wishItems?.map((product) => (
                                        <tr key={product?._id}>
                                          <td className="p-3 "> <img
                                              src={`http://localhost:8080${product.image}`}
                                              alt="Product"
                                              style={{ width: "40px", height: "20px", objectFit: "contain", paddingRight:"6px" }}
                                            />
                                            {product?.name}
                                            </td>
                                          <td className="p-3">{product?.qty}</td>
                                          <td className="p-3">${product?.price}</td>
                                          <td className="p-3">
                                            <MdDelete size={20} style={{cursor:"pointer"}} onClick={() =>
                                                removeWishlist({ userId, productId: product?._id })
                                              }/>
                                          </td>
                                          <td>
                                          <FaCartArrowDown size={20} style={{cursor:"pointer"}} onClick={() => AddProduct({userId, product})}/>
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                )}
                              </div>
                            </div>
                            </div>
        </Fragment>
      );
    };

export default Wishlist;
